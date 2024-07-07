"use client";

import React from "react";
import Logo from "@/components/logo";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import { useAuth } from "@/utils/supabase/authProvider";
import Link from "next/link";
import Button from "./button";
const Navigation = () => {
  const { user } = useAuth();
  const [showDropDown, setShowDropDown] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="fixed w-full h-20 top-0 left-0 p-4 flex justify-between">
      <Logo imageWidth={60} classNames="text-2xl font-bold gap-2" />
      {!user ? (
        <div className="flex gap-4">
          <Link href="/sign-up">
            <Button className="dark:bg-white bg-black text-white dark:text-black font-semibold h-fit">
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button className="h-fit border-black dark:border-white bg-transparent text-black dark:text-white">
              Login
            </Button>
          </Link>
        </div>
      ) : (
        <Button
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
      )}

      {/* {user && (
        <div className="relative">
          <div
            onClick={() => {
              if (showDropDown) {
                setShowDropDown(false);
              } else {
                setShowDropDown(true);
              }
            }}
            className="bg-black dark:bg-white size-10 rounded-full  cursor-pointer"
          ></div>

          {showDropDown && (
            <div className="absolute w-28 h-fit bg-black dark:bg-white rounded-xl right-0 mt-2 text-white dark:text-black p-2 text-center">
              <ol>
                <li
                  onClick={() => {
                    signOut();
                  }}
                  className="hover:text-white hover:bg-black p-2 rounded-lg cursor-pointer"
                >
                  sign out
                </li>
              </ol>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Navigation;
