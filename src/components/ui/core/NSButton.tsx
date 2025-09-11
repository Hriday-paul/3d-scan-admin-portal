import React from "react";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

type NSButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  isLoading ?: boolean
};

const NSButton: React.FC<NSButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:cursor-pointer",
        "bg-[#268CBE] text-white  disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row gap-x-2 items-center justify-center",
        className
      )}
    >
        {isLoading && <LoaderCircle className="size-5 animate-spin" />}
      {children}
    </button>
  );
};

export default NSButton;
