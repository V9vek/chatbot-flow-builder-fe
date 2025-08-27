"use client";
import { Edit2 } from "lucide-react";
import { toast } from "sonner";
import { useEditor } from "@/providers/editor-provider";

const WorkflowHeader = () => {
  const { state } = useEditor();

  const handlePublish = () => {
    // nodes with no outgoing edges
    const nodesWithNoOutgoing = state.editor.elements.filter((node) =>
      state.editor.edges.every((edge) => edge.source !== node.id)
    );

    if (nodesWithNoOutgoing.length > 1) {
      toast.error(
        "Multiple nodes have no outgoing connection. Please connect your flow before publishing."
      );
      return;
    }

    toast.success("Journey published successfully!");
  };

  return (
    <header className="flex items-center justify-between border-b bg-background px-6 py-3 text-sm">
      <div className="flex items-center gap-2 font-semibold">
        Abandoned_Cart_Journey
        <Edit2 size={14} className="text-muted-foreground cursor-pointer" />
      </div>

      <div className="flex gap-8">
        {/* middle: live status */}
        {/* <div className="flex items-center gap-1 text-green-600">
          <CheckCircle size={14} />
          Journey made live at 09:00 AM on 12 Feb 2023
        </div> */}

        {/* right: action */}
        {/* <button className="rounded-md border border-red-400 px-4 py-2 font-semibold text-red-500 hover:bg-red-50">
          Unpublish Journey
        </button> */}
        <button
          onClick={handlePublish}
          className="rounded-md border-2 border-green-500 cursor-pointer bg-green-100 px-4 py-[6px] font-semibold text-green-500"
        >
          Publish
        </button>
      </div>
    </header>
  );
};

export default WorkflowHeader;
