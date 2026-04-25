// client/app/(main)/forgot-password/page.tsx

'use client';

import React, { useState } from 'react';
import axiosInstance from '../lib/axios/axios';
import { AxiosError } from 'axios';
import Button from '../components/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await axiosInstance.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
      {submitted ? (
        <p className="text-green-600">
          Check your email for a link to reset your password.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border mt-1"
              required
            />
          </label>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <Button type="submit" color="var(--purple-medium)">
            Send Reset Link
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
