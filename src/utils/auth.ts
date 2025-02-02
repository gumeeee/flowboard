import { createClient } from "./supabase/client";
import { users } from "./users";

const supabase = createClient();

export const auth = {
  async signUp(email: string, password: string) {
    // Step 1: Check if email already exists in users table
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      throw new Error(
        "This email is already registered. Try signing in instead."
      );
    }

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 means no rows returned
      throw checkError;
    }

    // Step 2: Try to sign up the user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    // If signup fails
    if (signUpError) {
      throw signUpError;
    }

    // If no user data, something went wrong
    if (!data.user) {
      throw new Error("Failed to create user account");
    }

    // Step 3: Only proceed with profile creation for new signups
    if (data.user.identities?.length === 0) {
      try {
        await users.captureUserDetails(data.user);
      } catch (profileError) {
        // If profile creation fails, clean up the auth user
        await supabase.auth.admin.deleteUser(data.user.id);
        throw profileError;
      }
    }

    return data;
  },
  login: async () => {},
  signInWithOAuth: async () => {},
  logout: async () => {},
};
