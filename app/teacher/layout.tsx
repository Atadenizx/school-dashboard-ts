import RightBar from "@/app/_components/teacher/RightBar";
import SideBar from "@/app/_components/teacher/SideBar";
import React from "react";
import HeaderNav from "../_components/teacher/HeaderNav";
import SearchBar from "../_components/teacher/SearchBar";
import ResHeaderBtn from "../_components/ResHeaderBtn";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

type ChildrenType = {
  children: React.ReactNode;
};

export default async function Layout({ children }: ChildrenType) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error || !data?.user) {
    return redirect("/login");
  }

  if (data?.user?.user_metadata?.role === "student") {
    return redirect("/student");
  }

  if (!data?.user?.user_metadata?.role) {
    // Show loading spinner while role is being fetched
    return <div className="text-white text-3xl">Loading...</div>;
  }
  return (
    <div className="lg:grid lg:grid-cols-12 max-h-screen">
      <div
        className="hidden lg:flex lg:col-span-2 2xl:col-span-1 bg-white shadow-lg min-h-screen overflow-y-auto"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        {" "}
        <style>
          {`
      .no-scrollbar::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
      }
    `}
        </style>
        <SideBar />
      </div>
      <div
        className="col-span-10 xl:col-span-8 2xl:col-span-9  bg-gray-200 flex flex-col overflow-y-auto max-w-screen"
        style={{
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none", // For Internet Explorer and Edge
        }}
      >
        <style>
          {`
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}
        </style>
        <header className="p-4 flex md:w-full lg:w-full">
          <div className="hidden sm:flex sm:justify-between lg:justify-between lg:mt-4 lg:mx-7 w-full items-center  text-2xl font-bold">
            <HeaderNav />
            <SearchBar />
          </div>
          <div className=" w-full lg:hidden">
            <ResHeaderBtn />
          </div>
        </header>

        <div className="max-h-screen">{children}</div>
      </div>
      <div className="hidden xl:flex min-h-screen xl:col-span-2 w-full 2xl:justify-center bg-white shadow-lg">
        <RightBar />
      </div>
    </div>
  );
}
