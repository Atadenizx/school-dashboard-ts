import React from "react";
import CalendarComp from "./CalendarComp";
import Events from "./Events";

export default function RightBar() {
  return (
    <div className="py-4 flex flex-col h-fit">
      <div>
        <CalendarComp />
      </div>
      <div className="p-4">
        <h1 className="text-black font-bold">Events</h1>
        <Events />
      </div>
      <div className="p-4">
        <h1 className="text-black font-bold">Announcements</h1>
      </div>
    </div>
  );
}
