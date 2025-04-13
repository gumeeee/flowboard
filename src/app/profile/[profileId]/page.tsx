import { users } from "@/utils/users";
import { notFound } from "next/navigation";
import React from "react";
import { ProfileView } from "./ProfileView";
import { createClient } from "@/utils/supabase/server";

async function getUser(profileId: string): Promise<IUser> {
  try {
    const user = await users.getUser(profileId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

const PublicProfilePage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) => {
  const { profileId } = await params;

  const user = await getUser(profileId);

  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();
  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="my-16">
      <ProfileView user={user} isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default PublicProfilePage;
