// client/app/collections/auth/[slug]/page.tsx;

'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Login from '../../../(main)/components/Login';
import Signup from '../../../(main)/components/Signup';

export default function RegisterLoginPage() {
  const { slug } = useParams();
  const [isLogin, setIsLogin] = useState(slug === 'login');

  useEffect(() => {
    setIsLogin(slug === 'login');
  }, [slug]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 sm:px-12 md:px-16 lg:px-24 xl:px-32">
      <div className="w-full max-w-md">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )}
      </div>
    </section>
  );
}
