import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-navy/80 backdrop-blur-md py-4 pt-8">
      <div className="mx-auto flex items-center justify-between">

        <div className="flex items-center gap-2 cursor-pointer group">
          <Link href={"/"} className="text-4xl font-bold text-white tracking-tight">
            Poll App
          </Link >
        </div>

        <div className="flex items-center gap-4">
          <button className="bg-btn text-navy font-bold px-5 py-2.5 rounded-xl hover:cursor-pointer hover:bg-btn-active/90 transition-all">
            + Create New Poll
          </button>

          <button className="border border-btn text-white hover:bg-gray-800 px-5 py-2.5 rounded-xl transition-all hover:cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
