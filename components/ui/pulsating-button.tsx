import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  pulseColor?: string;
  duration?: string;
}

export default function PulsatingButton({
  className,
  children,
  pulseColor = "#0096ff",
  duration = "1.5s",
  ...props
}: PulsatingButtonProps) {
  return (
    <span
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-full  text-white dark:text-black bg-blue-500 dark:bg-blue-500 p-0",
        className
      )}
      style={
        {
          "--pulse-color": pulseColor,
          "--duration": duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="relative z-10 ">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full bg-inherit animate-pulse rounded-full -translate-x-1/2 -translate-y-1/2" />
    </span>
  );
}
