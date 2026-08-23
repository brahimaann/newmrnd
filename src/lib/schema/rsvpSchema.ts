import { z } from 'zod';

export const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  eventId: z.string().min(1, "Please select an event"),
  guests: z.number().int().min(0).max(2, "Maximum 2 guests allowed"),
});

export type RsvpFormData = z.infer<typeof rsvpSchema>;
