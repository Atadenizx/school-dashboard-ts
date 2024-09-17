"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

// Define form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  age: z
    .number()
    .min(18, "Age must be at least 18")
    .max(100, "Age is too high"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters").max(50),
  grades: z.string().min(1, "Must specify grades taught").max(50),
  teaching_hours: z
    .number()
    .min(1, "Must have at least 1 teaching hour")
    .max(40),
});

// Define types
type TeacherFormType = {
  id: number;
  name: string;
  age: number;
  email: string;
  subject: string;
  grades: string;
  teaching_hours: number;
};

type EditTeacherFormProps = {
  teacher: TeacherFormType; // Ensure the teacher has the `id` property
};

export default function EditTeacherForm({ teacher }: EditTeacherFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState } = useForm<TeacherFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: teacher, // Prefill with teacher data
  });

  const { errors } = formState;
  const router = useRouter(); // Use router to refresh the page

  const onSubmit = async (data: TeacherFormType) => {
    const supabase = createClient();

    // Perform the update query
    const { error } = await supabase
      .from("teachers")
      .update({
        name: data.name,
        age: data.age,
        email: data.email,
        subject: data.subject,
        grades: data.grades,
        teaching_hours: data.teaching_hours,
      })
      .eq("id", teacher.id)
      .select();

    if (error) {
      console.error("Error updating teacher:", error);
    } else {
      toast.success("Teacher information is successfully updated");
      router.refresh(); // Refresh the page after the update
      return setIsOpen(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={() => setIsOpen(true)} variant="secondary">
            Edit
          </Button>
        </DialogTrigger>
        {isOpen && (
          <DialogContent className="bg-black border-none">
            <DialogHeader>
              <DialogTitle>Edit Teacher Information</DialogTitle>
              <DialogDescription>
                Update the teacher&apos;s information and save the changes.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Name Field */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Age Field */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { valueAsNumber: true })}
                  placeholder="Enter age"
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Enter subject"
                />
                {errors.subject && (
                  <p className="text-red-500">{errors.subject.message}</p>
                )}
              </div>

              {/* Grades Field */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="grades">Grades</Label>
                <Input
                  id="grades"
                  {...register("grades")}
                  placeholder="Enter grades taught"
                />
                {errors.grades && (
                  <p className="text-red-500">{errors.grades.message}</p>
                )}
              </div>

              {/* Teaching Hours Field */}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="teaching_hours">Teaching Hours</Label>
                <Input
                  id="teaching_hours"
                  type="number"
                  {...register("teaching_hours", { valueAsNumber: true })}
                  placeholder="Enter teaching hours"
                />
                {errors.teaching_hours && (
                  <p className="text-red-500">
                    {errors.teaching_hours.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <Button type="submit" variant="default" className="w-full">
                  Save Changes
                </Button>
              </div>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
