"use client";

import { useState } from "react";
import NSButton from "@/components/ui/core/NSButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, X } from "lucide-react";
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

const AddNotesModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="[&>button:last-child]:hidden w-full">
        {/* Custom close button */}
        <div
          className="flex items-center justify-end hover:cursor-pointer transform transition duration-300 ease-in-out"
          onClick={() => setOpen(false)}
        >
          <div className="hover:text-red-500 rounded-full border hover:border-red-500 flex items-center justify-center p-1">
            <X className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-openSans font-semibold">Add Notes</h2>

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
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
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
          <EditorContent
            className=" border-slate-300 rounded-lg ring-0 ring-slate-300 focus:outline-none"
            editor={editor}
          />

          {/* Save Button */}
          <NSButton className="rounded-lg text-white flex items-center justify-center gap-2 py-3 mt-2 w-full">
            Submit <ArrowRight />
          </NSButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotesModal;
