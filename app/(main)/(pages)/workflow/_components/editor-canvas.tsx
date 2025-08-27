/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor } from "@/providers/editor-provider";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  NodeChange,
  ReactFlowInstance,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  BackgroundVariant,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import EditorCanvasCardSingle from "./editor-canvas-card-single";
import { toast } from "sonner";
import { v4 } from "uuid";
import { EditorCanvasCardType, EditorNodeType } from "@/lib/types";
import EditorCanvasSidebar from "./editor-canvas-sidebar";
import { EditorCanvasDefaultCardTypes } from "@/lib/constants";

const EditorCanvas = () => {
  const { dispatch, state } = useEditor();

  const nodes = state.editor.elements;
  const edges = state.editor.edges;
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updated = applyNodeChanges(
        changes,
        nodes
      ) as unknown as EditorNodeType[];
      dispatch({ type: "UPDATE_NODE", payload: { elements: updated } });
    },
    [nodes, dispatch]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      dispatch({
        type: "UPDATE_EDGE",
        payload: { edges: applyEdgeChanges(changes, edges) },
      }),
    [edges, dispatch]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      dispatch({
        type: "UPDATE_EDGE",
        payload: { edges: addEdge(params, edges) },
      }),
    [edges, dispatch]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/reactflow"
      );

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const triggerAlreadyExists = state.editor.elements.find(
        (node) => node.type === "Empty"
      );

      if (type === "Empty" && triggerAlreadyExists) {
        toast("Only one trigger can be added to automation at the moment");
        return;
      }

      if (!reactFlowInstance) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: EditorCanvasDefaultCardTypes[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
          color: `hsl(${Math.floor(Math.random() * 360)} 70% 70%)`,
        },
      };
      dispatch({
        type: "UPDATE_NODE",
        payload: {
          elements: [...nodes, newNode] as unknown as EditorNodeType[],
        },
      });
    },
    [reactFlowInstance, state, nodes, dispatch]
  );

  const handleClickCanvas = () => {
    dispatch({
      type: "SELECTED_ELEMENT",
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: "",
            metadata: {},
            title: "",
            type: "Empty",
          },
          id: "",
          position: { x: 0, y: 0 },
          type: "Empty",
        },
      },
    });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: { edges, elements: nodes } });
  }, [nodes, edges, dispatch]);

  const nodeTypes = useMemo(
    () => ({
      Email: EditorCanvasCardSingle,
      WhatsApp: EditorCanvasCardSingle,
      SMS: EditorCanvasCardSingle,
      Push: EditorCanvasCardSingle,
      Internal: EditorCanvasCardSingle,
      Attribute: EditorCanvasCardSingle,
      API: EditorCanvasCardSingle,
    }),
    []
  );

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex items-center justify-center">
        <div style={{ width: "100%", height: "100%" }} className="relative">
          {
            <ReactFlow
              className="w-full h-full"
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodes={state.editor.elements}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              onClick={handleClickCanvas}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                  width: 30,
                  height: 30,
                },
              }}
            >
              <Controls position="top-left" />
              {/* <MiniMap
                  position="bottom-left"
                  className="!bg-background"
                  zoomable
                  pannable
                /> */}
              <Background
                variant={BackgroundVariant.Dots}
                gap={14}
                size={1.5}
                className="bg-gray-50 dark:bg-black/40"
              />
            </ReactFlow>
          }
        </div>
      </div>
      <div className="w-80 border-l">
        <EditorCanvasSidebar />
      </div>
    </div>
  );
};

export default EditorCanvas;
