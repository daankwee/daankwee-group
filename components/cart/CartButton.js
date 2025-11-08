import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartButton() {
  const { totalQty } = useCart();
  return (
    <Link href="/cart" className="relative px-3 py-1 rounded border dark:border-gray-700">
      🛒
      {totalQty > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1">{totalQty}</span>
      )}
    </Link>
  );
}