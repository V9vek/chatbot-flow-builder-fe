import { ContainerScroll } from "@/components/global/container-scroll-animation";
import Navbar from "@/components/global/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background gradient div */}
      <div className="fixed inset-0 w-full h-full [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] z-0" />

      {/* Content container */}
      <div className="relative z-10">
        <Navbar />
        <section className="min-h-screen w-full flex flex-col items-center antialiased">
          <div className="flex flex-col mt-[-100px]">
            <ContainerScroll
              titleComponent={
                <div className="flex items-center flex-col">
                  <Link href={"/workflow"}>
                    <Button className="p-8 mb-8 md:mb-4 text-xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-300 cursor-pointer">
                      <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                        Start For Free Today
                      </span>
                    </Button>
                  </Link>
                  <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                    Automate Your Work With BiteSpeed
                  </h1>
                </div>
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
