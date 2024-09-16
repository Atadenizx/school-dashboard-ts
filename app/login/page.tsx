import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "../_components/loginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
  }
  if (data.user) {
    if (data.user.user_metadata.role === "admin") {
      redirect("/teacher");
    } else {
      redirect("/student");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="sm:w-2/3 md:w-2/4 lg:w-1/3">
        <Card className="py-4">
          <CardHeader className="text-center">
            <CardTitle>Login to your account!</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
              <p>Don&apos;t Have Account yet?</p>
              <Button asChild>
                <Link href="/login/sign-up">Click here to Sign Up!</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
