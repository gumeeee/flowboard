import { createClient } from "@/utils/supabase/server";
import { users } from "@/utils/users";
import { redirect } from "next/navigation";
import React from "react";
import { ProfileForm } from "./[profileId]/ProfileForm";

const ProfilePage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const userDataById = await users.getUser(user.id);

  if (!userDataById) redirect("/login");

  return (
    <div className="flex justify-center items-center mt-16">
      <ProfileForm initialData={userDataById} />
    </div>
  );
};

export default ProfilePage;
