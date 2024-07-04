"use client";

import Button from "@/components/button";
import { FaArrowUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { checkLoggedInUser } from "@/utils/auth/checkLoggedInUser";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import TextArea from "@/components/textArea";
import { HiSparkles } from "react-icons/hi2";

export default function Page() {
  const router = useRouter();
  const [showNewPrompt, setShowNewPrompt] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkLoggedInUser();
      setUser(user);
    };

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
  }, [router]);

  return (
    <div className="w-screen h-screen p-8 flex gap-24 justify-center">
      <div className="h-fit px-4 py-2 flex flex-col w-fit border-2 rounded-xl gap-4">
        <div className="font-semibold text-3xl">my prompts</div>
        <Button
          onClick={() => {
            setShowNewPrompt(true);
          }}
          className="bg-white text-black font-medium"
        >
          + new prompt
        </Button>
        <div>Idea 1</div>
        <div>Idea 2</div>
        <div>Idea 3</div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        {showNewPrompt && (
          <>
            <h2 className="font-bold text-4xl">new prompt</h2>
            <div className="flex flex-col gap-2">
              <TextArea classNames="w-full" placeholder="prompt..." />
              <button className="flex gap-1">
                <HiSparkles className="text-2xl" />
                Generate Prompt
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-2xl">preset responses</h2>
              <Button className="bg-white text-black font-semibold">
                + Add Response
              </Button>
              <TextArea classNames="w-full" placeholder="response..." />

              <button className="flex gap-1">
                <HiSparkles className="text-2xl" />
                Generate responses
              </button>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>ends on: October 5, 2024</div>
              <Button className="bg-white text-black font-semibold">
                Save
              </Button>
              <Button
                onClick={() => {
                  setShowNewPrompt(false);
                }}
              >
                Discard
              </Button>
            </div>
          </>
        )}
      </div>

      {/* <div className="flex flex-col gap-8">
        <h2 className="font-bold text-4xl">give me your best saas idea</h2>
        <Button className="bg-white text-black">+ Add Response</Button>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-semibold text-xl">top responses</div>
          <div className="border-2 rounded-xl">
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <div className="font-semibold text-xl">other responses</div>
          <div className="border-2 rounded-xl">
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 w-full flex justify-between">
              <div className="flex items-center p-4">test</div>
              <div className="border-l-2 p-4">
                <div className="border-2 rounded-xl flex">
                  <div className="flex items-center justify-center p-2 text-yellow-300 font-semibold">
                    240
                  </div>
                  <div className="border-l-2 p-2 flex justify-center items-center">
                    <FaArrowUp />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
