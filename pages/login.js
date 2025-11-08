import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      const next = router.query.next || '/';
      router.push(next);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-[70vh] container py-12 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input type="email" name="email" placeholder="Email" className="w-full p-3 border dark:border-gray-700 rounded mb-3" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-3 border dark:border-gray-700 rounded mb-4" onChange={handleChange} required />
        <button disabled={loading} className="btn w-full">{loading ? 'Signing in…' : 'Login'}</button>
        <p className="text-center text-sm mt-4">Forgot your password? <a href="/forgot-password" className="text-blue-600 hover:underline">Reset</a></p>
      </form>
    </main>
  );
}