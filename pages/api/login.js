import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { signAuthToken, setAuthCookie } from '@/lib/auth';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = LoginSchema.parse(req.body);
    const email = body.email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signAuthToken({ id: user.id, email: user.email });
    setAuthCookie(res, token);
    return res.status(200).json({ success: true });
  } catch (err) {
    if (err?.issues) return res.status(400).json({ error: err.issues[0]?.message || 'Invalid input' });
    console.error(err); return res.status(500).json({ error: 'Server error' });
  }
}