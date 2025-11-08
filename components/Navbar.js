import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import CartButton from './cart/CartButton';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('/api/session').then(async (r) => {
      if (r.ok) {
        const d = await r.json();
        if (d?.user) { setAuthed(true); setEmail(d.user.email); }
      }
    }).catch(() => {});
  }, []);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <nav className="container py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl text-blue-700 dark:text-blue-400">Daankwee Books</Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <Link href="/products" className="hover:underline">Products</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/team" className="hover:underline">Team</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <ThemeToggle />
          <CartButton />
          {!authed ? (
            <>
              <Link href="/login" className="px-3 py-1 rounded border dark:border-gray-700">Login</Link>
              <Link href="/register" className="px-3 py-1 rounded bg-blue-600 text-white">Register</Link>
            </>
          ) : (
            <form method="POST" action="/api/logout">
              <button className="px-3 py-1 rounded border dark:border-gray-700">Logout</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}