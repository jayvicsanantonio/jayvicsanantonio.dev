import { EmailTemplate } from "@/components/templates/email";
import { Resend } from "resend";
import type { ReactElement } from "react";
import { error } from "console";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" });
    }

    const data = await resend.emails.send({
      from: `${process.env.RESEND_FROM_EMAIL}`,
      to: [`${process.env.RESEND_TO_EMAIL}`],
      subject: "Personal Website Message",
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
