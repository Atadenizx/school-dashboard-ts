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
        <DialogTrigger
          className="bg-gray-200 py-2 px-3 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Edit
        </DialogTrigger>
        <DialogContent className="bg-black border-none">
          <DialogHeader>
            <DialogTitle>Edit Teacher Information</DialogTitle>
            <DialogDescription>
              Update the teacher&apos;s information and save the changes.
            </DialogDescription>
          </DialogHeader>

          {/* Render the form component and pass the teacher data */}
          <EditTeacherForm setIsOpen={setIsOpen} teacher={teacher} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
