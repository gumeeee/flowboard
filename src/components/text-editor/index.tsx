"use client";

import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import Mention from "@tiptap/extension-mention";
import OrderedList from "@tiptap/extension-ordered-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./toolbar/Toolbar";
import { useEffect } from "react";

interface Props {
  isEditable: boolean;
  content: string;
  onChange?: (content: string) => void;
  resetKey?: number;
}

export const TextEditor = ({
  isEditable = true,
  content,
  resetKey = 0,
  onChange,
}: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
      OrderedList.configure({ HTMLAttributes: { class: "pl-8" } }),
      Mention,
      ListItem,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      CodeBlock.configure({
        HTMLAttributes: {
          class:
            "bg-gray-100 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 my-2",
        },
      }),
      Code.configure({
        HTMLAttributes: {
          class:
            "bg-gray-100 dark:bg-gray-900 rounded-sm p-1 border border-gray-200 dark:border-gray-800 my-2",
        },
      }),
      BulletList.configure({ HTMLAttributes: { class: "pl-8" } }),
    ],
    content,
    editable: isEditable,
    editorProps: {
      attributes: {
        class: `prose prose-sm sm:prose-lg xl:prose-xl px-2 pb-2 pt-3 border ${
          isEditable ? "border-t-0" : "border-0"
        } border-gray-200 dark:border-gray-800 rounded-b-sm ${
          isEditable ? "min-h-[180px]" : ""
        } w-full focus:ring-0 focus:outline-none text-sm`,
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && resetKey) {
      editor.commands.setContent("");
    }
  });

  useEffect(() => {
    if (isEditable) {
      editor?.setEditable(true);
    }
  }, [isEditable]);

  return (
    <div className="w-full">
      {isEditable && (
        <div
          className="bg-gradient-to-r from-sky-100 to-blue-100
      dark:bg-gradient-to-r dark:from-indigo-950 dark:to-violet-950 py-4 overflow-x-auto border rounded-t-sm"
        >
          <Toolbar editor={editor} />
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};
