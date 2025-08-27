import EditorProvider from "@/providers/editor-provider";
import React from "react";
import EditorCanvas from "./_components/editor-canvas";
import WorkflowHeader from "./_components/header";

const page = () => {
  return (
    <div className="h-full">
      <EditorProvider>
        <WorkflowHeader />
        <EditorCanvas />
      </EditorProvider>
    </div>
  );
};

export default page;
