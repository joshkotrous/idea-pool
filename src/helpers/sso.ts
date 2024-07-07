"use client";

import { redirect } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

export async function GoogleLogin() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: baseUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}

export async function GitHubLogin() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: baseUrl,
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
}
