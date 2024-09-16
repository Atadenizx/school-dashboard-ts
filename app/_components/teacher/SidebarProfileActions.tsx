"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for combining classes from shadcn

export const SidebarProfileActions = () => {
  const supabase = createClient();
  const router = useRouter(); // For navigating after logout

  async function onLogout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/login"); // Redirect to login page after logout
      router.refresh(); // Clear cache and session data
    } else {
      console.error("Logout error:", error.message);
    }
  }

  const actions = [
    { label: "Profile", icon: User, action: () => router.push("/profile") },
    {
      label: "Settings",
      icon: Settings,
      action: () => router.push("/settings"),
    },
    { label: "Log Out", icon: LogOut, action: onLogout },
  ];

  return (
    <ul className="space-y-2 text-black">
      {actions.map((item) => {
        const Icon = item.icon;

        return (
          <li
            key={item.label}
            onClick={item.action}
            className={cn(
              "flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200"
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
};
