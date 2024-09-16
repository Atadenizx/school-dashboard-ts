import Header from "@/app/_components/teacher/Header";
import RightBar from "@/app/_components/teacher/RightBar";
import SideBar from "@/app/_components/teacher/SideBar";
import React from "react";

type childrenType = {
  children: React.ReactNode;
};

export default function Layout({ children }: childrenType) {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div
        className="col-span-2 bg-white shadow-lg overflow-y-auto"
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
        <header className="text-2xl font-bold px-8 py-4 mt-4">
          <Header />
        </header>
        <div>{children}</div>
      </div>
      <div className="col-span-2 bg-white shadow-lg">
        <RightBar />
      </div>
    </div>
  );
}
