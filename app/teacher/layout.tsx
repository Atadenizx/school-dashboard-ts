import Header from "@/app/_components/teacher/Header";
import RightBar from "@/app/_components/teacher/RightBar";
import SideBar from "@/app/_components/teacher/SideBar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, Sidebar } from "lucide-react";
import React from "react";
import HeaderNav from "../_components/teacher/HeaderNav";
import SearchBar from "../_components/teacher/SearchBar";
import ResHeaderBtn from "../_components/ResHeaderBtn";
import { SidebarMenu } from "../_components/teacher/SidebarMenu";

type ChildrenType = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildrenType) {
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
          <div className="justify-self-end w-full pr-4 sm:w-fit lg:hidden">
            <ResHeaderBtn>
              <SidebarMenu />
            </ResHeaderBtn>
          </div>
        </header>

        <div className="max-h-screen">{children}</div>
      </div>
      <div className="hidden xl:flex min-h-screen xl:col-span-2 bg-red-500 shadow-lg">
        <RightBar />
      </div>
    </div>
  );
}
