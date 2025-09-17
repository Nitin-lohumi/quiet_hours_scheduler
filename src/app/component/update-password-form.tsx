"use client";
import { createClient } from "../../../utils/supabase/Client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("sucessfully updated the password");
      router.push("/Home");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div {...props} className="shadow-xs shadow-amber-800 rounded-xl p-3 m-0">
      <div>
        <div>
          <p className="text-2xl">Reset Your Password</p>
          <p>Please enter your new password below.</p>
          <hr className="border-amber-100 mb-3" />
        </div>
        <div>
          <form onSubmit={handleForgotPassword}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 p-2">
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="New password"
                  className="p-1 pl-2 outline rounded-xl"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-lg shadow-xs rounded-xl shadow-amber-800 p-1 cursor-pointer hover:bg-gray-100"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save new password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
