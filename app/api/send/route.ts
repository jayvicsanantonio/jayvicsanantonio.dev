import { Resend } from 'resend';

import { EmailTemplate } from '@/components/templates/email';
import { env } from '@/env';

import type { ReactElement } from 'react';


export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: 'Missing required fields' });
    }

    const resend = new Resend(env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: [env.RESEND_TO_EMAIL],
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
