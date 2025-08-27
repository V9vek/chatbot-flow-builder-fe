import { MenuIcon } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-4 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <nav className="text-white font-semibold">BiteSpeed</nav>
      <aside className="flex items-center gap-4 text-white">
        <MenuIcon />
      </aside>
    </header>
  );
}
