import React from "react";
import type { Metadata } from "next";
import ToastWrapper from "../WrapperComp/ToastWrapper";
export const metadata: Metadata = {
  title: "User Authentication",
};
function layout({ children }: { children: React.ReactNode }) {
  return <ToastWrapper>{children}</ToastWrapper>;
}

export default layout;
