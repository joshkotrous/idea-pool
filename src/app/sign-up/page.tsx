"use client";

import TextInput from "@/components/textInput";
import Button from "@/components/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signup } from "../api/createUser/route";
import { googleLogin } from "../api/login/googleLogin";
export default function Page() {
  const signUp = () => {
    signup();
  };

  const loginWithGoogle = () => {
    googleLogin();
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <h2 className="text-4xl font-bold">Sign Up</h2>
      <div className="w-fit border-2 border-white rounded-xl flex flex-col justify-center items-center p-8 gap-4 ">
        <div className="flex gap-4 w-full">
          <TextInput classNames="w-full" placeholder="First Name..." />
          <TextInput classNames="w-full" placeholder="Last Name..." />
        </div>

        <TextInput classNames="w-full" placeholder="Email address..." />
        <TextInput classNames="w-full" placeholder="Password..." />
        <div className="w-full">
          <Button onClick={signUp} className="bg-white text-black w-full">
            Sign Up
          </Button>
        </div>
        <div className="grid grid-cols-2 grid-flow-col auto-cols-fr gap-4 text-lg w-full">
          <Button
            onClick={loginWithGoogle}
            className="w-full flex justify-center items-center gap-2 p-4"
          >
            <FaGoogle />
            Sign Up With Google
          </Button>
          <Button className="w-full  flex justify-center items-center gap-2 px-8">
            <FaGithub />
            Sign Up With GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
