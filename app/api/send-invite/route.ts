import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, inviterName, organizationName, inviteLink } = await request.json();

  try {
    const data = await resend.emails.send({
      from: 'Your App <onboarding@resend.dev>',
      to: [to],
      subject: `Invitation to join ${organizationName}`,
      html: `
        <p>${inviterName} has invited you to join ${organizationName}.</p>
        <p><a href="${inviteLink}">Click here to accept the invitation</a></p>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}