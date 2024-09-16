"use client";
import { useTheme } from "next-themes";
import React from "react";
import { MagicCard } from "./magicui/magic-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const HeroCard = () => {
  const { theme } = useTheme();

  return (
    <MagicCard
      gradientColor={theme === "dark" ? "#262626" : "#d4d4d8"}
      gradientSize={300}
      className={
        "flex flex-col overflow-hidden border transition-all duration-300 ease-out h-full p-3"
      }
    >
      <div className="space-y-12">
        <div className="flex flex-col items-center justify-center space-y-2 text-center sm:flex-row sm:space-y-0 sm:space-x-6">
          <Avatar className="size-28 border">
            <AvatarImage alt="Akarshan" src="/images/akarshan.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center sm:items-start sm:text-left space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Hi, I&apos;m Akarshan 👋
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Currently working at IBM and studying Computer Science at the
              University of Alberta. My goal is to create meaningful and
              impactful software solutions.
            </p>
          </div>
        </div>
      </div>
    </MagicCard>
  );
};

export default HeroCard;
