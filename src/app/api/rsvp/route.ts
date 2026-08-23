import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rsvpSchema } from '@/lib/schema/rsvpSchema';

// Initialize Resend with dummy key if env var missing during Phase 1
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate with Zod
    const validatedData = rsvpSchema.parse(body);

    // In Phase 1, if no API key is present, just log and return success
    if (!process.env.RESEND_API_KEY) {
      console.log('Phase 1 Mock RSVP:', validatedData);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json({ success: true });
    }

    // Send confirmation email
    await resend.emails.send({
      from: 'MRND <rsvp@mrnd.net>',
      to: validatedData.email,
      subject: `RSVP Confirmation: ${validatedData.eventId}`,
      html: `
        <div style="font-family: sans-serif; color: #1d1d1d;">
          <h1 style="font-size: 24px; text-transform: uppercase;">You're on the list.</h1>
          <p>Thank you for RSVPing, ${validatedData.name}.</p>
          <p>Guests: +${validatedData.guests}</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 });
    }
    console.error('RSVP Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
