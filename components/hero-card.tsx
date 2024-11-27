// app/HeroCard.tsx
import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { getLastPlayedTrack } from "@/lib/actions";

const SpotifyTab = async () => {
  const spotifyData = await getLastPlayedTrack();
  return (
    <div className="bg-border/40 relative rounded-md py-4 px-4 flex items-center mt-8 mb-4">
      <div className="rounded-full bg-green-400 h-[8px] w-[8px] inline-block mr-2"></div>
      <div className="absolute animate-ping rounded-full bg-green-400 h-[8px] w-[8px] mr-2"></div>
      <div className=" text-xs lowercase">
        <span className="text-muted-foreground">Currently listening to </span>
        <Link
          className="hover:underline underline-offset-2 font-semibold"
          href={spotifyData.track.external_urls.spotify}
        >
          {spotifyData.track.name}
        </Link>
        <span className="text-muted-foreground"> by </span>{" "}
        <Link
          href={spotifyData.track.artists[0].external_urls.spotify}
          className="hover:underline underline-offset-2 font-semibold"
        >
          {spotifyData.track.artists[0].name}
        </Link>
        <span className="text-muted-foreground"> on </span>{" "}
        <Badge
          className="inline-flex items-center border rounded-full"
          variant="outline"
        >
          Spotify
        </Badge>
      </div>
    </div>
  );
};

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
        <Suspense fallback={<div>Loading...</div>}>
          <SpotifyTab />
        </Suspense>
      </div>
    </div>
  );
};

export default HeroCard;
