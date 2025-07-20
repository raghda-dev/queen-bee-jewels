// app/(main)/home/settings/page.tsx


import { redirect } from 'next/navigation';

export default function RedirectWishlist() {
  redirect('/home?modal=settings');
}


