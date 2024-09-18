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
    <div className="lg:grid lg:grid-cols-12 min-h-screen">
      <div
        className="hidden lg:flex col-span-2 bg-white shadow-lg overflow-y-auto"
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
        className="col-span-8 bg-gray-200 flex flex-col overflow-y-auto"
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
        <header className="flex items-center justify-between w-screen bg-blue-300 p-4">
          <div className="hidden sm:flex sm:justify-between w-screen h-full items-center bg-red-500 text-2xl font-bold">
            <HeaderNav />
            <SearchBar />
          </div>
          <div className="justify-self-end w-full sm:w-fit lg:hidden">
            <ResHeaderBtn>
              <SidebarMenu />
            </ResHeaderBtn>
          </div>
        </header>

        <div>{children}</div>
      </div>
      <div className="hidden lg:flex  col-span-2 bg-white shadow-lg">
        <RightBar />
      </div>
    </div>
  );
}
