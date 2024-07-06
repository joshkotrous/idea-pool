import React from "react";
import { cn } from "@/utils/utils";
interface TextInputProps {
  classNames?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  name?: string;
  handleChange?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  classNames,
  placeholder,
  value,
  handleChange,
  type,
  name,
}) => {
  return (
    <input
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      type={type}
      name={name}
      className={cn(
        "border-2 border-black dark:border-white bg-transparent rounded-xl p-2 ",
        classNames
      )}
    />
  );
};

export default TextInput;
