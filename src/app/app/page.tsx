"use client";

import { useEffect, useState } from "react";
import { checkLoggedInUser } from "@/utils/auth/checkLoggedInUser";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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
      <div className="flex flex-col gap-8 w-full"></div>
    </div>
  );
}
