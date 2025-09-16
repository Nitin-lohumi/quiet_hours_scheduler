import Link from "next/link";
export default function PublicPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-300 md:px-6">
      <div className="m-auto max-w-[1100px] items-center text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Quiet Hours Scheduler
        </h1>
        <p className="text-lg text-gray-600">
          Manage your productivity with ease! 🚀 <br />
          Quiet Hours Scheduler helps you block distractions, set focus time,
          and control when notifications should pause — so you stay in control.
        </p>

        <div className="mt-8">
          <Link
            href="/auth/login"
            className="px-6 py-3 rounded-2xl bg-green-600 text-white text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started →
          </Link>
        </div>
      </div>
    </main>
  );
}
