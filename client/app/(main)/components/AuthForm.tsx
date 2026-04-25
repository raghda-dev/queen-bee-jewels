//client/app/(main)/components/AuthForm.tsx

'use client';

import React, { ReactNode, useState } from 'react';
import styles from '../../styles/sass/modules/authform.module.scss';
import Button from '../components/Button';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

type FormField = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
};

type AuthFormProps = {
  title: string | { left: string; right: string };
  fields: FormField[];
  buttonText: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formValues?: { [key: string]: string };
  errors?: { [key: string]: string };
  topLeftIcon?: ReactNode;
  topRightIcon?: ReactNode;
  showRememberMe?: boolean;
  rememberMe?: boolean;
  onToggleRememberMe?: () => void;
};

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  buttonText,
  onSubmit,
  onInputChange,
  onInputBlur,
  formValues = {},
  errors = {},
  topLeftIcon,
  topRightIcon,
  showRememberMe = false,
  rememberMe = false,
  onToggleRememberMe,
}) => {
  const isLogin =
    (typeof title === 'string' && title.toLowerCase().includes('log in')) ||
    (typeof title === 'object' &&
      (title.left.toLowerCase().includes('sign in') ||
        title.right.toLowerCase().includes('sign in')));

  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});

  return (
    <div className={`${styles.authForm} relative`}>
      {topLeftIcon && <div className="absolute left-4 top-4">{topLeftIcon}</div>}
      {topRightIcon && <div className="absolute right-4 top-4">{topRightIcon}</div>}

      {typeof title === 'string' ? (
        <h2 className="mb-5 text-center font-josefin text-3xl md:text-4xl xl:text-[2.5rem] font-semibold text-purpleMedium">
          {title}
        </h2>
      ) : (
        <div className="mb-6 mt-9 text-center flex items-center justify-between font-josefin text-[1.8rem] md:text-4xl font-semibold text-purpleMedium">
          <h2>{title.left}</h2>
          <h2>{title.right}</h2>
        </div>
      )}

      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index} className={styles.formGroup}>
            <label htmlFor={field.name}>{field.label}</label>

            {field.type === 'password' ? (
              <div className="relative">
                <input
                  id={field.name}
                  type={visiblePasswords[field.name] ? 'text' : 'password'}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formValues[field.name] || ''}
                  onChange={onInputChange}
                  onBlur={onInputBlur}
                  className={styles.input}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() =>
                    setVisiblePasswords((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name],
                    }))
                  }
                >
                  {visiblePasswords[field.name] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            ) : (
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formValues[field.name] || ''}
                onChange={onInputChange}
                onBlur={onInputBlur}
                className={styles.input}
              />
            )}

            {errors[field.name] && (
              <p className="mt-1 text-sm text-orangeMain">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {isLogin && (
          <div className="my-3 flex justify-between items-center">
            {showRememberMe && (
              <label className="flex items-center rounded-full gap-2 cursor-pointer text-lg text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={onToggleRememberMe}
                  className="accent-purpleMedium w-4 h-4"
                />
                Remember Me
              </label>
            )}
            <div className="text-right">
              <Link href="/forgot-password">
              <Button variant="textButton" color="var(--purple-medium)">
                <span className="underline">Forget Password?</span>
              </Button>
              </Link>
            </div>
          </div>
        )}

        <Button type="submit" shape="rectangle" color="var(--purple-medium)">
          {buttonText}
        </Button>

        <div className={styles.separator}>
          <span> Or </span>
        </div>

        <div className={styles.signupButtons}>
          <Button
            variant="secondary"
            shape="rectangle"
            size="medium"
            rightIcon={
              <Image
                src="/staticAssets/icons/Google.svg"
                alt="google icon"
                width={11}
                height={10}
              />
            }
          >
            {isLogin ? 'Log in with' : 'Sign up with'}
          </Button>
          <Button
            variant="secondary"
            shape="rectangle"
            size="medium"
            rightIcon={
              <Image
                src="/staticAssets/icons/Facebook.svg"
                alt="facebook icon"
                width={7}
                height={10}
              />
            }
          >
            {isLogin ? 'Log in with' : 'Sign up with'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
