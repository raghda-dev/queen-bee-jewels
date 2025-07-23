//client/app/(main)/components/Login.tsx

'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import AuthForm from "./AuthForm";
import axiosInstance from "../lib/axios/axios";
import { AxiosError } from "axios";

interface LoginProps {
  setIsLogin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const router = useRouter(); // ✅ useRouter hook

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      console.log("Login successful", res.data.user);

      router.push('/home'); // ✅ Redirect after success
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err.response?.data?.message || 'login failed');
    }
  };

  return (
    <AuthForm
      title={{ left: "hello lady", right: "sign in" }}
      fields={[
        { name: "email", type: "email", label: "email", placeholder: "enter your email" },
        { name: "password", type: "password", label: "password", placeholder: "enter your password" },
      ]}
      buttonText="Login"
      onSubmit={handleLogin}
      topLeftIcon={
        <button onClick={() => setIsLogin(false)}>
          <ChevronRight className="text-purpleDark w-6 mb-4 lg:w-10" />
        </button>
      }
      topRightIcon={null}
    />
  );
};

export default Login;
