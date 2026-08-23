import { RosterSection } from '@/components/sections/RosterSection';
import { client } from '@/sanity/client';
import { getTalentRosterQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function RosterPage() {
  const talents = await client.fetch(getTalentRosterQuery);

  return (
    <main className="min-h-screen pt-[100px]">
      <RosterSection talents={talents} />
    </main>
  );
}
