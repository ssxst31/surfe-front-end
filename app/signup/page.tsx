import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Signup from "app/signup/components/Signup";

export default async function ChatPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    return redirect("/");
  }

  return <Signup />;
}
