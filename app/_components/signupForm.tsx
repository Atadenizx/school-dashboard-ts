"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "../_lib/api";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email("Enter a valid email."),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  age: z.string().transform((age) => Number(age)),
});

export function SignupForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const { res, error } = await signUp(data); // Await the login function

      if (error) {
        console.error("Login error:", error.message);
      } else if (res) {
        console.log("Signed up successfully:", res);
        // Handle successful login, like redirecting the user
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 ? (
          <>
            {" "}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <p>Step 1/2</p>
              <Progress value={50} max={100} />
            </div>{" "}
            <Button
              onClick={async () => {
                const isValid = await form.trigger(["email", "password"]); // Validate email and password
                console.log(isValid);
                if (isValid) {
                  setStep(2); // Move to step 2 only if valid
                }
              }}
              className="w-full"
            >
              Next
            </Button>
          </>
        ) : (
          ""
        )}
        {step === 2 ? (
          <>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormDescription>
                    {/* This is your public display name. */}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Age" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <p>Last step!</p>
              <Progress value={100} max={100} />
            </div>
            <div className="w-full flex gap-4">
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => setStep(1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button className="w-full" type="submit">
                Sign Up!
              </Button>
            </div>
          </>
        ) : (
          ""
        )}
      </form>
    </Form>
  );
}
