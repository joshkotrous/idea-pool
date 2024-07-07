"use client";

import TextInput from "@/components/textInput";
import Button from "@/components/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { GoogleLogin, GitHubLogin } from "@/helpers/sso";
export default function Page() {
  const loginWithGoogle = async () => {
    GoogleLogin();
  };

  const loginWithGithub = async () => {
    GitHubLogin();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 p-4">
      <h2 className="text-4xl font-bold">Sign Up</h2>
      <div className="w-fit border-2 border-black dark:border-white rounded-xl flex flex-col justify-center items-center p-4 gap-4 ">
        <div className="grid grid-cols-2 grid-flow-col auto-cols-fr gap-4 text-sm md:text-lg w-full">
          <Button
            onClick={loginWithGoogle}
            className="w-full flex justify-center items-center gap-2 p-4 "
          >
            <FaGoogle className="text-3xl" />
            Sign Up With Google
          </Button>
          <Button
            onClick={loginWithGithub}
            className="w-full flex justify-center items-center gap-2 p-4 "
          >
            <FaGithub className="text-3xl" />
            Sign Up With GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
