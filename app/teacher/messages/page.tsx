import { createClient } from "@/utils/supabase/client";

export default async function page() {
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

  return <div></div>;
}
