import React from "react";
import SideProfileHeader from "./SideProfileHeader";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarProfileActions } from "./SidebarProfileActions";

export default async function SideBar() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  const { first_name: firstName, last_name: lastName } = data?.user
    ?.user_metadata ?? { first_name: "jone", last_name: "doe" };

  if (error) {
    redirect("/login");
  }

  return (
    <div className="px-4 py-8 flex flex-col gap-4 justify-between">
      <div className="border-b pb-4">
        <SideProfileHeader firstName={firstName} lastName={lastName} />
      </div>
      <div className="space-y-4 border-b pb-4">
        <SidebarMenu />
      </div>
      <div>
        <SidebarProfileActions />
      </div>
    </div>
  );
}
