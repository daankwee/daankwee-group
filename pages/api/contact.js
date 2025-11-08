import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);
const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { name, email, message } = ContactSchema.parse(req.body);
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Daankwee Books <noreply@daankwee.com>',
        to: process.env.CONTACT_PRIMARY_EMAIL || email,
        subject: `New message from ${name}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
      });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    if (err?.issues) return res.status(400).json({ error: err.issues[0]?.message || 'Invalid input' });
    console.error(err); return res.status(500).json({ error: 'Server error' });
  }
}