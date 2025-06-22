// client/app/(main)/components/Signup.tsx

'use client';

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import AuthForm from './AuthForm';
import axiosInstance from '../lib/axios/axios';
import { AxiosError } from 'axios';

interface SignupProps {
  setIsLogin: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ setIsLogin }) => {
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const full_name = (form.elements.namedItem('full_name') as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem('confirm_password') as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/register', {
        full_name,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      console.log('Signup successful', res.data.user);
      setIsLogin(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err.response?.data?.message || 'signup failed');
    }
  };

  return (
    <AuthForm
      title="create my account"
      fields={[
        {
          name: 'full_name',
          type: 'text',
          label: 'full name',
          placeholder: 'enter your name',
        },
        {
          name: 'email',
          type: 'email',
          label: 'email',
          placeholder: 'enter your email',
        },
        {
          name: 'password',
          type: 'password',
          label: 'password',
          placeholder: 'set a password',
        },
        {
          name: 'confirm_password',
          type: 'password',
          label: 'confirm password',
          placeholder: 'confirm password',
        },
      ]}
      buttonText="Sign Up"
      onSubmit={handleSignup}
      topRightIcon={null}
      topLeftIcon={
        <button onClick={() => setIsLogin(true)}>
          <ChevronLeft className="w-6 text-purpleDark lg:w-10" />
        </button>
      }
    />
  );
};

export default Signup;
