// client/app/layout.tsx

// import './styles/global.scss';
// import './styles/tailwind.css';
// import Providers from './providers';
// import { Toaster } from 'sonner';
// import { RouteTracker } from './(main)/utils/RouteTracker';
// import UserProfileInitializer from './(main)/home/UserProfileInitializer';
// // import ClientHydrator from './(main)/components/ClientHydrator';

// export default function RootLayout({
//   children,
//   collections,
// }: {
//   children: React.ReactNode;
//   collections: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-screen min-w-fit flex-col">
//         <Providers>
//          {/* <ClientHydrator /> */}
//           <UserProfileInitializer />
//           <RouteTracker />
//           <Toaster
//             toastOptions={{
//               className: 'toast',
//             }}
//           />
//           {collections}
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }


// app/layout.tsx (server)
import './styles/global.scss';
import './styles/tailwind.css';
import Providers from './providers';
import { Toaster } from 'sonner';
import { RouteTracker } from './(main)/utils/RouteTracker';
import UserProfileInitializer from './(main)/home/UserProfileInitializer';
import { headers } from 'next/headers';
import type { RootState } from './(main)/lib/redux/store';

export default async function RootLayout({
  children,
  collections,
}: {
  children: React.ReactNode;
  collections: React.ReactNode;
}) {
  // Attempt server-side fetch of the current user by forwarding cookies
  let serverUser: RootState['user']['user'] | null = null;

  try {
    const cookieHeader = (await headers()).get('cookie') || '';

    if (cookieHeader) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        headers: {
          cookie: cookieHeader,
        },
        // ensure we always get fresh auth state
        cache: 'no-store',
      });

      if (res.ok) {
        serverUser = (await res.json()) as RootState['user']['user'];
      } else {
        serverUser = null; // treat 401 / 403 as unauthenticated
      }
    }
  } catch (err) {
    // If any error occurs, do not break rendering — treat as guest.
    serverUser = null;
  }

  return (
    <html lang="en">
      <body className="flex min-h-screen min-w-fit flex-col">
        {/* Pass serverUser to the client Providers so client store is preloaded */}
        <Providers initialUser={serverUser}>
          {/* The initializer below will only fetch if no user exists client-side */}
          <UserProfileInitializer />
          <RouteTracker />
          <Toaster
            toastOptions={{
              className: 'toast',
            }}
          />
          {collections}
          {children}
        </Providers>
      </body>
    </html>
  );
}
