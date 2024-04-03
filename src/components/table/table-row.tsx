import { ComponentProps } from "react";

interface Props extends ComponentProps<"tr"> {}

export function TableRow(props: Props) {
  return (
    <tr
      {...props}
      className="border-b border-white/10 hover:bg-white/5 transition-colors"
    />
  );
}
