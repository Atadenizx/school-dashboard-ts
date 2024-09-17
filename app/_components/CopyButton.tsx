"use client";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import React from "react";
import { toast } from "sonner";

export default function CopyButton({ copyItem }: { copyItem: string }) {
  return (
    <Button
      variant="ghost"
      className="hover:bg-transparent"
      onClick={() => {
        console.log("copying", copyItem);
        navigator.clipboard.writeText(copyItem);
        toast.success("Email is copied to your clipboard");
      }}
    >
      <Copy />
    </Button>
  );
}
