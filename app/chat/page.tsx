import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Chat from "app/chat/components/Chat";

import { fetchProfile } from "app/api/user";

export default async function ChatPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetchProfile(token).catch((error) => {
    return null;
  });

  if (!res) {
    redirect("/");
  }

  return (
    <div>
      <Chat />
    </div>
  );
}
