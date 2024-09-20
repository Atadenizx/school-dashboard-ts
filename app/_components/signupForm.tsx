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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Assuming shadcn/ui for RadioGroup
import { signUp } from "../_lib/api"; // Adjust your API method for creating a user
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Extend the form schema to include the role field.
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
  role: z.enum(["student", "teacher"]), // New field for role
});

export function SignupForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const supabase = createClient();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "student", // Default role can be student
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // 1. Sign up the user first with all the required fields
      const { res, error } = await signUp({
        email: data.email,
        password: data.password,
        firstName: data.firstName, // Ensure you pass these fields
        lastName: data.lastName,
        age: data.age,
      });

      if (error) {
        console.error("Signup error:", error.message);
        return;
      }

      // Access the `user` from `res`
      const user = res?.user;

      // 2. Update user metadata after signup
      if (user) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            age: data.age,
            role: data.role, // This is where you set the role
          },
        });

        if (user) {
          console.log("inserting user");
          console.log("inserting user");
          console.log("inserting user", user);
          await supabase.from("users").insert({
            auth_id: user.id,
            first_name: user.user_metadata.first_name, // replace with actual data
            last_name: user.user_metadata.last_name, // replace with actual data
            email: user.email,
          });
        }

        if (metadataError) {
          console.error("Error updating user metadata:", metadataError.message);
        } else {
          console.log("User signed up successfully with metadata");
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 ? (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
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
            </div>
            <Button
              onClick={async () => {
                const isValid = await form.trigger(["email", "password"]);
                if (isValid) {
                  setStep(2);
                }
              }}
              className="w-full"
            >
              Next
            </Button>
          </>
        ) : null}

        {step === 2 && (
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Role</FormLabel>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="flex space-x-4"
                  >
                    <FormItem>
                      <FormLabel>Student</FormLabel>
                      <RadioGroupItem value="student" />
                    </FormItem>
                    <FormItem>
                      <FormLabel>Teacher</FormLabel>
                      <RadioGroupItem value="teacher" />
                    </FormItem>
                  </RadioGroup>
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
        )}
      </form>
    </Form>
  );
}
