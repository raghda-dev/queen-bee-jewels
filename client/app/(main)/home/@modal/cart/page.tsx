// app/(main)/home/@modals/cart/page.tsx


'use client';
import { useRouter } from 'next/navigation';

export default function CartModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl relative">
        <h2 className="text-xl font-bold mb-4">Your Cart 🛒</h2>
        {/* Your cart content here */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          ✖
        </button>
      </div>
    </div>
  );
}



