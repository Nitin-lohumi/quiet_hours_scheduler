import React from "react";
import type { Metadata } from "next";
import ToastWrapper from "../WrapperComp/ToastWrapper";
export const metadata: Metadata = {
  title: "Thsi is a auth page",
};
function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"> 
      <body>
        <ToastWrapper>{children}</ToastWrapper>
      </body>
    </html>
  );
}

export default layout;
