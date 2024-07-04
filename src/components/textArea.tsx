import React from "react";
import { cn } from "@/utils/utils";
interface TextInputProps {
  classNames?: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  handleChange?: () => void;
}

const TextArea: React.FC<TextInputProps> = ({
  classNames,
  placeholder,
  value,
  handleChange,
  name,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      name={name}
      className={cn(
        "border-2 border-white bg-black rounded-xl p-2 ",
        classNames
      )}
    />
  );
};

export default TextArea;
