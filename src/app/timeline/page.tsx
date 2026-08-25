import { TimelineSection } from '@/components/sections/TimelineSection';
import { client } from '@/sanity/client';
import { getTimelineEventsQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function TimelinePage() {
  const events = await client.fetch(getTimelineEventsQuery);

  return (
    <main className="flex-1 flex flex-col pt-[70px] md:pt-[80px]">
      <TimelineSection events={events} />
    </main>
  );
}
