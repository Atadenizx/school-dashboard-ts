"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import React from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function DeleteStudentBtn({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  async function deleteTeacher(id: string) {
    const { error } = await supabase.from("students").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("Successfully deleted");
    console.log("deleted");
    router.refresh();
    return router.push("/teacher/students");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-red-400 text-white py-2 px-3 rounded-lg">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black outline-none border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {name}
            &apos;s account and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent hover:bg-transparent">
            <Button onClick={() => deleteTeacher(id)} variant="destructive">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
