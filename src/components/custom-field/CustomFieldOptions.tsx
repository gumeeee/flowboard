"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { successBtnStyles } from "@/app/commonStyles";
import { OptionItem } from "./OptionItem";
import { defaultStatuses } from "@/consts/default-options";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface Props {
  field: string;
  title?: string;
  description?: string;
  options: ICustomFieldData[];
}

export const CustomFieldOptions = ({ title, description }: Props) => {
  const [options, setOptions] = useState(defaultStatuses);
  const [activeOption, setActiveOption] = useState<ICustomFieldData | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "option") {
      setActiveOption(event.active.data.current?.option);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveOption(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setOptions((prevOptions) => {
        const activeIndex = prevOptions.findIndex(
          (option) => option.id === active.id
        );
        const overIndex = prevOptions.findIndex(
          (option) => option.id === over.id
        );

        const reorderedItems = arrayMove(prevOptions, activeIndex, overIndex);
        return reorderedItems.map((item, index) => ({
          ...item,
          order: index,
        }));
      });
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-lg py-3"> {title || "Options"} </h1>
          <Button className={cn(successBtnStyles)}>Create new Option</Button>
        </div>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {description}
          </p>
        )}

        <div className="border rounded-sm">
          <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <SortableContext
              items={options.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {options.map((status) => (
                <OptionItem key={status.id} item={status} />
              ))}
            </SortableContext>

            {isClient &&
              createPortal(
                <DragOverlay>
                  {activeOption && <OptionItem item={activeOption} />}
                </DragOverlay>,
                document.body
              )}
          </DndContext>
        </div>
      </div>
    </>
  );
};
