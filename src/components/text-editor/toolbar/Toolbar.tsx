import { Separator } from "@/components/ui/separator";
import { Editor } from "@tiptap/react";
import {
  AtSign,
  Bold,
  Brackets,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  ListIcon,
  ListOrdered,
  Underline,
} from "lucide-react";
import { ToolbarIconButton } from "./ToolbarIconButton";
import { HeadingMenu } from "./HeadingMenu";
import { AlignMenu } from "./AlignMenu";

export const Toolbar = ({ editor }: { editor: Editor | null }) => {
  const handleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const handleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const handleBulletList = () => {
    editor?.chain().focus().toggleBulletList().run();
  };

  const handleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  const handleCode = () => {
    editor?.chain().focus().toggleCode().run();
  };

  const handleOrderedList = () => {
    editor?.chain().focus().toggleOrderedList().run();
  };

  const handleCodeBlock = () => {
    editor?.chain().focus().toggleCodeBlock().run();
  };

  const handleAtSign = () => {
    editor?.commands.insertContent("@");
  };

  return (
    <div className="flex items-center space-x-3  px-4">
      <ToolbarIconButton
        isActive={editor?.isActive("bold") ?? false}
        onClick={handleBold}
        size="icon"
      >
        <Bold />
      </ToolbarIconButton>
      <ToolbarIconButton
        isActive={editor?.isActive("italic") ?? false}
        onClick={handleItalic}
        size="icon"
      >
        <Italic />
      </ToolbarIconButton>
      <ToolbarIconButton
        isActive={editor?.isActive("underline") ?? false}
        onClick={handleUnderline}
        size="icon"
      >
        <Underline />
      </ToolbarIconButton>
      <ToolbarIconButton
        isActive={editor?.isActive("bulletList") ?? false}
        onClick={handleBulletList}
        size="icon"
      >
        <ListIcon />
      </ToolbarIconButton>
      <ToolbarIconButton
        isActive={editor?.isActive("orderedList") ?? false}
        onClick={handleOrderedList}
        size="icon"
      >
        <ListOrdered />
      </ToolbarIconButton>

      <Separator orientation="vertical" className="h-7" />

      <ToolbarIconButton
        isActive={editor?.isActive("code") ?? false}
        onClick={handleCode}
        size="icon"
      >
        <Code />
      </ToolbarIconButton>
      <ToolbarIconButton
        isActive={editor?.isActive("codeBlock") ?? false}
        onClick={handleCodeBlock}
        title="Code Block"
        size="icon"
      >
        <Brackets />
      </ToolbarIconButton>
      <ToolbarIconButton
        onClick={handleAtSign}
        isActive={false}
        title="@ Mentions"
      >
        <AtSign className="w-4 h-4" />
      </ToolbarIconButton>
      <Separator orientation="vertical" className="h-7" />
      <HeadingMenu editor={editor} />

      <Separator orientation="vertical" className="h-7" />
      <AlignMenu editor={editor} />
      <Separator orientation="vertical" className="h-7" />
    </div>
  );
};
