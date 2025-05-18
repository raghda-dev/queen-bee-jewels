
// app/layout.tsx


import './styles/global.scss';
import { RouteTracker } from './(main)/utils/RouteTracker';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-fit flex flex-col">
       <RouteTracker />
        {children}
      </body>
    </html>
  );
}
