"use client";
import { User, Home } from "lucide-react";
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
import { useRouter } from "next/navigation";

const CtrlJCmd = () => {
  const [open, setOpen] = useCtrlKey({ keyCombination: "j" });
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
    setOpen(false);
  };

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => {
          setOpen(true);
        }}
        className="w-20 md:w-32 h-10 rounded-lg bg-black/10 dark:bg-white/10 justify-center flex items-center p-0 md:p-3"
      >
        <p className="text-sm text-muted-foreground">
          Search...{" "}
          <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>{" "}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={handleHomeClick}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
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
