import { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import ProfileForm from "./profile-form";
export const metadata: Metadata = {
  title: "Profile",
};
const Profile = async () => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="max-w-md mx-auto space-y-4">
        <ProfileForm />
      </div>
    </SessionProvider>
  );
};
export default Profile;
