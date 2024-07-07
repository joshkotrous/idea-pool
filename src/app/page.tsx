"use client";

import Button from "@/components/button";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";
import { useAuth } from "@/utils/supabase/authProvider";

export default function Home() {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center font-bold text-6xl">
        <Logo />
        <h2 className="font-semibold text-3xl">Crowdsource your ideas.</h2>
        <div className="flex gap-4">
          <Link href="/sign-up">
            <Button className="dark:bg-white bg-black text-white dark:text-black font-semibold text-xl h-fit">
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button className="h-fit text-xl border-black dark:border-white bg-transparent text-black dark:text-white">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
