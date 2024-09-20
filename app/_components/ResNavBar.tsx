"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const menuItems = [
  { label: "Home", path: "/teacher" },
  { label: "Teachers", path: "/teacher/teachers" },
  { label: "Students", path: "/teacher/students" },
  { label: "Parents", path: "/teacher/parents" },
  { label: "Subjects", path: "/teacher/subjects" },
  { label: "Classes", path: "/teacher/classes" },
  { label: "Lessons", path: "/teacher/lessons" },
  { label: "Exams", path: "/teacher/exams" },
  { label: "Arrangements", path: "/teacher/arrangements" },
  { label: "Results", path: "/teacher/results" },
  { label: "Attendance", path: "/teacher/attendance" },
  { label: "Events", path: "/teacher/events" },
  { label: "Messages", path: "/teacher/messages" },
  { label: "Announcements", path: "/teacher/announcements" },
];

export default function ResNavBar({ setIsOpen }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<string>("menu");
  const supabase = createClient();
  const router = useRouter(); // For navigating after logout

  const profileItems = [
    { label: "Profile", action: () => router.push("/profile") },
    {
      label: "Settings",
      action: () => router.push("/settings"),
    },
    { label: "Log Out", action: onLogout },
  ];

  async function onLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/"); // Redirect to login page after logout
      router.refresh(); // Clear cache and session data
    } else {
      console.error("Logout error:", error.message);
    }
  }

  return (
    <div className=" h-screen p-4">
      <div className="flex w-full gap-10 text-2xl text-black font-thin border-black border-b">
        <h2
          className={`${
            isMenuOpen === "menu" ? "text-black" : "text-gray-400"
          } `}
          onClick={() => setIsMenuOpen("menu")}
        >
          Menu
        </h2>
        <h2
          className={`${
            isMenuOpen === "profile" ? "text-black" : "text-gray-400"
          } `}
          onClick={() => setIsMenuOpen("profile")}
        >
          Profile
        </h2>
      </div>
      <div className="text-black">
        {isMenuOpen === "menu" && (
          <ul
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {menuItems.map((item) => {
              return (
                <li className="w-64 text-xl" key={item.label}>
                  <Link
                    href={item.path}
                    className={cn("flex items-center space-x-2 p-2 rounded-lg")}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {isMenuOpen === "profile" && (
          <ul
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {profileItems.map((item) => {
              return (
                <li
                  key={item.label}
                  onClick={item.action}
                  className={cn(
                    "flex text-xl items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                  )}
                >
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/*
      {isOpen === "menu" && (
        <ul className="space-y-2 text-black">
          {menuItems.map((item) => {
            return (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200"
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}



            {isOpen === "profile" && (
        <ul className="space-y-2 text-black">
          {profileItems.map((item) => {
            return (
              <li
                key={item.label}
                onClick={item.action}
                className={cn(
                  "flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
                )}
              >
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      )}
  */
