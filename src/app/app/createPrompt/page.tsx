"use client";

import Button from "@/components/button";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { checkLoggedInUser } from "@/utils/auth/checkLoggedInUser";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import TextArea from "@/components/textArea";
import NewPromptForm from "@/components/newPromptForm";
import { Prompt } from "@/types/types";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [prompts, setPrompts] = useState<object[]>();

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkLoggedInUser();
      setUser(user);
    };
    try {
      if (typeof window !== "undefined") {
        checkUser();
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setUser(session?.user ?? null);
            if (!session?.user) {
              router.push("/");
            }
          }
        );

        return () => {
          authListener.subscription.unsubscribe();
        };
      }
    } catch (error: any) {
      console.error(error);
    }
  }, [router]);

  return (
    <div className="w-screen h-screen p-8 pt-28 flex gap-24 justify-center">
      {/* <div className="h-fit px-4 py-2 flex flex-col w-fit border-2 border-black  dark:border-white rounded-xl gap-4">
        <div className="font-semibold text-3xl">my prompts</div>
        <Button
          onClick={() => {
            setShowNewPrompt(true);
          }}
          className="bg-black dark:bg-white text-white dark:text-black font-medium text-nowrap"
        >
          + new prompt
        </Button>
        {prompts &&
          prompts.map((item, index: number) => (
            //@ts-ignore
            //TODO: Need to figure out typescript error here
            <div key={index}>{item.prompt}</div>
          ))}
      </div> */}
      <div className="flex flex-col gap-8 w-full">
        <NewPromptForm userId={user?.id} />
      </div>
    </div>
  );
}
