"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type firstAndLastName = {
  firstName: string;
  lastName: string;
};

export default function SideProfileHeader({
  firstName,
  lastName,
}: firstAndLastName) {
  return (
    <div className="flex gap-2">
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-black">
        <h1>
          {firstName} {lastName}
        </h1>
        <p className="text-gray-500">Teacher</p>
      </div>
    </div>
  );
}
