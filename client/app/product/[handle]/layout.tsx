// client/app/product/[handle]/layout.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '../../(main)/components/Button';

export default function OnePieceLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-10 lg:px-20">
      {/* Top bar */}
      <div className="relative flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/staticAssets/images/logo.svg"
              alt="Logo"
              width={100}
              height={70}
              className="w-28 transition-all sm:w-32 lg:w-40"
            />
          </Link>
        </div>

        {/* Back to Shop */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Button
              size="large"
              variant="textButton"
              color="var(--pinkish)"
              animation="text-underline"
              underlineDirection="from-right"
              rightIcon={<span>←</span>}
            >
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}
