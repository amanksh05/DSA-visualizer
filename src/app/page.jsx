"use client"
import Collapsible from "@/components/Collapsible";
import { Button, buttonVariants } from "@/components/ui/button";
import { FaCaretRight } from "react-icons/fa";

import CanvasBackground from "@/components/CanvasBackground";
import Link from "next/link";
export default function Home() {
  return (
    <>
      {/* <CanvasBackground /> */}
      <div className="flex flex-col items-center justify-center text-center gap-6 p-8 w-full">

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold font-serif">Welcome to <span className="text-orange-400"> DSA Visualizer </span></h1>
          <p className="text-xl font-medium max-w-2xl">
            Explore a variety of algorithms and data structures through interactive visualizations.
            This platform allows you to visualize algorithms such as pathfinding, sorting, and more,
            making it easier to understand complex concepts in computer science.
          </p>
        </div>
        <div className="flex gap-4 mt-2">
          {/* <button className="px-2 py-3 w-48 transition-all bg-zinc-900 text-xl text-white rounded-md hover:bg-zinc-700 flex items-center justify-center ">
          About us
        </button> */}
          <Link href="/about" className={buttonVariants({variant:"outline", className:"transition-colors hover:bg-zinc-900"})}>About us</Link>
          <Link href="/Dijkstra" className={buttonVariants({variant:"secondary", className:"transition-all bg-white text-black font-semibold hover:bg-slate-200"})}>Projects</Link>
          {/* <Button variant="outline" ></Button> */}
          {/* <Button className="bg-white text-black font-semibold" ></Button> */}
        </div>
      </div>
    </>
  );
}
{/* <div className="flex flex-col w-full items-center">
  Visulizaztion
  <Collapsible title="Dijkstra" subs="Hello" />
</div> */}
