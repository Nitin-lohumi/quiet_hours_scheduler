"use client";
import React, { useEffect } from "react";
import { createClient } from "../../../utils/supabase/Client";
import { UseStores } from "@/stores/Store";
function WrapperComp({ children }: { children: React.ReactNode }) {
  const { setUser } = UseStores();
  const supabase = React.useMemo(() => createClient(), []);
  useEffect(() => {
    async function getUserData() {
      const userData = await supabase.auth.getUser();
      const data = {
        id: userData?.data?.user?.id || "",
        email: userData.data.user?.email || "",
      };
      setUser(data);
    }
    getUserData();
  }, [setUser, supabase.auth]);

  return <>{children}</>;
}
export default WrapperComp;
