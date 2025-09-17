import { LoginForm } from "../../component/LoginForm";
export default async function page() {
  return (
    <div className="flex min-h-screen  w-full items-center justify-center md:p-10">
      <div className="w-full p-2 max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
