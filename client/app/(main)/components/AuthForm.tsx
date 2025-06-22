// client/app/(main)/components/AuthForm.tsx

'use client';

import React, { ReactNode, useState } from 'react';
import styles from '../../styles/sass/modules/authform.module.scss';
import Button from '../components/Button';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';
import { Eye, EyeOff } from 'lucide-react';

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
  topLeftIcon?: ReactNode;
  topRightIcon?: ReactNode;
};

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  fields,
  buttonText,
  onSubmit,
  topLeftIcon,
  topRightIcon,
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
            <label>{field.label}</label>

            {field.type === 'password' ? (
              <div className="relative">
                <input
                  type={visiblePasswords[field.name] ? 'text' : 'password'}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
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
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                className={styles.input}
              />
            )}
          </div>
        ))}

        {isLogin && (
          <div className="my-3 flex justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="textButton"
                leftIcon={<FaCheckCircle />}
                color="var(--purple-medium)"
              >
                Remember Me
              </Button>
            </div>
            <div className="text-right">
              <Button variant="textButton" color="var(--purple-medium)">
                <span className="underline">Forget Password?</span>
              </Button>
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
              <Image src="/staticAssets/icons/Google.svg" alt="google icon" width={11} height={10} />
            }
          >
            {isLogin ? 'Log in with' : 'Sign up with'}
          </Button>
          <Button
            variant="secondary"
            shape="rectangle"
            size="medium"
            rightIcon={
              <Image src="/staticAssets/icons/Facebook.svg" alt="facebook icon" width={7} height={10} />
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
