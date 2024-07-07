"use client";

import Button from "@/components/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="w-screen h-screen p-8 pt-28 flex gap-24 justify-center">
      <div className="flex flex-col gap-4 w-full h-full items-center justify-center text-xl font-bold">
        Create a new prompt to get started
        <Link href="/app/createPrompt">
          <Button>Create Prompt</Button>
        </Link>
      </div>
    </div>
  );
}
