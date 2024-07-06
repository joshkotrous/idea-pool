"use client";

import React from "react";
import Logo from "@/components/logo";
import { supabase } from "@/utils/supabase/client";
import { useState } from "react";
const Navigation = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <div className="fixed w-full h-20 top-0 left-0 p-4 flex justify-between">
      <Logo imageWidth={60} classNames="text-2xl font-bold gap-2" />
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
    </div>
  );
};

export default Navigation;
