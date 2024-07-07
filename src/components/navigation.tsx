"use client";

import React from "react";
import Logo from "@/components/logo";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
import { useAuth } from "@/utils/supabase/authProvider";
import Link from "next/link";
import Button from "./button";
import { isMobile } from "react-device-detect";
import { RxHamburgerMenu } from "react-icons/rx";
import AppNavigation from "./appNavigation";

const Navigation = () => {
  const { user } = useAuth();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };
  if (!isMobile) {
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
              <Button className="h-fit border-black dark:bg-transparent text-black dark:text-white">
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
      </div>
    );
  }

  return (
    <>
      <div className="fixed w-full h-14 top-0 left-0 flex justify-between p-2 items-center">
        <RxHamburgerMenu
          onClick={() => {
            setShowMenu(true);
          }}
          className="text-3xl"
        />
        <Logo
          imageWidth={20}
          imageHeight={20}
          classNames="text-2xl font-bold gap-2"
        />
      </div>
      <div
        onClick={() => {
          setShowMenu(false);
        }}
        className={`absolute w-full h-full top-0 left-0 bg-black/10 ${
          !showMenu && " hidden"
        }`}
      >
        <div
          className={` h-full w-fit bg-white dark:bg-black left-0 top-0 flex flex-col justify-between pb-4`}
        >
          <AppNavigation disableBorders={true} disableGlobalPadding={true} />

          {!user ? (
            <div className="flex flex-col gap-2 w-full p-2">
              <Link href="/sign-up">
                <Button className="dark:bg-white bg-black text-white dark:text-black font-semibold h-fit w-full">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="h-fit border-black bg-transparent text-black dark:text-white w-full">
                  Login
                </Button>
              </Link>
            </div>
          ) : (
            <div className="w-full p-2">
              <Button
                className="w-full"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
