// app/layout.tsx

// import './styles/global.scss';
// import './styles/tailwind.css';
// import Providers from './providers';
// import { Toaster } from 'sonner';
// import { RouteTracker } from './(main)/utils/RouteTracker';
// import UserProfileInitializer from './(main)/home/UserProfileInitializer';

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="flex min-h-screen min-w-fit flex-col">
//         <UserProfileInitializer />
//         <RouteTracker />
//         <Providers>
//           {/* <Toaster richColors position="top-right" /> */}
//           <Toaster
//             toastOptions={{
//               className: 'toast',
//             }}
//           />
//           {children}
//         </Providers>
//       </body>
//     </html>
//   );
// }


// app/layout.tsx

import './styles/global.scss';
import './styles/tailwind.css';
import Providers from './providers';
import { Toaster } from 'sonner';
import { RouteTracker } from './(main)/utils/RouteTracker';
import UserProfileInitializer from './(main)/home/UserProfileInitializer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen min-w-fit flex-col">
        <Providers>
          <UserProfileInitializer /> {/* ✅ Now inside Provider */}
          <RouteTracker />
          <Toaster
            toastOptions={{
              className: 'toast',
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
