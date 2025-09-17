"use client";
import { createClient } from "../../../utils/supabase/Client";
import { useRouter } from "next/navigation";
import { UseStores } from "../../stores/Store";
export function LogoutButton() {
  const router = useRouter();
  const { clearUser } = UseStores();
  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    clearUser();
    router.push("/auth/login");
  };
  return (
    <button
      onClick={logout}
      className="shadow-xs shadow-red-300 hover:bg-red-600 hover:text-white  pl-2 pr-2 p-1 cursor-pointer font-serif text-gray-700 rounded-xl "
    >
      Logout
    </button>
  );
}
