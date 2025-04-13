import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface ToolbarIconButtonProps extends ButtonProps {
  isActive: boolean;
  children: React.ReactNode;
}

export const ToolbarIconButton = ({
  isActive,
  children,
  ...props
}: ToolbarIconButtonProps) => {
  return (
    <Button
      className={cn(
        `p-0 h-6 w-7 hover:bg-blue-100 dark:hover:bg-purple-800 text-gray-600 dark:text-gray-400
        transition-all duration-700 ease-in-out transform hover:scale-110
    `,
        isActive
          ? `bg-gradient-to-r from-blue-300 to-cyan-200 dark:from-purple-700 dark:to-indigo-800`
          : `bg-transparent`
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
