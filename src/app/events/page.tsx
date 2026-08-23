import { EventsSection } from '@/components/sections/EventsSection';
import { client } from '@/sanity/client';
import { getUpcomingEventsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function EventsPage() {
  const events = await client.fetch(getUpcomingEventsQuery);

  return (
    <main className="min-h-screen pt-[100px]">
      <EventsSection events={events} />
    </main>
  );
}
