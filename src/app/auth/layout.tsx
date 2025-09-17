import React from "react";
import type { Metadata } from "next";
import ToastWrapper from "../WrapperComp/ToastWrapper";
import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "User Authentication",
};
async function layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/Home");
  }
  return (
    <div className="bg-gray-300">
      <ToastWrapper>{children}</ToastWrapper>
    </div>
  );
}

export default layout;
