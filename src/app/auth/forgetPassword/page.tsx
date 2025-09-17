"use client";
import { createClient } from "../../../../utils/supabase/Client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/updatePass`,
      });
      if (error) throw error;
      setSuccess(true);
      router.push("/auth/login");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen min-h-screen flex justify-center item-center p-1">
      <div className="md:max-w-[1000px]  w-fit  md:h-fit shadow-xs shadow-amber-800 rounded-xl p-3 m-auto">
        {success ? (
          <div>
            <div>
              <p className="text-2xl font-serif">Check Your Email</p>
              <p>Password reset instructions sent</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                If you registered using your email and password, you will
                receive a password reset email.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <p className="text-2xl font-serif ">Reset Your Password</p>
              <p>we will send you a link to reset your password</p>
            </div>
            <div>
              <form onSubmit={handleForgotPassword}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your Email"
                      className="p-2 pl-2 outline rounded-xl"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="w-full text-lg shadow-xs rounded-xl shadow-amber-800 p-1 cursor-pointer hover:bg-gray-100" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send  email"}
                  </button>
                </div>
                <div className="mt-4 text-lg text-center">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="underline underline-offset-4 text-blue-600"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
