// client/app/(main)/components/Login.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AuthForm from './AuthForm';
import axiosInstance from '../lib/axios/axios';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../lib/redux/user/userSlice';
import { useAppSelector } from '../lib/redux/hooks';


export interface LoginProps {
  setIsLogin: (value: boolean) => void;
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogin, onSuccess }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);

  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormValues((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formValues.email.includes('@')) errs.email = 'Invalid email';
    if (formValues.password.length < 6) errs.password = 'Password too short';
    return errs;
  };

  

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  // ✅ Prevent login attempt if already logged in
  if (user) {
    router.replace('/home'); // redirect to home if already logged in
    window.location.href = '/home';
    return; // stop further execution
  }

  const errs = validate();
  if (Object.keys(errs).length > 0) {
    setErrors(errs);
    return;
  }

  try {
    const res = await axiosInstance.post('/auth/login', formValues);
    localStorage.setItem('token', res.data.token);
    if (rememberMe) localStorage.setItem('rememberedEmail', formValues.email);
    else localStorage.removeItem('rememberedEmail');

    dispatch(
      loginSuccess({
        token: res.data.token,
        user: res.data.user || null,
      })
    );

    if (onSuccess) onSuccess();

    router.push('/home');
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    setErrors({ password: err.response?.data?.message || 'Login failed' });
  }
};


  return (
    <AuthForm
      title={{ left: 'hello lady', right: 'sign in' }}
      fields={[
        { name: 'email', type: 'email', label: 'email', placeholder: 'enter your email' },
        { name: 'password', type: 'password', label: 'password', placeholder: 'enter your password' },
      ]}
      buttonText="Login"
      onSubmit={handleLogin}
      topLeftIcon={
        <button onClick={() => setIsLogin(false)}>
          <ChevronRight className="text-purpleDark w-6 mb-4 lg:w-10" />
        </button>
      }
      topRightIcon={null}
      formValues={formValues}
      errors={errors}
      onInputChange={handleInputChange}
      showRememberMe
      rememberMe={rememberMe}
      onToggleRememberMe={() => setRememberMe((prev) => !prev)}
    />
  );
};

export default Login;


