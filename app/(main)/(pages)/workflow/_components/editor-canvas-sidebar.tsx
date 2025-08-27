"use client";
import { EditorCanvasTypes } from "@/lib/types";
import { useEditor } from "@/providers/editor-provider";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onDragStart } from "@/lib/editor-utils";
import {
  Mail,
  Smartphone,
  TerminalSquare,
  ArrowLeft,
  MessageCircleCode,
  MessageSquareMore,
  BellRing,
  UserRoundCog,
} from "lucide-react";

type Mode = "actions" | "settings";

const ACTION_ITEMS: {
  key: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
}[] = [
  { key: "Email", label: "Send Email", icon: <Mail size={24} /> },
  {
    key: "WhatsApp",
    label: "Send WhatsApp",
    icon: <MessageCircleCode size={24} />,
  },
  { key: "SMS", label: "Send SMS", icon: <MessageSquareMore size={24} /> },
  { key: "Push", label: "Send Push", icon: <Smartphone size={24} /> },
  {
    key: "Internal",
    label: "Send Internal Notification",
    icon: <BellRing size={24} />,
    disabled: true,
  },
  {
    key: "Attribute",
    label: "Set User Attribute",
    icon: <UserRoundCog size={24} />,
    disabled: true,
  },
  { key: "API", label: "Call API", icon: <TerminalSquare size={24} /> },
];

const EditorCanvasSidebar = () => {
  const { state, dispatch } = useEditor();

  const [mode, setMode] = useState<Mode>("actions");

  // switch to settings when node selected
  React.useEffect(() => {
    if (state.editor.selectedNode.id) {
      setMode("settings");
    } else {
      setMode("actions");
    }
  }, [state.editor.selectedNode.id]);

  const handleLabelChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newDesc = e.target.value;

    const updatedElements = state.editor.elements.map((el) =>
      el.id === state.editor.selectedNode.id
        ? { ...el, data: { ...el.data, description: newDesc } }
        : el
    );
    dispatch({ type: "UPDATE_NODE", payload: { elements: updatedElements } });
  };

  return (
    <div className="w-80 h-screen overflow-y-auto border-l bg-background p-4 dark:bg-black dark:border-neutral-700">
      <AnimatePresence mode="wait">
        {mode === "actions" && (
          <motion.div
            key="actions"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="mb-4 text-sm text-gray-600 dark:text-muted-foreground font-bold uppercase tracking-wide">
              Actions
            </h2>
            <motion.div
              className="grid grid-cols-[repeat(auto-fill,minmax(7rem,1fr))] gap-4"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05 } },
              }}
              initial="hidden"
              animate="show"
            >
              {ACTION_ITEMS.map((item) => (
                <motion.div
                  key={item.key}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 10 },
                    show: { opacity: 1, scale: 1, y: 0 },
                  }}
                  draggable={!item.disabled}
                  onDragStart={(e) =>
                    !item.disabled &&
                    onDragStart(e, item.key as EditorCanvasTypes)
                  }
                  className={`flex h-24 w-full select-none flex-col items-center justify-center gap-2 rounded-md text-center text-sm font-medium ${
                    item.disabled
                      ? "cursor-not-allowed bg-muted text-muted-foreground"
                      : "cursor-grab bg-[#ff7849]/10 text-[#ff7849]"
                  }`}
                >
                  {item.icon}
                  <span className="leading-tight font-semibold text-gray-700 dark:text-muted-foreground">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {mode === "settings" && (
          <motion.div
            key="settings"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <button
                onClick={() => {
                  setMode("actions");
                  // clear selected node
                  dispatch({
                    type: "SELECTED_ELEMENT",
                    payload: {
                      element: {
                        id: "",
                        type: "Empty",
                        position: { x: 0, y: 0 },
                        data: {
                          title: "",
                          description: "",
                          completed: false,
                          current: false,
                          metadata: {},
                          type: "Empty",
                        },
                      },
                    },
                  });
                }}
                className="rounded-md p-2 hover:bg-muted"
              >
                <ArrowLeft size={16} />
              </button>
              <h2 className="text-sm font-semibold text-muted-foreground">
                {state.editor.selectedNode.data.title}
              </h2>
            </div>
            <textarea
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-ring"
              rows={3}
              value={state.editor.selectedNode.data.description}
              onChange={handleLabelChange}
              placeholder="Enter description..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditorCanvasSidebar;
