import React from "react";
import SearchBar from "./SearchBar";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <div className="flex justify-between">
      <div>
        <HeaderNav />
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}
