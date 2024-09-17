import { FinanceChart } from "@/app/_components/teacher/FinanceChart";
import { Piechart } from "@/app/_components/teacher/Piechart";
import { StudentAttendanceChart } from "@/app/_components/teacher/StudentAttendanceChart";
import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
    <div className="p-6 flex flex-col gap-6">
      <main className="flex flex-col lg:flex-row gap-6">
        <section className="flex-1 p-4 rounded-lg">
          <Piechart />
        </section>
        <section className="flex-1 p-4 rounded-lg">
          <StudentAttendanceChart />
        </section>
      </main>

      <footer className="flex-1 p-4 rounded-lg">
        <FinanceChart />
      </footer>
    </div>
  );
}
