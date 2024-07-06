"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Button from "./button";
import Link from "next/link";
const AppNavigation = () => {
  const [prompts, setPrompts] = useState<object[]>();

  const getPrompts = async () => {
    try {
      let { data, error } = await supabase.from("prompts").select("*");
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
  }, []);

  return (
    <div className="pt-28 pb-20">
      <div className="h-fit max-h-full overflow-hidden px-4 py-2 flex flex-col w-fit border-2 border-black  dark:border-white rounded-xl gap-4 top-28">
        <div className="font-semibold text-3xl text-nowrap">my prompts</div>
        <Link href="/app/createPrompt">
          <Button className="bg-black dark:bg-white text-white dark:text-black font-medium text-nowrap w-full">
            + new prompt
          </Button>
        </Link>
        <div className="h-full flex flex-col gap-4 overflow-auto">
          {prompts &&
            prompts.map((item, index: number) => (
              //@ts-ignore
              //TODO: Need to figure out typescript error here
              <Link href={`/app/${item.id}`} key={index}>
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
};

export default AppNavigation;
