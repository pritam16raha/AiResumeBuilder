"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[300px]",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="border border-gray-300 rounded-md p-2 shadow-md bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={toolbarBtn(editor.isActive("bold"))}
        >
          B
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={toolbarBtn(editor.isActive("italic"))}
        >
          I
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={toolbarBtn(editor.isActive("underline"))}
        >
          U
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={toolbarBtn(editor.isActive("strike"))}
        >
          S
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={toolbarBtn(editor.isActive("heading", { level: 1 }))}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={toolbarBtn(editor.isActive("heading", { level: 2 }))}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={toolbarBtn(editor.isActive("bulletList"))}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={toolbarBtn(editor.isActive("orderedList"))}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={toolbarBtn(editor.isActive("blockquote"))}
        >
          ❝ Quote
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={toolbarBtn(editor.isActive("codeBlock"))}
        >
          {"</>"}
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "left" }))}
        >
          ⬅️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "center" }))}
        >
          ⬅️➡️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={toolbarBtn(editor.isActive({ textAlign: "right" }))}
        >
          ➡️
        </button>
        <button
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
          className={toolbarBtn(false)}
        >
          🧹 Clear
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className={toolbarBtn(false)}
        >
          ↩️ Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className={toolbarBtn(false)}
        >
          ↪️ Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

// Highlight active toolbar buttons
function toolbarBtn(active: boolean) {
  return `px-2 py-1 text-sm border rounded ${
    active ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
  }`;
}
