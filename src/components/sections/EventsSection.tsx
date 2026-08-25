'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Event } from '@/types/sanity.types';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, ExternalLink, CalendarPlus, Tag, RotateCcw, ArrowDownRight, Sparkles } from 'lucide-react';
import { urlForImage } from '@/sanity/image';

interface EventsSectionProps {
  events?: Event[];
}

// Fallback seed events if Sanity has not been populated yet by admin
const DEFAULT_EVENTS: Event[] = [
  {
    _id: 'default-1',
    _type: 'event',
    title: 'Going to the MN State Fair',
    eventDate: '2026-08-29',
    date: 'Friday, August 29 • 2:00 PM - Late',
    category: 'Community',
    location: 'Minnesota State Fairgrounds, Falcon Heights, MN',
    description: 'Annual MRND community linkup at the Great Minnesota Get-Together. Group rendezvous by the Grandstand followed by Sweet Martha cookies, live music, and collective summer vibes.',
    link: 'https://www.mnstatefair.org',
  },
  {
    _id: 'default-2',
    _type: 'event',
    title: 'HIMA & Friends Live Set',
    eventDate: '2026-09-04',
    date: 'Friday, September 4 • 8:00 PM',
    category: 'MRND Event',
    location: 'First Avenue 7th St Entry, Minneapolis, MN',
    description: 'An intimate live set featuring HIMA, unreleased project previews, special guest appearances, and collaborative instrumentation.',
    link: 'https://first-avenue.com',
  },
  {
    _id: 'default-3',
    _type: 'event',
    title: 'Twin Cities Sound Arts (Co-Signed)',
    eventDate: '2026-09-12',
    date: 'Saturday, September 12 • 6:30 PM',
    category: 'Co-Signed',
    location: 'Walker Art Center, Minneapolis, MN',
    description: 'A curated audiovisual presentation supporting regional independent composers, electronic producers, and media architects co-signed by MRND.',
    link: 'https://walkerart.org',
  },
  {
    _id: 'default-4',
    _type: 'event',
    title: 'Late Night Cypher & Open Studio (Related Act)',
    eventDate: '2026-09-19',
    date: 'Saturday, September 19 • 10:00 PM',
    category: 'Related Act',
    location: 'The Greenhouse Studio, St. Paul, MN',
    description: 'Open session jam and production cypher featuring partner acts, resident instrumentalists, and community beatmakers.',
    link: '',
  },
  {
    _id: 'default-5',
    _type: 'event',
    title: 'Modern Renaissance Autumn Summit',
    eventDate: '2026-09-26',
    date: 'Saturday, September 26 • 1:00 PM - 7:00 PM',
    category: 'MRND Event',
    location: 'Walker Pavilion / Minneapolis Sculpture Garden',
    description: 'Annual community activation convening creative leaders, designers, filmmakers, and recording artists for keynote discussions, sound showcases, and installations.',
    link: '',
  },
];

const CATEGORIES = ['All', 'MRND Event', 'Co-Signed', 'Related Act', 'Community'] as const;

// Helper to format Date to YYYY-MM-DD
function formatIsoDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function EventsSection({ events = [] }: EventsSectionProps) {
  // Combine sanity events with default seed events if sanity is empty
  const allEvents = useMemo(() => {
    if (events && events.length > 0) {
      return events;
    }
    return DEFAULT_EVENTS;
  }, [events]);

  // Compute Today's ISO string (client-side dynamic)
  const [todayIso, setTodayIso] = useState<string>(() => formatIsoDate(new Date()));

  useEffect(() => {
    setTodayIso(formatIsoDate(new Date()));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // When selectedDate is null, the calendar automatically dynamically highlights todayIso
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // The active highlighted date is either user-selected, or defaults to today
  const activeHighlightedDate = selectedDate || todayIso;

  // Next upcoming event preview calculation
  const nextUpcomingEvent = useMemo(() => {
    // Find first event on or after today, or fallback to first chronological event
    const upcoming = allEvents.filter((e) => !e.eventDate || e.eventDate >= todayIso);
    if (upcoming.length > 0) return upcoming[0];
    return allEvents[0] || null;
  }, [allEvents, todayIso]);

  // Calendar State: Default to current real-world month
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [weekOffset, setWeekOffset] = useState<number>(0);

  // Filter events by category & optionally by date if selected
  const filteredEvents = useMemo(() => {
    let list = allEvents;
    if (selectedCategory !== 'All') {
      list = list.filter((e) => (e.category || 'MRND Event').toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedDate) {
      list = list.filter((e) => e.eventDate === selectedDate);
    }
    return list;
  }, [allEvents, selectedCategory, selectedDate]);

  // Generate Week Days for the Week-by-Week Top Strip (Starting on SUNDAY)
  const currentWeekDays = useMemo(() => {
    const now = new Date();
    const currentDayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const startOfWeek = new Date(now);
    // Setting diff to -currentDayOfWeek forces Sunday as Day 0 of the week
    const diff = -currentDayOfWeek;
    startOfWeek.setDate(now.getDate() + diff + weekOffset * 7);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const iso = formatIsoDate(d);
      const dayEvents = allEvents.filter((e) => e.eventDate === iso);
      days.push({
        date: d,
        iso,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthName: d.toLocaleDateString('en-US', { month: 'short' }),
        events: dayEvents,
        isToday: iso === todayIso,
      });
    }
    return days;
  }, [weekOffset, allEvents, todayIso]);

  // Generate Full Month Grid for Month Calendar (Starts on Sunday)
  const monthData = useMemo(() => {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = currentMonthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const cells: Array<{ dayNum?: number; iso?: string; events: Event[]; isCurrentMonth: boolean; isToday: boolean }> = [];

    // Preceding blank slots
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push({ events: [], isCurrentMonth: false, isToday: false });
    }

    // Days in current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dObj = new Date(year, month, d);
      const iso = formatIsoDate(dObj);
      const dayEvents = allEvents.filter((e) => e.eventDate === iso);
      cells.push({
        dayNum: d,
        iso,
        events: dayEvents,
        isCurrentMonth: true,
        isToday: iso === todayIso,
      });
    }

    return { monthName, cells };
  }, [currentMonthDate, allEvents, todayIso]);

  // Helper to handle date selection click
  const handleDateClick = (iso: string) => {
    if (selectedDate === iso) {
      // Toggle off -> returns back to dynamic today mode
      setSelectedDate(null);
    } else {
      setSelectedDate(iso);
    }
  };

  // Helper to jump to and highlight an event
  const handleJumpToEvent = (event: Event) => {
    if (event.eventDate) {
      setSelectedDate(event.eventDate);
    }
    const targetEl = document.getElementById(`event-${event._id}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Helper to generate simple .ics calendar file download
  const handleAddToCalendar = (event: Event) => {
    const title = event.title;
    const desc = event.description || '';
    const loc = event.location || '';
    const dateStr = event.eventDate ? event.eventDate.replace(/-/g, '') : '20260829';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MRND Platform//Events//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${loc}`,
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryBadgeClass = (category?: string) => {
    switch (category) {
      case 'Co-Signed':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Related Act':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Community':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'MRND Event':
      default:
        return 'bg-(--color-ink) text-(--color-paper) border-(--color-ink)';
    }
  };

  return (
    <section id="events" className="flex-1 pt-[10px] md:pt-[20px] pb-[40px] md:pb-[60px] px-[20px] md:px-[30px] bg-(--color-parchment)">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col gap-[40px] md:gap-[50px]">
        
        {/* Header Section (Moved up with Preview Card) */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-[30px] border-b border-(--color-ash) pb-[36px]">
          
          {/* Left Column: Title & Label */}
          <div className="flex-1">
            <SectionLabel>Event Program & Calendar</SectionLabel>
            <h1 className="text-[44px] sm:text-[60px] md:text-[80px] leading-[0.88] tracking-[0.99px] font-normal uppercase text-(--color-ink) mt-[16px]">
              Activations &<br />Community
            </h1>

            {/* Date Active Indicator Status */}
            <div className="mt-[20px]">
              {selectedDate ? (
                <div className="inline-flex items-center gap-[8px] bg-(--color-paper) border border-(--color-ash) px-[12px] py-[6px]">
                  <span className="text-[11px] font-mono text-(--color-ink)">
                    Active Filter: <strong>{selectedDate}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-[10px] font-mono uppercase underline text-(--color-ink) hover:opacity-70 flex items-center gap-[4px] ml-[4px]"
                  >
                    <RotateCcw className="w-[11px] h-[11px]" /> Reset to Today
                  </button>
                </div>
              ) : (
                <div className="inline-flex items-center gap-[8px] text-[12px] font-mono text-(--color-ink)/80">
                  <span className="w-[8px] h-[8px] rounded-full bg-emerald-500 animate-pulse" />
                  Live Highlight: <strong>Today ({todayIso})</strong>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Description & Next Upcoming Event Preview Card */}
          <div className="w-full lg:max-w-[480px] flex flex-col gap-[20px]">
            <p className="text-[15px] sm:text-[17px] leading-[1.45] text-(--color-ink)/85">
              Explore upcoming MRND original sessions, co-signed showcases, community gatherings, and related partner performances.
            </p>

            {/* Next Upcoming Event Preview Card */}
            {nextUpcomingEvent && (
              <div 
                onClick={() => handleJumpToEvent(nextUpcomingEvent)}
                className="group relative bg-(--color-paper) border border-(--color-ink) p-[20px] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="flex items-center justify-between gap-[8px] mb-[10px]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-(--color-ink)/70 flex items-center gap-[5px]">
                    <Sparkles className="w-[12px] h-[12px] text-amber-500" />
                    Next Upcoming Activation
                  </span>
                  <span className={`text-[9px] font-mono uppercase px-[6px] py-[2px] border ${getCategoryBadgeClass(nextUpcomingEvent.category)}`}>
                    {nextUpcomingEvent.category || 'MRND Event'}
                  </span>
                </div>

                <h3 className="text-[20px] sm:text-[24px] font-normal leading-tight text-(--color-ink) group-hover:underline underline-offset-2 decoration-1 mb-[8px]">
                  {nextUpcomingEvent.title}
                </h3>

                <div className="flex flex-col gap-[3px] text-[12px] font-mono text-(--color-ink)/80 mb-[12px]">
                  <span className="font-semibold">{nextUpcomingEvent.date || nextUpcomingEvent.eventDate}</span>
                  {nextUpcomingEvent.location && (
                    <span className="flex items-center gap-[4px] text-(--color-ink)/60 truncate">
                      <MapPin className="w-[11px] h-[11px] shrink-0" /> {nextUpcomingEvent.location}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-[10px] border-t border-(--color-ash)/60 text-[10px] font-mono uppercase tracking-wider text-(--color-ink)">
                  <span className="flex items-center gap-[4px] group-hover:translate-x-1 transition-transform">
                    Jump to Activation <ArrowDownRight className="w-[12px] h-[12px]" />
                  </span>
                  <span className="text-(--color-ash)">Click to view</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 1. TOP VIEW: Week-By-Week Strip Calendar (STARTS ON SUNDAY) */}
        <div className="bg-(--color-paper) border border-(--color-ash) p-[20px] md:p-[28px]">
          <div className="flex flex-wrap items-center justify-between gap-[16px] mb-[18px]">
            <div className="flex items-center gap-[10px]">
              <CalendarIcon className="w-[18px] h-[18px] text-(--color-ink)" />
              <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-(--color-ink)">
                Week Horizon (Sunday – Saturday)
              </span>
            </div>
            
            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => setWeekOffset((prev) => prev - 1)}
                aria-label="Previous Week"
                className="w-[34px] h-[34px] border border-(--color-ash) flex items-center justify-center hover:bg-(--color-parchment) transition-colors"
                title="Previous Week"
              >
                <ChevronLeft className="w-[16px] h-[16px] text-(--color-ink)" />
              </button>
              <button
                onClick={() => {
                  setWeekOffset(0);
                  setSelectedDate(null);
                }}
                className="px-[12px] h-[34px] border border-(--color-ash) text-[11px] font-mono uppercase tracking-wider hover:bg-(--color-parchment) transition-colors"
              >
                This Week
              </button>
              <button
                onClick={() => setWeekOffset((prev) => prev + 1)}
                aria-label="Next Week"
                className="w-[34px] h-[34px] border border-(--color-ash) flex items-center justify-center hover:bg-(--color-parchment) transition-colors"
                title="Next Week"
              >
                <ChevronRight className="w-[16px] h-[16px] text-(--color-ink)" />
              </button>
            </div>
          </div>

          {/* Week Strip Grid (Sunday to Saturday) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-[10px]">
            {currentWeekDays.map((day) => {
              const isHighlightActive = activeHighlightedDate === day.iso;
              const hasEvents = day.events.length > 0;

              return (
                <button
                  key={day.iso}
                  onClick={() => handleDateClick(day.iso)}
                  className={`flex flex-col p-[12px] md:p-[14px] border text-left transition-all duration-200 relative ${
                    isHighlightActive
                      ? 'border-(--color-ink) bg-(--color-ink) text-(--color-paper) shadow-md ring-2 ring-(--color-ink)/20'
                      : day.isToday
                      ? 'border-(--color-ink) bg-(--color-parchment)/60 text-(--color-ink)'
                      : hasEvents
                      ? 'border-(--color-ash) bg-(--color-parchment)/30 hover:bg-(--color-parchment)'
                      : 'border-(--color-ash)/60 hover:border-(--color-ash) text-(--color-ink)'
                  }`}
                >
                  {/* Top Bar with Day Name & Today Tag */}
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-[11px] font-mono uppercase tracking-wider ${isHighlightActive ? 'text-(--color-paper)/70' : 'text-(--color-ink)/60'}`}>
                      {day.dayName}
                    </span>
                    {day.isToday && (
                      <span className={`text-[9px] font-mono uppercase px-[4px] py-[1px] font-bold ${
                        isHighlightActive
                          ? 'bg-amber-300 text-black'
                          : 'bg-(--color-ink) text-white'
                      }`}>
                        TODAY
                      </span>
                    )}
                  </div>

                  {/* Day Number */}
                  <span className={`text-[26px] md:text-[32px] font-normal leading-none my-[8px] ${isHighlightActive ? 'text-white' : 'text-(--color-ink)'}`}>
                    {day.dayNum}
                  </span>

                  {/* Event or Status */}
                  {hasEvents ? (
                    <div className="flex flex-col gap-[3px] mt-auto">
                      <span className={`text-[10px] font-mono uppercase font-bold tracking-tight line-clamp-1 ${isHighlightActive ? 'text-amber-300' : 'text-(--color-ink)'}`}>
                        ● {day.events[0].title}
                      </span>
                      {day.events.length > 1 && (
                        <span className={`text-[9px] font-mono ${isHighlightActive ? 'text-white/70' : 'text-(--color-ink)/60'}`}>
                          +{day.events.length - 1} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className={`text-[10px] font-mono mt-auto ${isHighlightActive ? 'text-(--color-paper)/40' : 'text-(--color-ash)'}`}>
                      No events
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. FULL MONTH CALENDAR VIEW (Starts on Sunday) */}
        <div className="bg-(--color-paper) border border-(--color-ash) p-[20px] md:p-[32px]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] pb-[20px] border-b border-(--color-ash)">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-(--color-ink)/60">
                Monthly Schedule
              </span>
              <h2 className="text-[26px] md:text-[34px] font-normal text-(--color-ink) uppercase tracking-tight">
                {monthData.monthName}
              </h2>
            </div>

            <div className="flex items-center gap-[8px]">
              <button
                onClick={() => {
                  const now = new Date();
                  setCurrentMonthDate(new Date(now.getFullYear(), now.getMonth(), 1));
                  setSelectedDate(null);
                }}
                className="px-[12px] h-[36px] border border-(--color-ash) text-[11px] font-mono uppercase tracking-wider hover:bg-(--color-parchment) transition-colors"
              >
                Current Month
              </button>
              <button
                onClick={() => {
                  const d = new Date(currentMonthDate);
                  d.setMonth(d.getMonth() - 1);
                  setCurrentMonthDate(d);
                }}
                className="px-[12px] h-[36px] border border-(--color-ash) text-[11px] font-mono uppercase tracking-wider hover:bg-(--color-parchment) transition-colors flex items-center gap-[4px]"
              >
                <ChevronLeft className="w-[14px] h-[14px]" /> Prev
              </button>
              <button
                onClick={() => {
                  const d = new Date(currentMonthDate);
                  d.setMonth(d.getMonth() + 1);
                  setCurrentMonthDate(d);
                }}
                className="px-[12px] h-[36px] border border-(--color-ash) text-[11px] font-mono uppercase tracking-wider hover:bg-(--color-parchment) transition-colors flex items-center gap-[4px]"
              >
                Next <ChevronRight className="w-[14px] h-[14px]" />
              </button>
            </div>
          </div>

          {/* Month Day Headers (Sunday First) */}
          <div className="grid grid-cols-7 border-b border-(--color-ash) py-[10px] text-center font-mono text-[11px] uppercase tracking-widest text-(--color-ink)/70">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Month Grid Cells */}
          <div className="grid grid-cols-7 border-l border-t border-(--color-ash)">
            {monthData.cells.map((cell, index) => {
              const isHighlightActive = cell.iso && activeHighlightedDate === cell.iso;

              return (
                <div
                  key={index}
                  onClick={() => cell.iso && handleDateClick(cell.iso)}
                  className={`min-h-[90px] md:min-h-[110px] p-[6px] md:p-[10px] border-r border-b border-(--color-ash) transition-all flex flex-col justify-between cursor-pointer ${
                    !cell.isCurrentMonth
                      ? 'bg-(--color-parchment)/30 cursor-default'
                      : isHighlightActive
                      ? 'bg-(--color-ink) text-white shadow-inner'
                      : cell.isToday
                      ? 'bg-(--color-parchment)/70 border-(--color-ink)'
                      : cell.events.length > 0
                      ? 'bg-(--color-parchment)/20 hover:bg-(--color-parchment)/50'
                      : 'hover:bg-(--color-parchment)/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[4px]">
                      <span
                        className={`text-[12px] md:text-[14px] font-mono ${
                          isHighlightActive
                            ? 'text-white font-bold'
                            : cell.isCurrentMonth
                            ? 'text-(--color-ink)'
                            : 'text-(--color-ash)'
                        }`}
                      >
                        {cell.dayNum}
                      </span>
                      {cell.isToday && (
                        <span className={`text-[7px] font-mono uppercase px-[3px] py-[1px] font-bold ${
                          isHighlightActive ? 'bg-amber-300 text-black' : 'bg-(--color-ink) text-white'
                        }`}>
                          TODAY
                        </span>
                      )}
                    </div>
                    {cell.events.length > 0 && !isHighlightActive && (
                      <span className="w-[5px] h-[5px] rounded-full bg-(--color-ink)" />
                    )}
                  </div>

                  {cell.events.length > 0 && (
                    <div className="flex flex-col gap-[3px] mt-[4px]">
                      {cell.events.map((ev) => (
                        <div
                          key={ev._id}
                          className={`text-[9px] font-mono px-[5px] py-[2px] border truncate transition-transform hover:scale-[1.02] ${
                            isHighlightActive
                              ? 'bg-white text-(--color-ink) border-white'
                              : getCategoryBadgeClass(ev.category)
                          }`}
                          title={`${ev.title} (${ev.category || 'MRND'})`}
                        >
                          {ev.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. CATEGORY FILTER TABS & CLEAR DATE BUTTON */}
        <div className="flex flex-wrap items-center justify-between gap-[16px]">
          <div className="flex flex-wrap items-center gap-[8px]">
            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-(--color-ink)/60 mr-[6px]">
              Filter Program:
            </span>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-[14px] py-[7px] text-[11px] uppercase tracking-[0.05em] font-mono border transition-colors ${
                    active
                      ? 'bg-(--color-ink) text-(--color-paper) border-(--color-ink)'
                      : 'bg-transparent text-(--color-ink) border-(--color-ash) hover:border-(--color-ink)'
                  }`}
                >
                  {cat === 'All' ? 'All Activations' : cat}
                </button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="flex items-center gap-[8px]">
              <span className="text-[11px] font-mono text-(--color-ink)">
                Filtering for: <strong>{selectedDate}</strong>
              </span>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-[10px] font-mono underline uppercase text-(--color-ink) hover:text-(--color-ink)/60 flex items-center gap-[4px]"
              >
                <RotateCcw className="w-[11px] h-[11px]" /> Show All Dates
              </button>
            </div>
          )}
        </div>

        {/* 4. UPCOMING EVENTS DETAILED LIST */}
        <div className="flex flex-col gap-[28px]">
          <div className="flex items-center justify-between border-b border-(--color-ash) pb-[14px]">
            <h3 className="text-[26px] md:text-[32px] font-normal uppercase tracking-[0.44px] text-(--color-ink)">
              Upcoming Schedule ({filteredEvents.length})
            </h3>
            <span className="text-[11px] font-mono uppercase text-(--color-ink)/60">
              Co-signed • Related Acts • MRND
            </span>
          </div>

          {filteredEvents.length === 0 && (
            <div className="bg-(--color-paper) p-[46px] border border-(--color-ash) text-center">
              <p className="text-(--color-ink) font-mono text-[14px] mb-[10px]">
                No events found for the selected filter or date.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedDate(null);
                }}
                className="text-[11px] font-mono uppercase underline text-(--color-ink)"
              >
                Reset All Filters
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 gap-[20px]">
            {filteredEvents.map((event) => {
              const imageSrc = event.image ? urlForImage(event.image)?.width(800).auto('format').url() : null;

              return (
                <motion.div
                  key={event._id}
                  id={`event-${event._id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-(--color-paper) border border-(--color-ash) p-[24px] md:p-[36px] flex flex-col md:flex-row gap-[24px] md:gap-[30px] justify-between transition-all duration-300 hover:border-(--color-ink)"
                >
                  {/* Left: Date Stamp */}
                  <div className="flex md:flex-col items-start gap-[10px] md:gap-[6px] md:min-w-[170px] shrink-0 border-b md:border-b-0 md:border-r border-(--color-ash) pb-[14px] md:pb-0 md:pr-[24px]">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-(--color-ink)/60">
                      Date & Time
                    </span>
                    <span className="text-[18px] md:text-[22px] font-normal leading-[1.2] text-(--color-ink)">
                      {event.date || event.eventDate}
                    </span>
                    <span className={`inline-flex items-center gap-[4px] text-[10px] font-mono uppercase px-[8px] py-[3px] border mt-[6px] ${getCategoryBadgeClass(event.category)}`}>
                      <Tag className="w-[10px] h-[10px]" />
                      {event.category || 'MRND Event'}
                    </span>
                  </div>

                  {/* Middle: Title, Location, Description */}
                  <div className="flex-1 flex flex-col justify-between gap-[14px]">
                    <div>
                      <h4 className="text-[28px] md:text-[38px] leading-[1] font-normal tracking-[0.5px] text-(--color-ink) mb-[12px]">
                        {event.title}
                      </h4>

                      {event.location && (
                        <p className="text-[13px] font-mono text-(--color-ink)/80 flex items-center gap-[6px] mb-[12px]">
                          <MapPin className="w-[14px] h-[14px] shrink-0 text-(--color-ink)" />
                          {event.location}
                        </p>
                      )}

                      <p className="text-[15px] md:text-[16px] leading-[1.5] text-(--color-ink)/90 max-w-[760px]">
                        {event.description}
                      </p>
                    </div>

                    {/* Actions: Add to Calendar, Links */}
                    <div className="flex flex-wrap items-center gap-[12px] pt-[14px] border-t border-(--color-ash)/40">
                      <button
                        onClick={() => handleAddToCalendar(event)}
                        className="inline-flex items-center gap-[6px] px-[12px] py-[7px] border border-(--color-ash) text-[11px] font-mono uppercase tracking-wider hover:bg-(--color-ink) hover:text-(--color-paper) hover:border-(--color-ink) transition-colors"
                      >
                        <CalendarPlus className="w-[13px] h-[13px]" />
                        Add to Calendar (.ics)
                      </button>

                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-[6px] px-[12px] py-[7px] border border-(--color-ink) bg-(--color-ink) text-(--color-paper) text-[11px] font-mono uppercase tracking-wider hover:bg-transparent hover:text-(--color-ink) transition-colors"
                        >
                          Tickets / Details <ExternalLink className="w-[12px] h-[12px]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Image Flyer if available */}
                  {imageSrc && (
                    <div className="w-full md:w-[200px] aspect-[4/3] md:aspect-square bg-(--color-parchment) border border-(--color-ash) overflow-hidden shrink-0">
                      <img
                        src={imageSrc}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
