import React, { CSSProperties } from "react";
import { Handle, HandleProps } from "reactflow";
import { useEditor } from "@/providers/editor-provider";

type Props = HandleProps & { style?: CSSProperties };

const CustomHandle = (props: Props) => {
  const { state } = useEditor();

  const isSource = props.type === "source";

  return (
    <Handle
      {...props}
      isValidConnection={(conn) => {
        if (isSource) {
          const outgoing = state.editor.edges.filter(
            (edge): boolean => edge.source === conn.source
          ).length;
          // allow only one outgoing edge per source (except Empty nodes)
          const sourceNode = state.editor.elements.find((n): boolean | undefined => n.id === conn.source);
          if (sourceNode?.type === "Empty") return true;
          return outgoing === 0;
        }
        // target handles: unlimited incoming edges
        return true;
      }}
      className={`${isSource ? "!bg-emerald-500" : "!bg-blue-500"} !h-3 !w-3 border-2 border-white dark:border-neutral-900`}
      style={{ zIndex: 10, borderRadius: "9999px", ...(props.style || {}) }}
    />
  );
};

export default CustomHandle;
