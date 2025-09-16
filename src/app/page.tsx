import React from "react";
import { createClient } from "../../utils/supabase/server";
async function page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    
  }
  return (
    <>
      <p>helllo </p>
    </>
  );
}

export default page;
