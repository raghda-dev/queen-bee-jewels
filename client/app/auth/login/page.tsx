// client/app/auth/login/page.tsx

'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Login from 'app/(main)/components/Login';

const LoginContent = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/home';
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Login
        setIsLogin={() => {
          router.push(redirectPath); // Go back after login
        }}
      />
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
// 'use client';

// import { useSearchParams, useRouter } from 'next/navigation';
// import Login from 'app/(main)/components/Login';

// const LoginPage = () => {
//   const searchParams = useSearchParams();
//   const redirectPath = searchParams.get('redirect') || '/home';

//   const router = useRouter();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <Login
//         setIsLogin={() => {
//           router.push(redirectPath); // Go back after login
//         }}
//       />
//     </div>
//   );
// };

// export default LoginPage;
