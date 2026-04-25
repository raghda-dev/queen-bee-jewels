// client/app/(main)/reset-password/page.tsx

'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axiosInstance from '../lib/axios/axios';
import { AxiosError } from 'axios';
import Button from '../components/Button';

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axiosInstance.post('/auth/reset-password', { token, password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      {success ? (
        <p className="text-green-600">Password reset! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            New Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border mt-1"
              required
            />
          </label>
          <label className="block">
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border mt-1"
              required
            />
          </label>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" color="var(--purple-medium)">
            Reset Password
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
