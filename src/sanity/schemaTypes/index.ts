import { defineField, defineType } from 'sanity';

export const talentType = defineType({
  name: 'talent',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'string',
      description: 'e.g., Musicians & Producers, Directors',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload high-resolution headshot from your device',
    }),
    defineField({
      name: 'headshotUrl',
      title: 'Headshot URL (Fallback)',
      type: 'url',
      description: 'Optional external image URL fallback if no direct image is uploaded',
    }),
  ],
});

export const timelineEventType = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date (Formatted)',
      type: 'string',
      description: 'e.g., 26-05-10',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Artist names or categories (e.g., HIMA, MALIK)',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Link for the event if applicable',
    }),
  ],
});

export const eventType = defineType({
  name: 'event',
  title: 'Event / Calendar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date (For Calendar)',
      type: 'date',
      description: 'Select calendar date (e.g., 2026-08-29)',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'date',
      title: 'Display Date & Time',
      type: 'string',
      description: 'Human readable display format, e.g. "Friday, Aug 29 • 6:00 PM"',
    }),
    defineField({
      name: 'category',
      title: 'Event Type / Category',
      type: 'string',
      options: {
        list: [
          { title: 'MRND Event', value: 'MRND Event' },
          { title: 'Co-Signed', value: 'Co-Signed' },
          { title: 'Related Act', value: 'Related Act' },
          { title: 'Community', value: 'Community' },
        ],
      },
      initialValue: 'MRND Event',
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'link',
      title: 'Ticket / Info Link',
      type: 'url',
      description: 'Link for tickets, RSVP, or additional info',
    }),
    defineField({
      name: 'image',
      title: 'Event Flyer / Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});

export const schema = {
  types: [talentType, timelineEventType, eventType],
};

