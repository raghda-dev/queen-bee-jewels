// app/(main)/home/settings/notifications/page.tsx


import { redirect } from 'next/navigation';

export default function RedirectWishlist() {
  redirect('/home?modal=notifications');
}
