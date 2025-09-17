"use client";
import { createClient } from "../../../utils/supabase/Client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      toast.success("sucessfully login");
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
        <div className="p-1 mb-3">
          <p className="text-2xl text-center font-serif mb-2">Login</p>
          <p className="font-serif">Enter your Details below</p>
          <hr className="border-amber-100 pb-1" />
        </div>
        <div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <input
                  id="email"
                  type="email"
                  className="p-1 pl-2 outline rounded-xl"
                  placeholder="Enter your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="p-1 pl-2 outline rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center m-0">
                <Link
                  href="/auth/forgetPassword"
                  className="ml-auto text-lg underline-offset-4 hover:underline text-blue-600"
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full border text-lg cursor-pointer rounded-xl p-1 hover:bg-gray-100"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="mt-3 text-center text-lg">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="underline underline-offset-4 text-blue-800"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
