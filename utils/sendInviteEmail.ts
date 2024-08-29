import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendInviteEmail(to: string, inviterName: string, organizationName: string, inviteLink: string) {
  const msg = {
    to,
    from: 'ekpoemmanuelsg@gmail.com', // Must be a verified sender in SendGrid
    subject: `Invitation to join ${organizationName}`,
    text: `${inviterName} has invited you to join ${organizationName}. Click here to accept: ${inviteLink}`,
    html: `
      <p>${inviterName} has invited you to join ${organizationName}.</p>
      <p><a href="${inviteLink}">Click here to accept the invitation</a></p>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Invitation email sent successfully');
  } catch (error) {
    console.error('Error sending invitation email:', error);
    throw new Error('Failed to send invitation email');
  }
}