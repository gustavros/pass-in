import { ComponentProps } from "react";

interface Props extends ComponentProps<"a"> {
  children: string;
  href: string;
}

export function NavLink(props: Props) {
  return <a {...props}>{props.children}</a>;
}
