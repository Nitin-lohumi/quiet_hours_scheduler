import { SignUpForm } from "../../component/sign-up-form";
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    return redirect("/Home");
  }
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-1 md:p-10">
      <div className="w-full max-w-sm"> 
        <SignUpForm />
      </div>
    </div>
  );
}
