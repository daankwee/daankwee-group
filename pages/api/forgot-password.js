import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const ForgotSchema = z.object({ email: z.string().email() });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { email } = ForgotSchema.parse(req.body);
    const normalized = email.toLowerCase().trim();
    const token = jwt.sign({ email: normalized }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const link = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${encodeURIComponent(token)}`;
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Daankwee Books <noreply@daankwee.com>',
        to: normalized,
        subject: 'Reset your password',
        html: `<p>Click <a href="${link}">here</a> to reset your password. Link expires in 1 hour.</p>`,
      });
    }
    return res.status(200).json({ success: true, message: 'If an account exists, a reset link has been sent.' });
  } catch (err) {
    if (err?.issues) return res.status(400).json({ error: err.issues[0]?.message || 'Invalid input' });
    console.error(err); return res.status(500).json({ error: 'Server error' });
  }
}