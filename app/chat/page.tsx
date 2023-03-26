import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Chat from "app/chat/components/Chat";

export default async function ChatPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/");
  }

  return (
    <div>
      <Chat />
    </div>
  );
}
