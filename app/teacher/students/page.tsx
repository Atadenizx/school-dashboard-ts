import { DataTable } from "@/app/_components/data-table";
import React from "react";
import { columns, Student } from "./columns";
import { createClient } from "@/utils/supabase/client";

export const fetchCache = "force-no-store";

async function getStudentData(): Promise<Student[]> {
  const supabase = createClient();

  const { data: students, error } = await supabase.from("students").select("*");

  if (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }

  return students ?? [];
}

export default async function page() {
  const data = await getStudentData();

  return (
    <div className="container mx-auto text-black py-4 px-2 min-h-screen no-scrollbar overflow-hidden">
      <DataTable filterItem="name" columns={columns} data={data} />
    </div>
  );
}
