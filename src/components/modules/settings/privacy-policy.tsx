"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ListOrdered,
  List,
  Heading1,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import NSButton from "@/components/ui/core/NSButton";

const PrivacyPolicyEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Image,
      Heading,
    ],
    content: "<p>Start writing your privacy policy...</p>",
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] rounded-md border border-gray-300 px-4 py-3 focus:outline-none prose focus-visible:ring-1 focus-visible:ring-blue-500",
      },
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Privacy Policy Editor</h2>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-white">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={16} />
        </Button>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />

      {/* Save Button */}
      <NSButton className="mt-4 bg-green-700 text-white hover:bg-green-800 rounded-lg py-3">
        Save Changes
      </NSButton>
    </div>
  );
};

export default PrivacyPolicyEditor;
