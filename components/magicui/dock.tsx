"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
  isHovered: boolean;
  setIsHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max mt-8 h-[58px] p-2 flex rounded-2xl border supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md"
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      isHovered,
      setIsHovered,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity);

    const containerVariants = {
      initial: {
        height: "40px",
        scale: 0.9,
        gap: "0px",
      },
      hover: {
        height: "58px",
        scale: 1,
        gap: "8px",
        alignItems:
          direction === "top"
            ? "flex-start"
            : direction === "middle"
            ? "center"
            : "flex-end",
      },
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 150,
        damping: 12,
      },
      exit: {
        height: "40px",
        scale: 0.9,
        gap: "0px",
        transition: {
          duration: 1.5,
          ease: [0.32, 0.72, 0, 1], // Custom easing
        },
      },
    };

    const renderChildren = () => {
      return React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          mouseX: mouseX,
          isHovered: isHovered,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        initial="initial"
        whileHover="hover"
        variants={containerVariants}
        animate={isHovered ? "hover" : "exit"}
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
          // after mouse leave, set isHovered to false after 1s
          setTimeout(() => {
            setIsHovered(false);
          }, 1000);
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
        className={cn(dockVariants({ className }))}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  magnification?: number;
  distance?: number;
  mouseX?: any;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
  isHovered?: boolean;
}

const defaultDockIconVariants = cva(
  "hover:bg-black/10 hover:dark:bg-white/10 p-1 md:p-3"
);

const DockIcon = ({
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  isHovered,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={isHovered ? { width } : {}}
      className={cn(
        defaultDockIconVariants({ className }),
        "flex aspect-square cursor-pointer items-center justify-center rounded-full min-h-10"
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export interface DockItemsRevealWrapperProps {
  isHovered: boolean;
  children: React.ReactNode;
  extend?: boolean;
  width?: string;
  className?: string;
}
const DockItemsRevealWrapper: React.FC<DockItemsRevealWrapperProps> = ({
  isHovered,
  children,
  extend,
  width,
  className,
}) => {
  return (
    <motion.div
      className={cn(className, "flex h-full")}
      key="search-box"
      initial={extend ? { opacity: 0, width: 0 } : { opacity: 0 }}
      animate={
        isHovered
          ? extend
            ? {
                opacity: 1,
                width: width,
              }
            : { opacity: 1 }
          : extend
          ? { opacity: 0, width: "0px" }
          : { opacity: 0 }
      }
      style={{
        ["--cmd-width" as string]:
          // using clamp to set min and max width with a smoothing effect
          "clamp(7rem, (100vw - 768px) * 0.1 + 5rem, 8rem)",
      }}
      transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
};

DockItemsRevealWrapper.displayName = "DockItemsRevealWrapper";

export { Dock, DockIcon, DockItemsRevealWrapper, dockVariants };
