import React from "react";
import Image from "next/image";
import { cn } from "@/utils/utils";
import Brain from "./brain";
interface LogoProps {
  imageHeight?: number;
  imageWidth?: number;
  classNames?: string;
}

const Logo: React.FC<LogoProps> = ({
  imageHeight = 20,
  imageWidth = 75,
  classNames,
}) => {
  return (
    <div className={cn("flex items-center gap-4 w-fit", classNames)}>
      <Brain />
      {/* <Image
        className="[fill: black]"
        width={imageWidth}
        height={imageHeight}
        alt="brain"
        src="/brain.svg"
      /> */}
      <h1 className="text-nowrap">Idea Pool</h1>
    </div>
  );
};

export default Logo;
