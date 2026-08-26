'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, CheckCircle2, Loader2, Globe } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('newsletter');
  const [message, setMessage] = useState('');
  const [showFullForm, setShowFullForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  // Do not render site footer inside Sanity Studio
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, message, type: inquiryType }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFeedback(data.message || 'You are now connected with MRND.');
        setEmail('');
        setName('');
        setMessage('');
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to submit. Please try again.');
      }
    } catch {
      setStatus('error');
      setFeedback('Something went wrong. Please check your connection.');
    }
  };

  return (
    <footer 
      id="footer"
      suppressHydrationWarning 
      className="w-full min-h-screen flex flex-col justify-between bg-(--color-parchment) text-(--color-ink) pt-[60px] md:pt-[90px] pb-0 border-t border-(--color-ash) relative overflow-hidden shrink-0"
    >
      <div className="max-w-[1400px] mx-auto w-full px-[24px] md:px-[40px]">
        
        {/* Top Grid: Stay in the know + Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] md:gap-[60px] pb-[40px] md:pb-[60px]">
          
          {/* Left Column: Stay in the know & Contact Form */}
          <div className="lg:col-span-6 flex flex-col items-start pr-0 lg:pr-[30px]">
            <h2 className="text-[36px] sm:text-[44px] md:text-[52px] font-normal leading-[1.05] tracking-[-0.02em] mb-[16px]">
              Stay in the know
            </h2>
            <p className="text-[14px] md:text-[15px] text-(--color-ink)/75 max-w-[420px] leading-[1.5] mb-[24px]">
              Subscribe for exclusive release announcements, private studio activations, and creative dispatches.
            </p>

            {status === 'success' ? (
              <div className="flex items-center gap-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-[16px] py-[12px] w-full max-w-[420px] rounded-[2px]">
                <CheckCircle2 className="w-[18px] h-[18px] shrink-0" />
                <span className="text-[13px] font-mono">{feedback}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-[420px] flex flex-col gap-[12px]">
                <div className="relative flex items-center border-b border-(--color-ink) pb-[8px]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-transparent text-[15px] placeholder:text-(--color-ash) text-(--color-ink) focus:outline-hidden pr-[40px]"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-0 top-0 bottom-[8px] flex items-center justify-center text-(--color-ink) hover:opacity-70 transition-opacity disabled:opacity-40 cursor-pointer"
                    aria-label="Submit"
                  >
                    {status === 'loading' ? (
                      <Loader2 className="w-[18px] h-[18px] animate-spin" />
                    ) : (
                      <ArrowRight className="w-[20px] h-[20px]" />
                    )}
                  </button>
                </div>

                {/* Optional Expandable Detailed Contact Fields */}
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-(--color-ash) mt-[4px]">
                  <button
                    type="button"
                    onClick={() => setShowFullForm(!showFullForm)}
                    className="hover:text-(--color-ink) underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    {showFullForm ? '− Quick Subscribe' : '+ Send Detailed Inquiry / Booking'}
                  </button>
                  {status === 'error' && (
                    <span className="text-red-600 font-mono text-[11px]">{feedback}</span>
                  )}
                </div>

                {showFullForm && (
                  <div className="flex flex-col gap-[10px] mt-[10px] p-[16px] border border-(--color-ash) bg-(--color-paper)/50">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full bg-transparent border-b border-(--color-ash) pb-[6px] text-[13px] focus:outline-hidden focus:border-(--color-ink)"
                    />
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-transparent border-b border-(--color-ash) pb-[6px] text-[12px] font-mono uppercase tracking-wider text-(--color-ink) focus:outline-hidden focus:border-(--color-ink)"
                    >
                      <option value="newsletter">General / Newsletter</option>
                      <option value="booking">Talent Booking & Collaboration</option>
                      <option value="inquiry">Press & Partnerships</option>
                    </select>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your message or brief..."
                      className="w-full bg-transparent border-b border-(--color-ash) pb-[6px] text-[13px] focus:outline-hidden focus:border-(--color-ink) resize-none"
                    />
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Columns: Clean 2-Column Navigation */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-[30px] md:gap-[50px] pt-[10px]">
            
            {/* Column 1: Collective */}
            <div className="flex flex-col gap-[14px]">
              <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-(--color-ink) font-bold">
                COLLECTIVE
              </span>
              <ul className="flex flex-col gap-[10px] text-[12px] font-mono uppercase tracking-wider text-(--color-ink)/75">
                <li><Link href="/timeline" className="hover:text-(--color-ink) transition-colors">Timeline</Link></li>
                <li><Link href="/team" className="hover:text-(--color-ink) transition-colors">Team</Link></li>
                <li><Link href="/events" className="hover:text-(--color-ink) transition-colors">Events & Calendar</Link></li>
                <li><Link href="/timeline" className="hover:text-(--color-ink) transition-colors">Sound Archive</Link></li>
                <li><Link href="/#manifesto" className="hover:text-(--color-ink) transition-colors">Manifesto</Link></li>
              </ul>
            </div>

            {/* Column 2: Explore */}
            <div className="flex flex-col gap-[14px]">
              <span className="text-[12px] font-mono uppercase tracking-[0.1em] text-(--color-ink) font-bold">
                EXPLORE
              </span>
              <ul className="flex flex-col gap-[10px] text-[12px] font-mono uppercase tracking-wider text-(--color-ink)/75">
                <li><span className="hover:text-(--color-ink) cursor-default transition-colors">Studio Sessions</span></li>
                <li><span className="hover:text-(--color-ink) cursor-default transition-colors">Visual Works</span></li>
                <li><span className="hover:text-(--color-ink) cursor-default transition-colors">Editorial Films</span></li>
                <li><span className="hover:text-(--color-ink) cursor-default transition-colors">Audio Releases</span></li>
                <li><span className="hover:text-(--color-ink) cursor-default transition-colors">Co-Signed Acts</span></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Middle Meta Row */}
        <div 
          suppressHydrationWarning
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-[16px] border-t border-(--color-ash)/60 text-[11px] font-mono uppercase tracking-wider text-(--color-ash) gap-[12px]"
        >
          <div className="flex items-center gap-[16px] flex-wrap">
            <span className="inline-flex items-center gap-[4px] text-(--color-ink)/80">
              <Globe className="w-[12px] h-[12px]" /> 🇺🇸 EN
            </span>
            <span suppressHydrationWarning>© 2026. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-[16px] flex-wrap text-(--color-ink)/80">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink) transition-colors">Instagram</a>
            <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink) transition-colors">SoundCloud</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink) transition-colors">YouTube</a>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink) transition-colors">Vimeo</a>
            <a href="https://github.com/brahimaann/newmrnd" target="_blank" rel="noopener noreferrer" className="hover:text-(--color-ink) transition-colors">GitHub</a>
          </div>
        </div>

      </div>

      {/* Massive OUTWAY-Style Heavy Bold Display Wordmark with Sliced Bottom */}
      <div className="w-full select-none pointer-events-none overflow-hidden flex justify-center items-end mt-auto">
        <span 
          className="text-[17.5vw] font-black uppercase text-(--color-ink) tracking-[-0.055em] leading-[0.72] whitespace-nowrap block text-center transform translate-y-[28%] md:translate-y-[32%]"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          MODERN RENAISSANCE
        </span>
      </div>

    </footer>
  );
}

export default Footer;
