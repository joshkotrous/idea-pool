import React from "react";
import { cn } from "@/utils/utils";
interface TextInputProps {
  classNames?: string;
  placeholder?: string;
  value?: string | number;
  name?: string;
  onChange?: (event: any) => void;
}

const TextArea: React.FC<TextInputProps> = ({
  classNames,
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      className={cn(
        "border-2 border-black dark:border-white bg-transparent rounded-xl p-2 outline-none ",
        classNames
      )}
    />
  );
};

export default TextArea;
