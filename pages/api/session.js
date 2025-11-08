import { getUserFromReq } from '@/lib/auth';
export default async function handler(req, res) {
  const user = getUserFromReq(req);
  return res.status(200).json({ user: user ? { id: user.id, email: user.email } : null });
}