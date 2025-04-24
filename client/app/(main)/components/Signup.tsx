import React from "react";
import { ChevronLeft } from "lucide-react";
import AuthForm from "./AuthForm";

interface SignupProps {
  setIsLogin: (value: boolean) => void;
}

const Signup: React.FC<SignupProps> = ({ setIsLogin }) => {
  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Signup form submitted");
  };

  return (
    <AuthForm
      title="create my account"
      fields={[
        { name: "full_name", type: "text",label: "full name", placeholder: "enter your name" },
        { name: "email", type: "email",label:"email", placeholder: "enter your email" },
        { name: "password", type: "password",label:"password", placeholder: "set a password" },
        { name: "password", type: "password",label:"confirm password", placeholder: "confirm password" },
      ]}
      
      buttonText="Sign Up"
      onSubmit={handleSignup}
      topRightIcon={null} // No need for another icon here
      topLeftIcon={
        <button  onClick={() => {
          console.log("Switching to Login...");
          setIsLogin(true);
        }}>
          
          <ChevronLeft className="text-purpleDark w-6 lg:w-10"/>
        </button>
      }
    />
  );
};

export default Signup;
