"use client";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import React from "react";
import { useToast } from "./ui/use-toast";

function CopyToClipboard({ text }: { text: string }) {
  const { toast } = useToast();

  const onClick = () => {
    navigator.clipboard.writeText(text);
    return toast({
      description: "Success copy to clipboard",
      variant: "default",
    });
  };

  return (
    <ClipboardCopyIcon onClick={onClick} className="ml-2 cursor-pointer" />
  );
}

export default CopyToClipboard;
