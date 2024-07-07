"use client";

import Button from "@/components/button";
import Link from "next/link";
import { useAuth } from "@/utils/supabase/authProvider";
export default function Page() {
  const { user } = useAuth();

  return (
    <div className="w-screen h-screen p-8 pt-28 flex gap-24 justify-center">
      {user && (
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center text-xl font-bold text-center ">
          Create a new prompt to get started
          <Link href="/app/createPrompt">
            <Button>Create Prompt</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
