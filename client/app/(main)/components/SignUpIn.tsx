// client/app/(main)/components/SignUpIn.tsx

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import Signup from './Signup';
import Login from './Login';

const SignUpIn = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get('mode'); // read the mode from the url
  const [isLogin, setIsLogin] = useState(mode === 'login'); // Default based on URL

  // sync with URL changes
  useEffect(() => {
    setIsLogin(mode === 'login');
  }, [mode]);

  // ✅ handler when login succeeds
  const handleLoginSuccess = () => {
    router.push('/home'); // redirect immediately after login
  };

  // ✅ handler when signup succeeds
  const handleSignupSuccess = () => {
    setIsLogin(true); // after signup → go to login form
  };

  return (
    <section
      id="signupin"
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-2 sm:px-12 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Top Decoration */}
      <div className="absolute top-0 w-full">
        <Image
          src="/staticAssets/images/downAboveRec.svg"
          alt="box opener"
          width={1520}
          height={100}
          className="w-full"
        />
      </div>

      {/* Background Decorations - Left Side (Appears from md) */}
      <div className="absolute left-0 z-10 flex h-full items-center gap-x-16 md:flex">
        <Image
          src="/staticAssets/images/columns.svg"
          alt="columns"
          width={150}
          height={1000}
          className="h-full object-contain"
        />
        <Image
          src="/staticAssets/images/columns.svg"
          alt="columns"
          width={150}
          height={1000}
          className="h-full object-contain"
        />
        <Image
          src="/staticAssets/images/columns.svg"
          alt="columns"
          width={150}
          height={1000}
          className="h-full object-contain"
        />
        <Image
          src="/staticAssets/images/dottedSquares.svg"
          alt="dotted squares"
          width={200}
          height={150}
          className="relative hidden sm:block"
        />
      </div>

      {/* Auth Forms - Positioned to the Right */}
      <div className="relative z-20 ml-auto flex justify-end md:my-7 md:w-1/2 lg:w-1/3">
        <div className="flex min-h-[50vh] w-full max-w-2xl items-center mr-5 my-5">
          {isLogin ? (
            <Login setIsLogin={setIsLogin} onSuccess={handleLoginSuccess} />
          ) : (
            <Signup setIsLogin={setIsLogin} onSuccess={handleSignupSuccess} />
          )}
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 w-full">
        <Image
          src="/staticAssets/images/downAboveRec.svg"
          alt="box opener"
          width={1520}
          height={100}
          className="w-full"
        />
      </div>
    </section>
  );
};

export default SignUpIn;
