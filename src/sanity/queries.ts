import { defineQuery } from 'next-sanity';

export const getTimelineEventsQuery = defineQuery(`
  *[_type == "timelineEvent"] | order(date desc) {
    _id,
    title,
    date,
    tags,
    link
  }
`);

export const getTalentRosterQuery = defineQuery(`
  *[_type == "talent"] | order(name asc) {
    _id,
    name,
    discipline,
    shortBio,
    headshot,
    headshotUrl
  }
`);

export const getUpcomingEventsQuery = defineQuery(`
  *[_type == "event"] | order(coalesce(eventDate, date) asc) {
    _id,
    title,
    eventDate,
    date,
    category,
    location,
    description,
    link,
    image
  }
`);
