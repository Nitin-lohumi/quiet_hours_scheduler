"use client";
import React from "react";
import { LogoutButton } from "./logout-button";
import { UseStores } from "@/stores/Store";

function Header() {
  const { user } = UseStores();
  return (
    <div className="flex justify-between items-center">
      <div className="font-serif font-bold text-xl">Shedular</div>
      <div className="flex flex-row items-center gap-2">
        <p>{user?.email}</p>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
