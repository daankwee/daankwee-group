import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const ResetSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { token, password } = ResetSchema.parse(req.body);
    let decoded;
    try { decoded = jwt.verify(token, process.env.JWT_SECRET); }
    catch { return res.status(400).json({ error: 'Invalid or expired token' }); }
    const email = decoded.email.toLowerCase();
    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.update({ where: { email }, data: { password: hashed } });
    return res.status(200).json({ success: true });
  } catch (err) {
    if (err?.issues) return res.status(400).json({ error: err.issues[0]?.message || 'Invalid input' });
    console.error(err); return res.status(500).json({ error: 'Server error' });
  }
}