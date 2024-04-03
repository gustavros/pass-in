import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  variant: "transparent" | "default";
}

export function IconButton({ variant, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "border border-white/10 rounded-md p-1.5 transition-colors",
        variant === "transparent"
          ? "bg-black/10 hover:bg-black/20"
          : "bg-white/10 hover:bg-white/20",
        props.disabled && "opacity-50 cursor-not-allowed"
      )}
    />
  );
}
