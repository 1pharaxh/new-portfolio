"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
export const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
interface SongData {
  name: string;
  artist: string;
  songUrl: string;
  artistUrl: string;
  isCurrentlyPlaying: boolean;
}

const SpotifyStreaming = () => {
  const [currentSong, setCurrentSong] = useState<SongData | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  useEffect(() => {
    const eventSource = new EventSource("/api/spotify");

    eventSource.onmessage = (event) => {
      try {
        const songData = JSON.parse(event.data);
        setCurrentSong({
          name: songData.songName,
          artist: songData.artistName,
          songUrl: songData.songUrl,
          artistUrl: songData.artistUrl,
          isCurrentlyPlaying: songData.isCurrentlyPlaying,
        });
        setIsPlaying(songData.isCurrentlyPlaying);
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      {!currentSong && (
        <div className="bg-border/40 relative rounded-md py-4 px-4 flex items-center mt-8 mb-4">
          <div className="text-muted-foreground text-xs flex gap-1">
            <LoadingSpinner className="size-4 " />
            Loading...
          </div>
        </div>
      )}

      {currentSong && (
        <div className="bg-border/40 relative rounded-md py-4 px-4 flex items-center mt-8 mb-4">
          <div
            className={`rounded-full 

        ${isPlaying ? "bg-green-400" : "bg-amber-400"}
        h-[8px] w-[8px] inline-block mr-2`}
          ></div>
          <div
            className={`absolute animate-ping rounded-full  ${
              isPlaying ? "bg-green-400" : "bg-amber-400"
            } h-[8px] w-[8px] mr-2`}
          ></div>
          <div className=" text-xs lowercase">
            <span className="text-muted-foreground">
              {isPlaying ? "Currently listening to" : "Was listening to"}{" "}
            </span>
            <Link
              className="hover:underline underline-offset-2 font-semibold"
              href={currentSong?.songUrl || "#"}
            >
              {currentSong?.name}
            </Link>
            <span className="text-muted-foreground"> by </span>{" "}
            <Link
              href={currentSong?.artistUrl || "#"}
              className="hover:underline underline-offset-2 font-semibold"
            >
              {currentSong?.artist}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SpotifyStreaming;
