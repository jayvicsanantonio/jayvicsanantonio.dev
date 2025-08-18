import { EmailTemplate } from '@/components/templates/email';
import { Resend } from 'resend';
import type { ReactElement } from 'react';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' });
    }

    const { RESEND_API_KEY, RESEND_FROM_EMAIL, RESEND_TO_EMAIL } =
      process.env;

    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !RESEND_TO_EMAIL) {
      return Response.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(RESEND_API_KEY);

    const data = await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: [RESEND_TO_EMAIL],
      subject: 'Personal Website Message',
      react: EmailTemplate({
        name,
        email,
        message,
      }) as ReactElement,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
