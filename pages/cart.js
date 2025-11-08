import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, subtotal, setQty, remove, clear } = useCart();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link href="/products" className="text-blue-600 underline">Browse products</Link>.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(it => (
              <div key={it.id} className="rounded-xl border dark:border-gray-800 p-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{it.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">${it.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" value={it.qty} onChange={(e)=>setQty(it.id, parseInt(e.target.value||'1'))} className="w-20 p-2 rounded border dark:border-gray-700" />
                  <button onClick={()=>remove(it.id)} className="btn-outline">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <aside className="rounded-xl border dark:border-gray-800 p-6 h-max">
            <h2 className="font-semibold mb-2">Order Summary</h2>
            <p className="mb-4">Subtotal: <strong>${subtotal.toFixed(2)}</strong></p>
            <button className="btn w-full mb-2" onClick={()=>alert('Checkout coming soon (Stripe/PayPal).')}>Checkout</button>
            <button className="btn-outline w-full" onClick={clear}>Clear Cart</button>
          </aside>
        </div>
      )}
    </main>
  );
}