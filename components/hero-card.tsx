export const dynamic = 'force-dynamic';

import React, { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { getCurrentlyPlaying, getLastPlayedTrack } from "@/lib/actions";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, GlobeIcon } from "lucide-react";
import BlurFade from "./magicui/blur-fade";
const BLUR_FADE_DELAY = 0.04;

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

const SpotifyTab = async () => {
  const [statusCurrentlyPlaying, currentlyPlaying] =
    await getCurrentlyPlaying();

  const [, lastPlaying] = await getLastPlayedTrack();

  let songPlayedUrl, artistPlayedUrl, songPlayedName, artistPlayedName;
  if (statusCurrentlyPlaying === 200 || statusCurrentlyPlaying === 204) {
    songPlayedUrl = currentlyPlaying.external_urls.spotify;
    artistPlayedUrl = currentlyPlaying.artists[0].external_urls.spotify;
    songPlayedName = currentlyPlaying.name;
    artistPlayedName = currentlyPlaying.artists[0].name;
  } else {
    songPlayedUrl = lastPlaying.track.external_urls.spotify;
    artistPlayedUrl = lastPlaying.track.artists[0].external_urls.spotify;
    songPlayedName = lastPlaying.track.name;
    artistPlayedName = lastPlaying.track.artists[0].name;
  }

  return (
    <div className="bg-border/40 relative rounded-md py-4 px-4 flex items-center mt-8 mb-4">
      <div
        className={`rounded-full 

          ${
            statusCurrentlyPlaying === 200 || statusCurrentlyPlaying === 204
              ? "bg-green-400"
              : "bg-amber-400"
          }
          h-[8px] w-[8px] inline-block mr-2`}
      ></div>
      <div
        className={`absolute animate-ping rounded-full  ${
          statusCurrentlyPlaying === 200 || statusCurrentlyPlaying === 204
            ? "bg-green-400"
            : "bg-amber-400"
        } h-[8px] w-[8px] mr-2`}
      ></div>
      <div className=" text-xs lowercase">
        <span className="text-muted-foreground">
          {statusCurrentlyPlaying === 200 || statusCurrentlyPlaying === 204
            ? "Currently listening to"
            : "Was listening to"}{" "}
        </span>
        <Link
          className="hover:underline underline-offset-2 font-semibold"
          href={songPlayedUrl}
        >
          {songPlayedName}
        </Link>
        <span className="text-muted-foreground"> by </span>{" "}
        <Link
          href={artistPlayedUrl}
          className="hover:underline underline-offset-2 font-semibold"
        >
          {artistPlayedName}
        </Link>
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
        <div className="space-y-2">
          <h1 className="font-medium text-sm lowercase">
            Akarshan is a full-stack web developer currently in{" "}
            <GlobeIcon className="size-4 inline-block" /> Markham, Canada
          </h1>

          <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
            <BlurFade delay={BLUR_FADE_DELAY * 10}>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="resume.pdf" // Added download attribute
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <FileIcon className="size-4" />
              </Link>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 15}>
              <Link
                href="https://twitter.com/pharaxh0"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                >
                  <title>X</title>
                  <path
                    fill="currentColor"
                    d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                  ></path>
                </svg>
              </Link>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 20}>
              <Link
                href="https://www.linkedin.com/in/akarsm/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                >
                  <title>LinkedIn</title>
                  <path
                    fill="currentColor"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  ></path>
                </svg>
              </Link>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 25}>
              <Link
                href="https://github.com/1pharaxh"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon" })
                )}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                >
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  ></path>
                </svg>
              </Link>
            </BlurFade>
          </div>
        </div>
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
        <Suspense
          fallback={
            <div className="text-muted-foreground text-xs flex gap-1">
              <LoadingSpinner className="size-4 " />
              Loading...
            </div>
          }
        >
          <SpotifyTab />
        </Suspense>
      </div>
    </div>
  );
};

export default HeroCard;
