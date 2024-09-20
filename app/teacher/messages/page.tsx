"use client";
import UsersList from "@/app/_components/messages/UsersList";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

async function sendMessage(
  senderId: string,
  receiverId: string,
  messageText: string
) {
  const { data, error } = await supabase.from("messages").insert([
    {
      sender_id: senderId,
      receiver_id: receiverId,
      message_text: messageText,
    },
  ]);

  if (error) {
    console.error("Error sending message:", error.message);
    return null;
  }

  return data;
}

async function getMessages(userId: string, contactId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .or(`sender_id.eq.${contactId},receiver_id.eq.${contactId}`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error.message);
    return null;
  }

  return data;
}

async function getAvailableUsers() {
  const { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error.message);
    return error;
  }
  return users;
}

export default async function page() {
  // const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log("user id", data?.user?.id);

  const availableUsers = await getAvailableUsers();

  console.log("available users:", availableUsers);

  return (
    <div>
      <div>
        <UsersList senderId={data?.user?.id} availableUsers={availableUsers} />
      </div>
    </div>
  );
}
