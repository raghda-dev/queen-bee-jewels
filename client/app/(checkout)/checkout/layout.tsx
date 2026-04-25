// client/app/checkout/(checkout)/layout.tsx

import Link from 'next/link';
import Button from '../../(main)/components/Button';
import Image from 'next/image';
import ProtectedRoute from '../../(main)/components/ProtectedRoute';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-10 lg:px-20">
      {/* Top bar */}
      <div className="mb-10 flex items-center justify-between">
        {/* Logo Image */}
        <Link href="/">
          <Image
            src="/staticAssets/images/logo.svg"
            alt="Logo"
            width={100}
            height={70}
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Back to Shop Button */}
        <Link href="/home">
          <Button
            size="large"
            variant="textButton"
            color="var(--pinkish)"
            animation='text-underline'
            underlineDirection="from-right"
            rightIcon={<span>←</span>}
          >
            Back to Shop
          </Button>
        </Link>
      </div>

      {/* Main content */}
      {/* <main>{children}</main> */}
      <main><ProtectedRoute><>{children}</></ProtectedRoute></main>
    </div>
  );
}
