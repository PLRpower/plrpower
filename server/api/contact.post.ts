import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, message } = body;

  try {
    // Note: In the Resend free tier/onboarding, you can usually only send to your own email address
    // unless you verify a domain.
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'paul.thomas.stras@gmail.com',
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return { success: true };
  } catch (error) {
    console.error('Resend Error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send email',
    });
  }
});
