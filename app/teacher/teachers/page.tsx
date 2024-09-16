import { createClient } from "@/utils/supabase/client";
import { columns, Teacher } from "./columns";
import React from "react";
import { DataTable } from "@/app/_components/data-table";

async function getTeacherData(): Promise<Teacher[]> {
  const supabase = createClient();

  const { data: teachers, error } = await supabase.from("teachers").select("*");

  if (error) {
    console.log(error);
    return [];
  }

  return teachers ?? [];
}

export default async function Page() {
  const data = await getTeacherData();

  return (
    <div className="container mx-auto text-black py-4 px-2 no-scrollbar overflow-hidden">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
