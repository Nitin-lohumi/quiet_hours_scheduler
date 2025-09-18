import React from "react";
import type { Metadata } from "next";
import ToastWrapper from "../WrapperComp/ToastWrapper";
export const metadata: Metadata = {
  title: "User Authentication",
};
async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-200">
      <ToastWrapper>{children}</ToastWrapper>
    </div>
  );
}

export default layout;
