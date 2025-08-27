"use client";
import React from "react";
import {
  BellRing,
  Mail,
  MessageCircleCode,
  MessageSquareMore,
  Smartphone,
  TerminalSquare,
  UserRoundCog,
  Zap,
} from "lucide-react";
import { EditorCanvasTypes } from "@/lib/types";

type Props = { type: EditorCanvasTypes };

const EditorCanvasIconHelper = ({ type }: Props) => {
  switch (type) {
    case "Email":
      return <Mail className="flex-shrink-0" size={30} />;
    case "WhatsApp":
      return <MessageCircleCode className="flex-shrink-0" size={30} />;
    case "SMS":
      return <MessageSquareMore className="flex-shrink-0" size={30} />;
    case "Push":
      return <Smartphone className="flex-shrink-0" size={30} />;
    case "Internal":
      return <BellRing className="flex-shrink-0" size={30} />;
    case "Attribute":
      return <UserRoundCog className="flex-shrink-0" size={30} />;
    case "API":
      return <TerminalSquare className="flex-shrink-0" size={30} />;
    default:
      return <Zap className="flex-shrink-0" size={30} />;
  }
};

export default EditorCanvasIconHelper;
