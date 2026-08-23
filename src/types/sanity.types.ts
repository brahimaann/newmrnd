export interface Talent {
  _id: string;
  _type: 'talent';
  name: string;
  discipline: string;
  shortBio: string;
  headshot?: any;
  headshotUrl?: string;
}

export interface TimelineEvent {
  _id: string;
  _type: 'timelineEvent';
  title: string;
  date: string;
  tags?: string[];
  link?: string;
  location?: string;
  description?: string;
  category?: string;
  youtubeId?: string;
}

export interface Event {
  _id: string;
  _type: 'event';
  title: string;
  date?: string;
  eventDate?: string;
  category?: 'MRND Event' | 'Co-Signed' | 'Related Act' | 'Community' | string;
  location?: string;
  description?: string;
  link?: string;
  image?: any;
}
