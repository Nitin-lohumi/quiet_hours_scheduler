import { LoginForm } from "../../component/LoginForm";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
export default async function page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/Home");
  }
  return (
    <div className="flex min-h-screen  w-full items-center justify-center md:p-10">
      <div className="w-full p-2 max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
