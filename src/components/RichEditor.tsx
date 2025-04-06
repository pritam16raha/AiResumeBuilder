// components/RichEditor.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useEffect } from "react";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export default function RichEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Highlight,
      TextStyle,
      Color,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      BulletList,
      OrderedList,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] border border-gray-300 rounded-md p-4 focus:outline-none prose max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border rounded-t-md px-2 py-1 bg-gray-100">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
          Highlight
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().setColor("#e11d48").run()}
        >
          Red
        </button>
        <button onClick={() => editor.chain().focus().unsetColor().run()}>
          Reset
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Table
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
