import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      setSuccess('Account created! Redirecting to login…');
      setTimeout(() => router.push('/login'), 1200);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <main className="min-h-[70vh] container py-12 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border dark:border-gray-700 p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}
        <input name="name" placeholder="Full Name" className="w-full p-3 border dark:border-gray-700 rounded mb-3" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email Address" className="w-full p-3 border dark:border-gray-700 rounded mb-3" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (min 8 chars)" className="w-full p-3 border dark:border-gray-700 rounded mb-4" onChange={handleChange} required />
        <button disabled={loading} className="btn w-full">{loading ? 'Creating…' : 'Register'}</button>
        <p className="text-center text-sm mt-4">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
      </form>
    </main>
  );
}