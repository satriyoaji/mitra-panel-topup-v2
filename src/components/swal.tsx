import React from "react";
import { Button } from "./ui/button";
import { CheckIcon, Cross1Icon, InfoCircledIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "./ui/alert-dialog";

type TVarient = "success" | "failed" | "info";

interface Props {
  title: string;
  description?: string;
  onClick?: () => void;
  variant?: TVarient;
  open?: boolean;
  closeAble?: boolean;
}

function Icon({ variant }: { variant?: TVarient }) {
  if (variant === "success")
    return (
      <div className="w-10 h-10 bg-green-500 flex items-center justify-center rounded-full text-white animate-bounce">
        <CheckIcon className="h-5 w-5" />
      </div>
    );
  else if (variant === "failed")
    return (
      <div className="w-10 h-10 bg-red-500 flex items-center justify-center rounded-full text-white animate-bounce">
        <Cross1Icon className="h-5 w-5" />
      </div>
    );
  return (
    <div className="w-10 h-10 bg-blue-400 flex items-center justify-center rounded-full text-white animate-bounce">
      <InfoCircledIcon className="h-5 w-5" />
    </div>
  );
}

function Swal(props: Props) {
  return (
    <AlertDialog defaultOpen={props.open}>
      <AlertDialogContent>
        <div className="text-center flex flex-col items-center space-y-2">
          <Icon variant={props.variant} />
          <h5 className="text-xl font-medium">{props.title}</h5>
          <p className="text-sm text-muted-foreground">{props.description}</p>
        </div>
        <AlertDialogFooter>
          {props.closeAble && <AlertDialogCancel>Cancel</AlertDialogCancel>}
          {props.onClick && <Button>Oke</Button>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Swal;
