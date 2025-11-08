import { useCart } from '@/context/CartContext';

const sampleProducts = [
  { id: 'mamba', title: 'The Black Mamba & the Stinky Boy (PDF)', price: 7.99 },
  { id: 'river', title: 'Scary Moment Over the St. Paul River (PDF)', price: 6.99 },
  { id: 'folktales', title: 'Liberian Folktales — Classroom Pack (PDF)', price: 19.99 },
];

export default function Products() {
  const { add } = useCart();
  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map(p => (
          <div key={p.id} className="rounded-xl border dark:border-gray-800 p-6 flex flex-col">
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4"></p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Instant download PDF.</p>
            <button onClick={() => add(p, 1)} className="btn mt-auto">Add to Cart — ${p.price.toFixed(2)}</button>
          </div>
        ))}
      </div>
    </main>
  );
}