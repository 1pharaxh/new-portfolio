"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description: string[];
  dates: string;
  position: string;
  image?: string;
  techStack?: string[];
}

export function WorkCard({
  title,
  description,
  dates,
  position,
  image,
  techStack,
}: Props) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center bg-white rounded-full">
        <Avatar className="border size-12 m-auto">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div
        className="flex flex-1 flex-col justify-start gap-1 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between items-center">
          <div>
            {dates && (
              <time className="text-xs text-muted-foreground">{dates}</time>
            )}
            <h2 className="font-semibold leading-none">{title}</h2>
            {position && <p className="text-sm font-medium">{position}</p>}
          </div>
          <ChevronRightIcon
            className={cn(
              "size-4 transform transition-transform duration-300 ease-out",
              isExpanded ? "rotate-90" : "rotate-0"
            )}
          />
        </div>
        {description && description.length > 0 && (
          <div className="prose dark:prose-invert text-sm text-muted-foreground">
            {description.map(
              (desc, idx) =>
                desc && (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      height: 0,
                      marginBottom: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      opacity: isExpanded ? 1 : 0,
                      height: isExpanded ? "auto" : 0,
                      marginBottom: isExpanded ? 8 : 0,
                      marginTop: isExpanded ? 8 : 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginBottom: 0,
                      marginTop: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className=" text-xs sm:text-sm my-2"
                  >
                    {desc}
                  </motion.div>
                )
            )}
          </div>
        )}
      </div>
      {techStack && techStack.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {techStack.map((name, idx) => (
            <Badge key={idx} variant="outline" className="text-[10px]">
              {name}
            </Badge>
          ))}
        </div>
      )}
    </li>
  );
}
