import { supabase } from "../supabase/client";

export async function checkLoggedInUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }

  return session?.user ? session?.user : null;
}
