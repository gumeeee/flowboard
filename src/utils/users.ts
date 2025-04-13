import { createClient } from "./supabase/client";
import type { User } from "@supabase/supabase-js";

const supabase = createClient();

export const users = {
  async getUser(id: string) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data as IUser | null;
  },

  async createUser(user: Partial<IUser>) {
    const { data, error } = await supabase
      .from("users")
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data as IUser;
  },

  async captureUserDetails(authUser: User) {
    const existingUser = await this.getUser(authUser.id).catch(() => null);
    if (existingUser) return existingUser;

    const provider = authUser.app_metadata.provider as IUser["provider"];

    const newUser: Partial<IUser> = {
      id: authUser.id,
      email: authUser.email!,
      name: authUser.user_metadata.full_name || authUser.email!.split("@")[0],
      avatar: authUser.user_metadata.avatar_url || "",
      description: "",
      provider,
      links: [],
    };

    const createdUser = await this.createUser(newUser);
    return createdUser;
  },

  async updateUser(id: string, updates: Partial<IUser>) {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as IUser;
  },

  async updateProfile(
    userId: string,
    updates: Partial<Omit<IUser, "id" | "email" | "provider">>
  ) {
    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;

    const metadata: { avatar_url?: string; full_name?: string } = {};

    if (updates.avatar !== undefined) {
      metadata.avatar_url = updates.avatar;
    }

    if (updates.name !== undefined) {
      metadata.full_name = updates.name;
    }

    if (Object.keys(metadata).length > 0) {
      const { error: authError } = await supabase.auth.updateUser({
        data: metadata,
      });

      if (authError) {
        console.error("Failed to update auth user metadata:", authError);
      }
    }
  },
};
