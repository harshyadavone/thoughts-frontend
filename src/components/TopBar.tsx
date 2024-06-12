

import React from "react";
import { ModeToggle } from "./toggle-theme";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 border-b border-solid rounded-b-lg flex justify-around  md:hidden">
      <Link href="/">
        <div className="text-violet-500 text-xl font-bold p-2 font-other tracking-wider">
          Thoughts
        </div>
      </Link>
      <div className="text-sm p-1">
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;