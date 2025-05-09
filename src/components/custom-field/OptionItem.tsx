"use client";

import { Ellipsis, GripVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CustomFieldTagRenderer } from "./CustomFieldTagRenderer";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";

interface Props {
  item: ICustomFieldData;
}

export const OptionItem = ({ item }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: "option",
      option: item,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border bg-white dark:bg-slate-950 h-[60px]"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border bg-white dark:bg-slate-950 h-[60px]"
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-cente">
          <span {...attributes} {...listeners}>
            <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-600 cursor-grabbing" />
          </span>
          <CustomFieldTagRenderer
            color={item.color || ""}
            label={item.label || ""}
          />

          <div className="hidden md:inline-block text-sm truncate">
            This item hasn&apos;t been started
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis className="w-5 h-5 text-gray-400 dark:text-gray-600" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <span>Edit</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
