"use client";
import { Dock, DockIcon } from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import CtrlJCmd from "@/components/ctrl-j-cmd";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MobileNav } from "./mobile-nav";
import { DOCK_DATA } from "@/lib/constants";

export default function BottomDock() {
  const { setTheme } = useTheme();

  return (
    <TooltipProvider>
      <Dock
        className="z-50 pointer-events-auto relative 
        mx-auto flex
        items-center bg-background 
        [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] 
        transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] 
        dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] "
        magnification={60}
        distance={100}
        direction="bottom"
      >
        <MobileNav />
        <CtrlJCmd />
        <Separator orientation="vertical" className="h-full w-[1.5px]" />
        {DOCK_DATA.map((item, index) => (
          <DockIcon
            key={index}
            className="bg-black/10 dark:bg-white/10 p-1 md:p-3"
          >
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <item.Icon className="md:size-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full" />
        <DockIcon className="bg-black/10 dark:bg-white/10 p-1 md:p-3">
          <div className="relative size-6 md:size-full">
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Moon
                  onClick={() => setTheme("dark")}
                  className="absolute inset-0 md:size-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Dark Mode</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Sun
                  onClick={() => setTheme("light")}
                  className="absolute inset-0 md:size-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Light Mode</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DockIcon>
      </Dock>
    </TooltipProvider>
  );
}
