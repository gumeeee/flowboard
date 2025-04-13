import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
} from "lucide-react";

export const AlignMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const handleAlignLeft = () => {
    editor?.chain().focus().setTextAlign("left").run();
  };

  const handleAlignCenter = () => {
    editor?.chain().focus().setTextAlign("center").run();
  };

  const handleAlignRight = () => {
    editor?.chain().focus().setTextAlign("right").run();
  };

  const handleAlignJustify = () => {
    editor?.chain().focus().setTextAlign("justify").run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1 rounded-sm flex items-center gap-0
       hover:bg-blue-100 dark:hover:bg-purple-800 transition-all duration-700 ease-in-out transform hover:scale-110
        text-gray-600 dark:text-gray-400"
      >
        <AlignJustify className="w-4 h-4" />
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={handleAlignLeft}
          className={cn(
            editor.isActive({ textAlign: "left" })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <AlignLeft className="w-8 h-8 mx-auto" />
          <span className="text-xs">Align left</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAlignCenter}
          className={cn(
            `my-2`,
            editor.isActive({ textAlign: "center" })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <AlignCenter className="w-8 h-8 mx-auto" />
          <span className="text-xs">Align center</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAlignRight}
          className={cn(
            `mb-2`,
            editor.isActive({ textAlign: "right" })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <AlignRight className="w-8 h-8 mx-auto" />
          <span className="text-xs">Align right</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleAlignJustify}
          className={cn(
            editor.isActive({ textAlign: "justify" })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <AlignJustify className="w-8 h-8 mx-auto" />
          <span className="text-xs">Align Justify</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
