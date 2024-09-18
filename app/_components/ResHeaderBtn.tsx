"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the path if needed
import { ChevronLeft, CircleX } from "lucide-react";
import { useState } from "react";

type ChildrenType = {
  children?: React.ReactNode; // Make children optional if not always used
};

export default function ResHeaderBtn({ children }: ChildrenType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-end w-full">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="bg-red-500"
          size="icon"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      {isOpen && (
        <div className="max-w-screen max-h-screen grid grid-cols-2">
          <div
            className="col-span-1 overflow-scroll"
            onClick={() => setIsOpen(false)}
          >
            {children}
          </div>
          <div className="col-span-1 w-fit h-fit justify-self-end">
            <Button variant="default" onClick={() => setIsOpen(false)}>
              <CircleX />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
