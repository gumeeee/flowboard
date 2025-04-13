"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModalDialog } from "@/hooks/useModalDIalog";
import { cn } from "@/lib/utils";
import { successBtnStyles } from "../commonStyles";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  projectDetails: {
    name: string;
    description: string;
    readme: string;
  };
}

export const CreateProjectModal = ({ projectDetails }: Props) => {
  const { name, description, readme } = projectDetails;
  const { isModalOpen, openModal, closeModal } = useModalDialog();

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogTrigger
        onClick={openModal}
        className={cn(
          successBtnStyles,
          "w-28 flex items-center justify-center",
          "disabled::cursor-not-allowed disabled:opacity-40"
        )}
        disabled={!name || !description || !readme}
      >
        Continue
      </DialogTrigger>

      <DialogContent className="md:min-w-[90%] lg:min-w-[70%] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Customize the default options for your project
        </DialogDescription>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto p-2"></div>

        <div className="flex gap-2 pt-4">
          <Checkbox />
          <Label>Skip Default options. I Will create my own options</Label>
        </div>

        <DialogFooter>
          <div className="flex justify-end">
            <Button className={cn(successBtnStyles, "w-28")}>Create</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
