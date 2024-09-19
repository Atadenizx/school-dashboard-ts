import { createClient } from "@/utils/supabase/client";
import { columns, Teacher } from "./columns";
import React from "react";
import { DataTable } from "@/app/_components/data-table";

// Disable caching for the whole page
export const fetchCache = "force-no-store";

async function getTeacherData(): Promise<Teacher[]> {
  const supabase = createClient();

  const { data: teachers, error } = await supabase.from("teachers").select("*");

  if (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }

  return teachers ?? [];
}

export default async function Page() {
  const data = await getTeacherData();

  return (
    <div className="container mx-auto text-black py-4 px-2 min-h-screen no-scrollbar overflow-hidden">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
