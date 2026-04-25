// app/(main)/home/cart/page.tsx

import { redirect } from 'next/navigation';

export default function RedirectWishlist() {
  redirect('/home?modal=cart');
}
