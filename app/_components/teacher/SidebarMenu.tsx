"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Bell,
  Clipboard,
  FileText,
  ListChecks,
  UserCheck,
  FilePlus,
} from "lucide-react";
import { cn } from "@/lib/utils"; // utility to combine classes from shadcn

export const SidebarMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", icon: Home, path: "/teacher" },
    { label: "Teachers", icon: Users, path: "/teacher/teachers" },
    { label: "Students", icon: Users, path: "/teacher/students" },
    { label: "Parents", icon: Users, path: "/teacher/parents" },
    { label: "Subjects", icon: BookOpen, path: "/teacher/subjects" },
    { label: "Classes", icon: Clipboard, path: "/teacher/classes" },
    { label: "Lessons", icon: FileText, path: "/teacher/lessons" },
    { label: "Exams", icon: ListChecks, path: "/teacher/exams" },
    { label: "Arrangements", icon: FilePlus, path: "/teacher/arrangements" },
    { label: "Results", icon: UserCheck, path: "/teacher/results" },
    { label: "Attendance", icon: Calendar, path: "/teacher/attendance" },
    { label: "Events", icon: Calendar, path: "/teacher/events" },
    { label: "Messages", icon: MessageSquare, path: "/teacher/messages" },
    { label: "Announcements", icon: Bell, path: "/teacher/announcements" },
  ];

  return (
    <ul className="space-y-2 text-black">
      {menuItems.map((item) => {
        const Icon = item.icon;

        return (
          <li key={item.label}>
            <Link
              href={item.path}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-200",
                pathname === item.path && "bg-gray-200" // Active state
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
