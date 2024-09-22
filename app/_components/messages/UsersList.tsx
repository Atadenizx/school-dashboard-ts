"use client";
import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/store";
import {
  setWantedUserFirstName,
  setWantedUserId,
  setWantedUserLastName,
} from "@/app/_lib/features/messaging/messagesSlice"; // Adjust the path as needed

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
}

const supabase = createClient();

export default function UsersList({ availableUsers }: UsersListProps) {
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state: RootState) => state.messages.currentUserId
  );

  let filteredUsersWOCurrUser = [];

  if (!currentUserId) {
    return <h1 className="text-black text-center">Getting Users...</h1>;
  }

  if (currentUserId) {
    filteredUsersWOCurrUser = availableUsers.filter(
      (user) => user.auth_id !== currentUserId
    );
  }

  return (
    <ul className="w-fit min-h-screen gap-1 flex flex-col px-2">
      {filteredUsersWOCurrUser.map((user) => (
        <li
          className="text-black border text-center mt-1 border-gray-200 shadow-lg w-fit p-2 rounded-lg bg-white hover:cursor-pointer"
          key={user.id}
          onClick={() => {
            dispatch(setWantedUserId(user.auth_id));
            dispatch(setWantedUserFirstName(user.first_name));
            dispatch(setWantedUserLastName(user.last_name));
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
