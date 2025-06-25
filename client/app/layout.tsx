// app/layout.tsx

import './styles/global.scss';
import './styles/tailwind.css';
import Providers from './providers'

import { RouteTracker } from './(main)/utils/RouteTracker';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-fit flex flex-col">
       <RouteTracker />
       <Providers>
        {children}
       </Providers>
      </body>
    </html> 
  );
}
