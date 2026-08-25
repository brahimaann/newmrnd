import { EventsSection } from '@/components/sections/EventsSection';
import { client } from '@/sanity/client';
import { getUpcomingEventsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function EventsPage() {
  const events = await client.fetch(getUpcomingEventsQuery);

  return (
    <main className="flex-1 flex flex-col pt-[70px] md:pt-[80px]">
      <EventsSection events={events} />
    </main>
  );
}
