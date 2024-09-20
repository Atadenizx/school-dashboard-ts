import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log("user data:", data);
  if (error || !data?.user) {
    redirect("/login");
  }
  if (data.user.user_metadata.role === "student") {
    redirect("/student");
  }
  if (
    data.user.user_metadata.role === "admin" ||
    data.user.user_metadata.role === "teacher"
  ) {
    redirect("/teacher");
  }

  return (
    <div className="bg-gray-200 min-w-screen min-h-screen flex flex-col">
      <header className="shadow-lg bg-white flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-black">EduAdmin</h1>
        <div className="flex justify-end w-full gap-4">
          <Button variant="default">
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="ghost" className="border border-black text-black">
            <Link href="/login/sign-up">Sign-Up</Link>
          </Button>
        </div>
      </header>
      <main
        className="relative flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://via.placeholder.com/1500x1000?text=School+Image')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Dark overlay */}
        <div className="relative z-10 text-center p-8 max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to EduAdmin
          </h1>
          <p className="text-lg md:text-2xl">
            Manage your school with ease. EduAdmin is your all-in-one solution
            for tracking student data, timetables, and more.
          </p>
          <div className="mt-8">
            <Button variant="default" className="text-lg">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>{" "}
      <footer className="bg-white p-4 shadow-md w-full text-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-gray-700">
            Designed and built by Batuhan Ata Deniz
          </p>
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
