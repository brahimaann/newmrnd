import TeamSection from '@/components/sections/TeamSection';
import { client } from '@/sanity/client';
import { getTalentRosterQuery } from '@/sanity/queries';

export const revalidate = 60;

export default async function TeamPage() {
  const talents = await client.fetch(getTalentRosterQuery);

  return (
    <main className="flex-1 flex flex-col pt-[70px] md:pt-[80px]">
      <TeamSection talents={talents || []} />
    </main>
  );
}
