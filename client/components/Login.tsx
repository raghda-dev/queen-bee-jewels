import React from "react";
import { ChevronRight } from "lucide-react";
import AuthForm from "./AuthForm";

interface LoginProps {
  setIsLogin: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login form submitted");
  };

  return (
    <AuthForm
      title={{ left: "hello lady", right: "sign in" }}
      fields={[
        { name: "email", type: "email", label:"email", placeholder: "enter your email" },
        { name: "password", type: "password",label:"password", placeholder: "enter your password" },
      ]}
      buttonText="Login"
      onSubmit={handleLogin}
      topLeftIcon={
        <button  onClick={() => {
          console.log("Switching to Signup...");
          setIsLogin(false);
        }}>
          <ChevronRight className="text-purpleDark w-6 mb-4 lg:w-10"/>
        </button>
      }
      topRightIcon={null} // No need for another icon here
    />
  );
};

export default Login;
