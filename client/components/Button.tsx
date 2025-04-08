"use client";

import React, { ReactNode } from "react";
import { cn } from "../utils/helpers"; // Utility for merging class names
import styles from '../styles/sass/modules/button.module.scss';

type ButtonProps = {
 variant?: "primary" | "secondary" | "textButton" | "gradient";
 shape?: "square" | "pill" | "rounded" | "rectangle" ;
 size?: 'small' | 'medium' | 'large';
 leftIcon?: ReactNode;
 rightIcon?: ReactNode;
 children?: ReactNode;
 onClick?: () => void;
 className?: string;
 disabled?: boolean;
 isLoading?: boolean;
 color?:string;
 animation?: "pulse" | "slide-in-bottom" | "shadow-expand" | "text-underline" | "bounce" | "flip" | "wave"; // Add animation prop
 hoverTextColor?: string;
 hoverBgColor?: string; 
 type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = 'primary',
  shape = "square",
  size = 'large',
  leftIcon,
  rightIcon,
  children,
  onClick,
  className,
  disabled = false,
  isLoading = false,
  color,
  animation,
  hoverTextColor,
  hoverBgColor,
}) => {

   // Set CSS variables dynamically
   const dynamicStyles: React.CSSProperties = {
    backgroundColor: variant === "primary" ? color || undefined : "transparent",
    color: variant === "primary" ? "white" : color,
    borderColor: variant === "secondary" ? color : undefined,
    "--gradient-color": color, // Pass color to CSS
    "--hover-text-color": hoverTextColor || "inherit", // Pass hoverTextColor to CSS as a variable
    "--hover-bg-color": hoverBgColor || "transparent", // Pass hoverBgColor to CSS as a variable

  } as React.CSSProperties;

  // Icon styles (for secondary and textButton)
  const iconStyles: React.CSSProperties = {
    color: variant === "secondary" || variant === "textButton" ? color : undefined,
  };


    return (
        <button type={type} className={cn(
          styles.button,
          styles[variant], 
          styles[shape],
          styles[size],
          animation && styles[animation], // Add animation class dynamically
          hoverTextColor && styles[hoverTextColor], // Add hover text color class dynamically
          hoverBgColor && styles[hoverBgColor], // Add hover background color class dynamically
            {
              'cursor-not-allowed opacity-50': disabled || isLoading,
            },
            className
        )}
         onClick = {!disabled && !isLoading ? onClick: undefined}
         disabled = {disabled || isLoading}
         style={dynamicStyles}
        >
        {leftIcon && <span className="mr-2" style={iconStyles}>{leftIcon}</span>}
        {isLoading? <span>...Loading</span> : children}
        {rightIcon && <span className="ml-2" style={iconStyles}>{rightIcon}</span>}

        </button>
    )
}


export default Button;