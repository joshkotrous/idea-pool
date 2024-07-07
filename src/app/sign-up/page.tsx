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
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <h2 className="text-4xl font-bold">Sign Up</h2>
      <div className="w-fit border-2 border-black dark:border-white rounded-xl flex flex-col justify-center items-center p-8 gap-4 ">
        {/* <div className="flex gap-4 w-full">
          <TextInput classNames="w-full" placeholder="First Name..." />
          <TextInput classNames="w-full" placeholder="Last Name..." />
        </div>

        <TextInput classNames="w-full" placeholder="Email address..." />
        <TextInput classNames="w-full" placeholder="Password..." />
        <div className="w-full">
          <Button
            onClick={signUp}
            className="bg-black dark:bg-white text-white dark:text-black w-full"
          >
            Sign Up
          </Button>
        </div> */}
        <div className="grid grid-cols-2 grid-flow-col auto-cols-fr gap-4 text-lg w-full">
          <Button
            onClick={loginWithGoogle}
            className="w-full flex justify-center items-center gap-2 p-4"
          >
            <FaGoogle />
            Sign Up With Google
          </Button>
          <Button
            onClick={loginWithGithub}
            className="w-full  flex justify-center items-center gap-2 px-8"
          >
            <FaGithub />
            Sign Up With GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
