import React from "react";
import SideProfileHeader from "./SideProfileHeader";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfileActions } from "./SidebarProfileActions";

export default async function SideBar() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/login");
  }

  return (
    <div className="px-4 py-8 flex flex-col gap-4 justify-between">
      <div className="border-b pb-4">
        <SideProfileHeader user={data} />
      </div>
      <div className="space-y-4 border-b pb-4">
        <h2 className="text-gray-500">Menu</h2>
        <SidebarMenu />
      </div>
      <div>
        <SidebarProfileActions />
      </div>
    </div>
  );
}
