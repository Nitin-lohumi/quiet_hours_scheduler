import { SignUpForm } from "../../component/sign-up-form";
export default async function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-1 md:p-10">
      <div className="w-full max-w-sm"> 
        <SignUpForm />
      </div>
    </div>
  );
}
