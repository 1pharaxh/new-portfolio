"use client";
import { User, Home, FileIcon } from "lucide-react";
import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useCtrlKey } from "@/hooks/UseCtrlKey";
import { Button } from "./ui/button";
import Link from "next/link";

const CtrlJCmd = () => {
  const [open, setOpen] = useCtrlKey({ keyCombination: "k" });

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => {
          setOpen(true);
        }}
        className="w-full overflow-hidden h-10 rounded-lg bg-black/10 dark:bg-white/10 justify-center flex items-center p-0 md:p-3"
      >
        <p className="text-sm text-muted-foreground">
          Search...{" "}
          <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </p>{" "}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Link href="/" className={"flex items-center"}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </CommandItem>

            <CommandItem>
              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="resume.pdf" // Added download attribute
                className={"flex items-center w-full"}
              >
                <FileIcon className="mr-2 h-4 w-4" />
                Resume
              </Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Blogs">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Blogs coming soon</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CtrlJCmd;
