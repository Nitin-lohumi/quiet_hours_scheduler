import React from "react";
import Header from "../component/Header";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import WrapperComp from "./WrapperComp";
import Providers from "./ReactQueryWrapper";
async function layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  return (
    <div className="">
      <header className="p-2 sticky top-0 shadow-xs shadow-blue-500  bg-gray-50">
        <Header />
      </header>
      <div className="max-h-screen max-w-full border min-w-96 m-auto  h-[calc(100vh-3.1rem)] flex items-center justify-center">
        <Providers>
          <WrapperComp>{children}</WrapperComp>
        </Providers>
      </div>
    </div>
  );
}

export default layout;
