import { FinanceChart } from "@/app/_components/teacher/FinanceChart";
import { Piechart } from "@/app/_components/teacher/Piechart";
import { StudentAttendanceChart } from "@/app/_components/teacher/StudentAttendanceChart";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { StudentsGenderBarChart } from "../_components/teacher/StudentsGenderBarChart";

export default async function Page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    redirect("/login");
  }

  if (data?.user?.user_metadata?.role !== "admin") {
    redirect("/private/student");
  }

  return (
    <div className="p-6 flex flex-col gap-6 min-h-screen">
      <main className="flex flex-col gap-6">
        <section className="grid grid-cols-2 2xl:grid-rows-2 gap-4 p-4 rounded-lg">
          <div className="col-span-1 2xl:row-span-1 block">
            <Piechart />
          </div>
          <div className="col-span-1 2xl:row-span-2 2xl:flex 2xl:items-center 2xl:justify-center">
            <StudentAttendanceChart />
          </div>
          <div className="hidden 2xl:block 2xl:col-span-1 2xl:row-span-1  bg-green-500">
            <StudentsGenderBarChart />
          </div>
        </section>
        <section className=" p-4 rounded-lg">
          <FinanceChart />
        </section>
      </main>
    </div>
  );
}
