"use client";
import React from "react";
import { Button } from "@/components/ui/button"; // Adjust the path if needed
import { ChevronLeft, CircleX } from "lucide-react";
import { useState } from "react";
import ResNavBar from "./ResNavBar";

type ChildrenType = {
  children?: React.ReactNode; // Make children optional if not always used
};

export default function ResHeaderBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full relative">
      {!isOpen && (
        <div className="w-full flex justify-end">
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            className="bg-white  text-black shadow-lg"
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}
      {isOpen && (
        <div className="h-full bg-white rounded-lg relative z-10">
          <div className="overflow-scroll">
            <ResNavBar setIsOpen={setIsOpen} />
          </div>
          <div className="absolute w-fit right-0 top-3">
            <Button
              variant="ghost"
              className="text-black"
              onClick={() => setIsOpen(false)}
            >
              <CircleX />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
