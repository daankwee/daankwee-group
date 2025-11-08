import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const RegisterSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const body = RegisterSchema.parse(req.body);
    const email = body.email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const hashed = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({ data: { name: body.name || null, email, password: hashed } });
    return res.status(200).json({ success: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    if (err?.issues) return res.status(400).json({ error: err.issues[0]?.message || 'Invalid input' });
    console.error(err); return res.status(500).json({ error: 'Server error' });
  }
}