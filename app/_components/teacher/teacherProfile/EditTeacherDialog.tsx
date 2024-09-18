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
import { EditTeacherForm } from "./EditTeacherForm"; // Import the form component
import { TeacherFormType } from "./EditTeacherForm"; // Import the types if separated

type EditTeacherDialogProps = {
  teacher: TeacherFormType;
};

export const EditTeacherDialog = ({ teacher }: EditTeacherDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
          <Button onClick={() => setIsOpen(true)} variant="secondary">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-black border-none">
          <DialogHeader>
            <DialogTitle>Edit Teacher Information</DialogTitle>
            <DialogDescription>
              Update the teacher&apos;s information and save the changes.
            </DialogDescription>
          </DialogHeader>

          {/* Render the form component and pass the teacher data */}
          <EditTeacherForm teacher={teacher} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
