import { useEditor } from "@/providers/editor-provider";
import React, { useMemo } from "react";
import { Position, useNodeId } from "reactflow";
import CustomHandle from "./custom-handle";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import EditorCanvasIconHelper from "./editor-canvas-card-icon-helper";
import { EditorCanvasCardType } from "@/lib/types";
import { Copy, Trash2 } from "lucide-react";

const EditorCanvasCardSingle = ({ data }: { data: EditorCanvasCardType }) => {
  const { dispatch, state } = useEditor();
  const nodeId = useNodeId();
  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type={data.type} />;
  }, [data]);
  const color = data.color ?? "#999";

  return (
    <>
      {data.type !== "Empty" && (
        <CustomHandle
          type="target"
          position={Position.Top}
          style={{ zIndex: 100 }}
        />
      )}
      <Card
        onClick={(e) => {
          e.stopPropagation();
          const val = state.editor.elements.find((n) => n.id === nodeId);
          if (val)
            dispatch({
              type: "SELECTED_ELEMENT",
              payload: {
                element: val,
              },
            });
        }}
        className="relative min-w-[280px] max-w-[400px] items-center gap-4 rounded-md border bg-background p-4 shadow-sm dark:bg-neutral-900/90"
      >
        {/* Icon column */}
        <div
          className="absolute -top-5 left-4 rounded-lg border-2 p-2"
          style={{
            borderColor: color,
            backgroundColor: color.startsWith("hsl")
              ? color.replace(")", " / 0.5)")
              : `${color}33`,
          }}
        >
          {logo}
        </div>
        <div className="flex items-center gap-2 text-gray-400 absolute top-3 right-3">
          <Copy className="w-4 h-4" />
          <Trash2 className="w-4 h-4" />
        </div>
        <div className="flex flex-col gap-1 pt-6">
          <CardTitle
            className="text-base font-semibold leading-5"
            style={{ color: color }}
          >
            {data.title}
          </CardTitle>
          <CardDescription className="space-y-1 text-xs font-semibold text-gray-500">
            <p className="text-sm leading-snug break-all whitespace-normal">
              {data.description}
            </p>
          </CardDescription>
        </div>
      </Card>
      <CustomHandle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default EditorCanvasCardSingle;
