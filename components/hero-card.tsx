"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import PulsatingButton from "./ui/pulsating-button";

// Mock data for the current playing song
const currentSong = {
  title: "Blinding Lights",
  artist: "The Weeknd",
  album: "After Hours",
  coverUrl: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
  isPlaying: true,
};
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Play, Volume2 } from "lucide-react";
const HeroCard = () => {
  return (
    <div
      className={`flex flex-col overflow-hidden border transition-all duration-300 ease-out h-full p-3
        group relative  size-full rounded-xl bg-card dark:bg-neutral-900 text-black dark:text-white
        `}
    >
      <div className="space-y-12">
        <div className="flex flex-col items-center justify-center space-y-2 text-center sm:flex-row sm:space-y-0 sm:space-x-6">
          <HoverCard openDelay={0.04}>
            <HoverCardTrigger>
              <PulsatingButton pulseColor="#22c55e" duration="3s">
                <Avatar className="size-28 border">
                  <AvatarImage alt="Akarshan" src="/images/akarshan.jpg" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <HoverCardContent className="w-80 p-0 bg-zinc-950 border-zinc-800">
                  <div className="flex items-center space-x-4 p-4">
                    <img
                      src={currentSong.coverUrl}
                      alt={`${currentSong.album} cover`}
                      className="w-16 h-16 rounded-md"
                    />
                    <div className="space-y-1 flex-1">
                      <h4 className="text-sm font-semibold text-zinc-100">
                        {currentSong.title}
                      </h4>
                      <p className="text-sm text-zinc-400">
                        {currentSong.artist}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {currentSong.album}
                      </p>
                    </div>
                    <button className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors">
                      <Play size={16} className="text-black" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900">
                    <div className="flex items-center space-x-2">
                      <Volume2 size={16} className="text-zinc-400" />
                      <div className="bg-zinc-600 h-1 w-24 rounded-full">
                        <div className="bg-green-500 h-1 w-16 rounded-full" />
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">0:58 / 3:20</p>
                  </div>
                </HoverCardContent>
              </PulsatingButton>
            </HoverCardTrigger>
          </HoverCard>

          <div className="flex flex-col items-center sm:items-start sm:text-left space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Hi, I&apos;m Akarshan 👋
            </h2>
            <p className="text-muted-foreground text-base font-normal">
              Currently working at IBM and studying Computer Science at the
              University of Alberta. My goal is to create meaningful and
              impactful software solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
