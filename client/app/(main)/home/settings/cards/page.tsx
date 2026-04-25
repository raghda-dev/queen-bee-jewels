
// client/app/(main)/home/settings/cards/page.tsx


import { redirect } from 'next/navigation';

export default function RedirectWishlist() {
  redirect('/home?modal=cards');
}
