import UsersList from "@/app/_components/messages/UsersList";
import { getAvailableUsers } from "@/app/_lib/api";
import StoreProvider from "@/app/StoreProvider";
import React from "react";

type ChildrenType = {
  children: React.ReactNode;
};

export default async function layout({ children }: ChildrenType) {
  const availableUsers = await getAvailableUsers();

  return (
    <div className="flex p-4 gap-2  ">
      <StoreProvider>
        <header
          className="min-h-screen w-fit bg-white rounded-lg overflow-y-auto
      "
        >
          <h1 className="text-black text-center py-2 bg-white rounded-t-lg ">
            Users
          </h1>
          <UsersList availableUsers={availableUsers} />
        </header>
        <main className="min-h-screen w-full">{children}</main>
      </StoreProvider>
    </div>
  );
}
