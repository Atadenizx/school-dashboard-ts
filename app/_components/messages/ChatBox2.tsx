import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface Message {
  id: number;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  created_at: string;
}

interface ChatBoxProps {
  senderId: string;
  receiverId: string;
}

export default function ChatBox({ senderId, receiverId }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState<string>("");

  useEffect(() => {
    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(senderId, receiverId);
      if (fetchedMessages) setMessages(fetchedMessages);
    };

    fetchMessages();
  }, [senderId, receiverId]);

  const sendMessage = async () => {
    if (!messageText) return;
    const data = await supabase.from("messages").insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        message_text: messageText,
      },
    ]);

    if (data) {
      setMessages((prev) => [
        ...prev,
        {
          id: data[0].id,
          sender_id: senderId,
          receiver_id: receiverId,
          message_text: messageText,
          created_at: new Date().toISOString(),
        },
      ]);
      setMessageText("");
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${
              msg.sender_id === senderId ? "sent" : "received"
            }`}
          >
            <p>{msg.message_text}</p>
            <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
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
