import React, { ReactNode } from 'react';
import styles from '../styles/sass/modules/authform.module.scss';
import Button from '@/components/Button';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

const G = '/staticAssets/icons/Google.svg';
const F = '/staticAssets/icons/Facebook.svg';

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

  return (
    <div className={`${styles.authForm} relative`}>
      {/* Top Icons */}
      {topLeftIcon && (
        <div className="absolute left-4 top-4">{topLeftIcon}</div>
      )}
      {topRightIcon && (
        <div className="absolute right-4 top-4">{topRightIcon}</div>
      )}

      {/* Dynamic Titles */}
      {typeof title === 'string' ? (
        <h2 className="mb-5 text-center font-josefin text-3xl md:text-4xl xl:text-[2.5rem] font-semibold text-purpleMedium">
          {title}
        </h2>
      ) : (
        <div className="mb-6 mt-9 text-center flex items-center justify-between font-josefin text-[1.8rem] md:text-4xl font-semibold text-purpleMedium">
          <h2>
            {title.left}
          </h2>
          <h2>
            {title.right}
          </h2>
        </div>
      )}

      {/* Form */}
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index} className={styles.formGroup}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required
              className={styles.input}
            />
          </div>
        ))}

        {/* Remember Me & Forgot Password (Only for Login) */}
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

        {/* Submit Button */}
        <Button type="submit" shape="rectangle" color="var(--purple-medium)">
          {buttonText}
        </Button>

        {/* OR Separator */}
        <div className={styles.separator}>
          <span> Or </span>
        </div>

        {/* Social Login Buttons (Visible in Both Login & Signup) */}
        <div>
          <div className={styles.signupButtons}>
            <Button
              variant="secondary"
              shape='rectangle'
              size="medium"
              rightIcon={
                <Image src={G} alt="google icon" width={11} height={10} />
              }
            >
              {isLogin ? 'Log in with' : 'Sign up with'}
            </Button>
            <Button
              variant="secondary"
              shape='rectangle'
              size="medium"
              rightIcon={
                <Image src={F} alt="facebook icon" width={7} height={10} />
              }
            >
              {isLogin ? 'Log in with' : 'Sign up with'}
            </Button>
          </div>
        </div>

        {/* "Don't Have an Account? Sign Up" (Only for Login) */}
        {isLogin && (
          <div className="mt-5 flex items-center justify-center">
            <p className="text-lg">Don’t have an account?</p>
            <Button variant="textButton" 
            color="var(--purple-medium)" 
            size='small' shape='square'
            onClick={() => {
             //Ensure topLeftIcon is a valid React element and has an onclick function
             if(React.isValidElement(topLeftIcon) && topLeftIcon.props?.onClick){
              topLeftIcon.props.onClick();
             }
            }
            } // ✅ Call the function passed from `Login.tsx`
            >
              <span className="underline text-lg">Sign up</span>
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
