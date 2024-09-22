"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/store"; // Adjust the path to your store
import { createClient } from "@/utils/supabase/client";
import { useDispatch } from "react-redux";
import { setCurrentUserId } from "@/app/_lib/features/messaging/messagesSlice";
import { toast } from "sonner";

type TypeMessage = {
  message: string;
  messageTime: string;
};

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function ChatBox({ currUserId }: { currUserId: string }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<TypeMessage[]>([]);
  const supabase = createClient();
  const dispatch = useDispatch();
  dispatch(setCurrentUserId(currUserId));

  const wantedUserId = useSelector(
    (state: RootState) => state.messages.wantedUserId
  );

  const wantedUserFirstName = useSelector(
    (state: RootState) => state.messages.wantedUserFirstName
  );
  const wantedUserLastName = useSelector(
    (state: RootState) => state.messages.wantedUserLastName
  );

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

    console.log("message has been successfully sent");

    return data;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    sendMessage(currUserId, wantedUserId, message);

    setMessage("");
  }
  // console.log("curr user id:", currUserId);
  // console.log("wanted user id:", wantedUserId);

  return (
    <div className="text-black w-full h-full">
      <header className="border-b border-gray-200 min-w-full pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-green-400 rounded-full w-[10px] h-[10px]"></div>
          <h1 className="text-md">
            {wantedUserFirstName} {wantedUserLastName}
          </h1>
          <h2 className="text-gray-300 text-xs">Last seen: 23:59</h2>
        </div>
      </header>
      <main className="w-full border min-h-screen border-gray-200 rounded-lg p-4 flex flex-col justify-between">
        <div className="">
          <ul>
            {messageList?.map((msg, i) => (
              <li className="text-black border border-black mb-2" key={i}>
                {msg.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full items-center space-x-2">
          <form onSubmit={handleSubmit} className="flex gap-1">
            <Input
              type="text"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
