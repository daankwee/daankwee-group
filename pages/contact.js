import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); setError(''); setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');
      setStatus('Message sent! We’ll reply within 1–2 business days.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">Questions, partnerships, or school requests? We’d love to hear from you.</p>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-3">
        <input name="name" placeholder="Your name" className="w-full p-3 rounded border dark:border-gray-700" onChange={handleChange} value={form.name} required />
        <input type="email" name="email" placeholder="Your email" className="w-full p-3 rounded border dark:border-gray-700" onChange={handleChange} value={form.email} required />
        <textarea name="message" placeholder="How can we help?" rows="5" className="w-full p-3 rounded border dark:border-gray-700" onChange={handleChange} value={form.message} required />
        <button disabled={loading} className="btn">{loading ? 'Sending…' : 'Send'}</button>
        {status && <p className="text-green-600">{status}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}