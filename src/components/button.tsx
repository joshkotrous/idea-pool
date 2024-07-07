import React from "react";
import { cn } from "@/utils/utils";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "border-2 p-2 px-4 rounded-xl font-normal dark:text-black text-white dark:border-white border-black dark:bg-white bg-black outline-none ",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
