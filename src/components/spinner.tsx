import { motion } from "framer-motion";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/utils/utils";
const Spinner: React.FC<{ classNames?: string; spinnerSize?: string }> = ({
  classNames,
  spinnerSize = "text-2xl",
}) => {
  return (
    <div
      className={cn(
        "size-full pt-28 flex justify-center items-center ",
        classNames
      )}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <AiOutlineLoading3Quarters className={spinnerSize} />
      </motion.div>
    </div>
  );
};

export default Spinner;
