import { TimelineSection } from '@/components/sections/TimelineSection';
import { client } from '@/sanity/client';
import { getTimelineEventsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function TimelinePage() {
  const events = await client.fetch(getTimelineEventsQuery);

  return (
    <main className="min-h-screen pt-[100px]">
      <TimelineSection events={events} />
    </main>
  );
}
