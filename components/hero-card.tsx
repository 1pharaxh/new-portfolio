"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

// Mock data for the current playing song
const currentSong = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  coverUrl: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  isPlaying: true,
};
import Link from "next/link";
import { Badge } from "./ui/badge";
const HeroCard = () => {
  return (
    <div className="mt-4">
      <div className="flex">
        <Avatar className="size-20 border">
          <AvatarImage alt="Akarshan" src="/images/akarshan.jpg" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
      </div>

      <div className="mt-6 space-y-4">
        <h1 className="font-medium text-sm lowercase">
          Akarshan is a full-stack web developer from Edmonton, Canada
        </h1>
        <p className="text-muted-foreground text-sm lowercase">
          Currently working at IBM and studying Computer Science at the
          University of Alberta. My goal is to create meaningful and impactful
          software solutions.
        </p>

        <p className="text-muted-foreground text-sm lowercase">
          I also write technical blogs sharing insights from my projects. Check
          them out{" "}
          <Link className="underline underline-offset-2" href="/blogs">
            here
          </Link>
          .
        </p>

        <div className="bg-border/40 relative rounded-md py-4 px-4 flex items-center mt-8 mb-4">
          <div className="rounded-full bg-green-400 h-[8px] w-[8px] inline-block mr-2"></div>
          <div className="absolute animate-ping rounded-full bg-green-400 h-[8px] w-[8px] mr-2"></div>
          <div className="text-muted-foreground text-xs lowercase">
            Currently listening to XYZ by XYZ on {currentSong.isPlaying}
            <Badge
              className="inline-flex items-center border rounded-full"
              variant="outline"
            >
              Spotify
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
