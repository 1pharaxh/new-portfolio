"use client";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Building2, Laptop } from "lucide-react";
import { PersonIcon } from "@radix-ui/react-icons";
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
import { SidePanel } from "./side-panel";

export default function BottomDock() {
  const { setTheme } = useTheme();
  return (
    <>
      <TooltipProvider>
        <Dock magnification={60} distance={100} direction="bottom">
          <SidePanel />
          <CtrlJCmd />
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <PersonIcon className="size-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>About me</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Building2 className="size-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Work Experience</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <Laptop className="size-full" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Projects</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon className="bg-black/10 dark:bg-white/10 p-3">
            <div className="relative size-full">
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Moon
                    onClick={() => setTheme("dark")}
                    className="absolute inset-0 size-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
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
                    className="absolute inset-0 size-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
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
    </>
  );
}
