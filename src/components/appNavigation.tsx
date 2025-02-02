"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Button from "./button";
import Link from "next/link";
import { useAuth } from "@/utils/supabase/authProvider";
const AppNavigation: React.FC<{
  disableGlobalPadding?: boolean;
  disableBorders?: boolean;
}> = ({ disableGlobalPadding, disableBorders }) => {
  const { user } = useAuth();

  const [prompts, setPrompts] = useState<object[]>();

  const getPrompts = async () => {
    try {
      let { data, error } = await supabase
        .from("prompts")
        .select("*")
        .eq("user", user.id);
      if (data) {
        setPrompts(data);
      }

      if (error) {
        console.log(error);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrompts();
  }, [user]);

  if (user) {
    return (
      <div className={`${!disableGlobalPadding && "pt-28 pb-20"}`}>
        <div
          className={`h-fit max-h-full overflow-hidden px-4 py-2 flex flex-col w-fit ${
            !disableBorders && "border-2 "
          } border-black  dark:border-white rounded-xl gap-4 top-28`}
        >
          <div className="font-semibold text-3xl text-nowrap">my prompts</div>
          <Link href="/app/createPrompt">
            <Button className="bg-black dark:bg-white text-white dark:text-black font-medium text-nowrap w-full">
              + new prompt
            </Button>
          </Link>
          <div className="h-full flex gap-1 flex-col overflow-auto">
            {prompts &&
              prompts.map((item, index: number) => (
                <Link
                  className={`w-full dark:hover:bg-white hover:bg-black dark:hover:text-black hover:text-white rounded-xl p-2 transition-all`}
                  //@ts-ignore
                  //TODO: Need to figure out typescript error here
                  href={`/app/${item.id}`}
                  key={index}
                >
                  {
                    //@ts-ignore
                    //TODO: Need to figure out typescript error here
                    item.prompt
                  }
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default AppNavigation;
