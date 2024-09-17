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

export default function DeleteTeacherButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const router = useRouter();
  const supabase = createClient();

  async function deleteTeacher(id: number) {
    const { error } = await supabase.from("teachers").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
    }
    toast.success("Successfully deleted");
    console.log("deleted");
    return router.back();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">Delete</Button>
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
