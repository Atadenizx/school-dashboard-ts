"use client";
import React, { useState } from "react";
import { createClient } from "@/utils/supabase/client";

type AvailableUser = {
  auth_id: string;
  email: string;
  id: number;
  first_name: string;
  last_name: string;
};

type TypeAvailableUsers = AvailableUser[];

interface UsersListProps {
  availableUsers: TypeAvailableUsers;
  senderId: string; // Specify that senderId is a string
}

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

export default function UsersList({
  availableUsers,
  senderId,
}: UsersListProps) {
  const [wantedUserId, setWantedUserId] = useState<string>("");

  async function sendMsg() {
    const data = await sendMessage(senderId, wantedUserId, "hello2");
    return data;
  }

  return (
    <ul>
      {availableUsers.map((user) => (
        <li
          className="text-black"
          key={user.id}
          onClick={() => {
            console.log("clicked", wantedUserId);

            setWantedUserId(user.auth_id);
            sendMsg(); // Optionally send message when a user is clicked
          }}
        >
          <h1>
            {user.first_name} {user.last_name}
          </h1>
        </li>
      ))}
    </ul>
  );
}
