"use client";

import NewPromptForm from "@/components/newPromptForm";
import { useAuth } from "@/utils/supabase/authProvider";
export default function Page() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full p-8 pt-28 flex gap-24 justify-center overflow-auto">
      <div className="flex flex-col gap-8 w-full">
        <NewPromptForm userId={user?.id} />
      </div>
    </div>
  );
}
