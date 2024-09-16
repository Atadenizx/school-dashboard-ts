import { Input } from "@/components/ui/input";

import React from "react";

export default function SearchBar() {
  return (
    <div>
      <Input
        className="rounded-full bg-white shadow-md w-48"
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}
