"use client";
import {
  Dock,
  DockIcon,
  DockItemsRevealWrapper,
} from "@/components/magicui/dock";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import CtrlJCmd from "@/components/ctrl-j-cmd";
import { useTheme } from "next-themes";
import { DOCK_DATA } from "@/lib/constants";
import { Sun } from "lucide-react";

export default function BottomDock() {
  const { theme, setTheme } = useTheme();

  const handleScroll = (link: string) => {
    const section = document.querySelector(link);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <TooltipProvider>
      <Dock
        isHovered={isHovered}
        setIsHovered={setIsHovered}
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
        <DockItemsRevealWrapper
          width="var(--cmd-width)"
          extend
          isHovered={isHovered}
        >
          <CtrlJCmd />
        </DockItemsRevealWrapper>
        <DockItemsRevealWrapper isHovered={isHovered}>
          <Separator orientation="vertical" className="h-full w-[1.30px]" />
        </DockItemsRevealWrapper>
        {DOCK_DATA.map((item, index) => (
          <DockIcon key={index}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger onClick={() => handleScroll(item.link)} asChild>
                <item.Icon
                  className={` ${
                    isHovered ? "md:size-full" : "md:size-4 size-5"
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <DockItemsRevealWrapper isHovered={isHovered}>
          <Separator orientation="vertical" className="h-full" />
        </DockItemsRevealWrapper>
        <DockIcon>
          <Tooltip delayDuration={0}>
            <TooltipTrigger
              asChild
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun
                className={` ${
                  isHovered ? "md:size-full" : "md:size-4 size-5"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{theme === "dark" ? "Light Mode" : "Dark Mode"}</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </TooltipProvider>
  );
}
