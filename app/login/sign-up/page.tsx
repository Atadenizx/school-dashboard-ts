import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignupForm } from "@/app/_components/signupForm";

export default function page() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="sm:w-2/3 md:w-2/4 lg:w-1/3">
        <Card className="py-4">
          <CardHeader className="text-center">
            <CardTitle>Create a new account!</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter>
            <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
              <p>Already have an account?</p>
              <Button asChild>
                <Link href="/login">Click here to Login!</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
