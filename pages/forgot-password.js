import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault(); setStatus(''); setError(''); setLoading(true);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setStatus('If an account exists, a reset link has been sent.');
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-[70vh] container py-12 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {status && <p className="text-green-600 text-sm mb-3">{status}</p>}
        <input type="email" name="email" placeholder="Enter your registered email" className="w-full p-3 border dark:border-gray-700 rounded mb-4" onChange={e => setEmail(e.target.value)} required />
        <button disabled={loading} className="btn w-full">{loading ? 'Sending…' : 'Send Reset Link'}</button>
      </form>
    </main>
  );
}