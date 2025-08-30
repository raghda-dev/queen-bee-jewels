// client/app/(main)/components/Signup.tsx

'use client';

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import AuthForm from './AuthForm';
import axiosInstance from '../lib/axios/axios';
import { AxiosError } from 'axios';

export interface SignupProps {
  setIsLogin: (value: boolean) => void;
  onSuccess?: () => void;
}

const Signup: React.FC<SignupProps> = ({ setIsLogin, onSuccess }) => {
  const [formValues, setFormValues] = useState({
    full_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'full_name':
        if (value.trim().split(' ').length < 2) error = 'Please enter at least two names';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
        break;
      case 'password':
        if (value.length < 8 || value.length > 13) error = 'Password must be 8–13 characters';
        else if (!/[0-9]/.test(value) || !/[!@#$%^&*.,;:]/.test(value))
          error = 'Must include number and special character';
        break;
      case 'confirm_password':
        if (value !== formValues.password) error = 'Passwords do not match';
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).some((val) => val)) return;

    try {
      const res = await axiosInstance.post('/auth/register', {
        full_name: formValues.full_name,
        email: formValues.email,
        password: formValues.password,
      });

      localStorage.setItem('token', res.data.token);
      setIsLogin(true);

      // ✅ call success handler if provided
      if (onSuccess) onSuccess();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      setErrors((prev) => ({
        ...prev,
        email: err.response?.data?.message || 'Signup failed',
      }));
    }
  };

  return (
    <AuthForm
      title="create my account"
      fields={[
        { name: 'full_name', type: 'text', label: 'full name', placeholder: 'enter your name' },
        { name: 'email', type: 'email', label: 'email', placeholder: 'enter your email' },
        { name: 'password', type: 'password', label: 'password', placeholder: 'set a password' },
        { name: 'confirm_password', type: 'password', label: 'confirm password', placeholder: 'confirm password' },
      ]}
      buttonText="Sign Up"
      onSubmit={handleSignup}
      topRightIcon={null}
      topLeftIcon={
        <button onClick={() => setIsLogin(true)}>
          <ChevronLeft className="w-6 text-purpleDark lg:w-10" />
        </button>
      }
      formValues={formValues}
      errors={errors}
      onInputChange={handleInputChange}
      onInputBlur={handleBlur}
    />
  );
};

export default Signup;
