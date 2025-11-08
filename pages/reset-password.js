import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const t = router.query.token;
      if (typeof t === 'string') setToken(t);
    }
  }, [router.isReady, router.query.token]);

  const handleSubmit = async e => {
    e.preventDefault(); setStatus(''); setError(''); setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');
      setStatus('Password reset successful! You may now log in.');
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-[70vh] container py-12 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {status && <p className="text-green-600 text-sm mb-3">{status}</p>}
        <input type="password" name="password" placeholder="New password (min 8 chars)" className="w-full p-3 border dark:border-gray-700 rounded mb-4" onChange={e => setPassword(e.target.value)} required />
        <button disabled={loading || !token} className="btn w-full">{loading ? 'Resetting…' : 'Reset Password'}</button>
        {!token && <p className="text-xs text-gray-500 mt-2">Missing token. Use the link from your email.</p>}
      </form>
    </main>
  );
}