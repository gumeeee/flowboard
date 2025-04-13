import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import {
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
} from "lucide-react";

export const HeadingMenu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const handleHeading1 = () => {
    editor?.chain().focus().toggleHeading({ level: 1 }).run();
  };

  const handleHeading2 = () => {
    editor?.chain().focus().toggleHeading({ level: 2 }).run();
  };

  const handleHeading3 = () => {
    editor?.chain().focus().toggleHeading({ level: 3 }).run();
  };

  const handleHeading4 = () => {
    editor?.chain().focus().toggleHeading({ level: 4 }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="p-1 rounded-sm flex items-center gap-0
       hover:bg-blue-100 dark:hover:bg-purple-800 transition-all duration-700 ease-in-out transform hover:scale-110
        text-gray-600 dark:text-gray-400"
      >
        <Heading className="w-4 h-4" />
        <ChevronDown className="w-4 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={handleHeading1}
          className={cn(
            editor.isActive("heading", { level: 1 })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <Heading1 className="w-8 h-8 mx-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleHeading2}
          className={cn(
            `my-2`,
            editor.isActive("heading", { level: 2 })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <Heading2 className="w-8 h-8 mx-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleHeading3}
          className={cn(
            `mb-2`,
            editor.isActive("heading", { level: 3 })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <Heading3 className="w-8 h-8 mx-auto" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleHeading4}
          className={cn(
            editor.isActive("heading", { level: 4 })
              ? "bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800"
              : "bg-transparent"
          )}
        >
          <Heading4 className="w-8 h-8 mx-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
