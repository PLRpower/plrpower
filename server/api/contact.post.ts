import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting: max 3 requests per 10 minutes per IP
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

// Periodic cleanup every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 15 * 60 * 1000);

// noinspection JSUnusedGlobalSymbols
export default defineEventHandler(async (event) => {
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'anonymous';
  const now = Date.now();

  // 1. Rate Limiting Check
  const currentRecord = rateLimitMap.get(clientIp);
  if (currentRecord) {
    if (now > currentRecord.resetAt) {
      rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    } else if (currentRecord.count >= MAX_REQUESTS_PER_WINDOW) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many requests. Please wait a few minutes before trying again.',
      });
    } else {
      currentRecord.count += 1;
    }
  } else {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  const body = await readBody(event);
  const { name, email, message, website } = body || {};

  // 2. Honeypot trap: if filled by a bot, silently succeed without sending email
  if (website) {
    return { success: true };
  }

  // 3. Input Validation
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !trimmedName ||
    trimmedName.length > 100 ||
    !trimmedEmail ||
    trimmedEmail.length > 120 ||
    !emailRegex.test(trimmedEmail) ||
    !trimmedMessage ||
    trimmedMessage.length < 5 ||
    trimmedMessage.length > 5000
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid input fields.',
    });
  }

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'contact@pthomas.fr',
      subject: `New Message from ${trimmedName}`,
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      replyTo: trimmedEmail,
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
