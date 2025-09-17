"use client";
import { createClient } from "../../../utils/supabase/Client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    if (password !== repeatPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/Home`,
        },
      });
      if (error) throw error;
      toast.success(
        "You've successfully signed up. Please check your email to confirm your account before signing in."
      );
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow-xs shadow-amber-800 rounded-xl p-3 m-0">
      <div>
        <div className="p-1 mb-3">
          <p className="text-2xl text-center font-serif mb-2">SignUp</p>
          <p className="font-serif">Enter your Details below</p>
          <hr className="border-amber-100 pb-1" />
        </div>
        <div>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your Email"
                  className="p-1 pl-2 outline rounded-xl"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter A Strong Password"
                  className="p-1 pl-2 outline rounded-xl"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <input
                  id="repeat-password"
                  type="password"
                  placeholder="Enter your Confirm Password"
                  className="p-1 pl-2 outline rounded-xl"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-lg shadow-xs rounded-xl shadow-amber-800 p-1 cursor-pointer hover:bg-gray-100"
                disabled={isLoading}
              >
                {isLoading ? "Creating an account..." : "Sign up"}
              </button>
            </div>
            <div className="mt-4 text-center text-lg">
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
    </div>
  );
}
