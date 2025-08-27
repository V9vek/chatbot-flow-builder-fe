import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="flex overflow-hidden h-screen">
      <div className="w-full">{children}</div>
    </div>
  );
}
