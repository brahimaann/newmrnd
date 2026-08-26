import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  email: z.string().email('Please provide a valid email address'),
  name: z.string().optional(),
  message: z.string().optional(),
  type: z.enum(['newsletter', 'inquiry', 'booking']).default('newsletter'),
});

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_123');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      console.log('Contact / Newsletter Submission:', validatedData);
      await new Promise((resolve) => setTimeout(resolve, 800));
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for connecting with MRND. Welcome to the collective.' 
      });
    }

    await resend.emails.send({
      from: 'MRND <contact@mrnd.net>',
      to: validatedData.email,
      subject: 'Welcome to Modern Renaissance',
      html: `
        <div style="font-family: serif; color: #1d1d1d; max-width: 600px; padding: 20px;">
          <h1 style="font-size: 28px; text-transform: uppercase; letter-spacing: 1px;">Stay In The Know</h1>
          <p>Thank you for subscribing to Modern Renaissance updates and exclusive drops.</p>
        </div>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for connecting with MRND.' 
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Invalid input' }, { status: 400 });
    }
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }
}
