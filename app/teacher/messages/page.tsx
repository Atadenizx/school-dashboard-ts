"use client";
import ChatBox from "@/app/_components/messages/ChatBox";
import { createClient } from "@/utils/supabase/client";

export default async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("current user:", data);
  const currUserId = data?.user?.id ?? undefined;
  console.log("user id", data?.user?.id);

  return (
    <div
      className="min-h-screen w-full bg-white rounded-lg p-4
    "
    >
      <ChatBox currUserId={currUserId} />
    </div>
  );
}
