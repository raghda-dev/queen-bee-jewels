
// app/(main)/home/settings/chat/page.tsx


import { redirect } from 'next/navigation';

export default function RedirectWishlist() {
  redirect('/home?modal=chat');
}
