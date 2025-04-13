import { Ellipsis, GripVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export const OptionItem = () => {
  return (
    <div className="border bg-white dark::bg-slate-950 h-[60px]">
      <div className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-cente">
          <span>
            <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-600 cursor-grabbing" />
          </span>
          {/* <CustomFieldTagRenderer /> */}

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
