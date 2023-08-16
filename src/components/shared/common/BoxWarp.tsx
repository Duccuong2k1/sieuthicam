import React from "react";

type Props = {};

export function BoxWarp({ children, className }: Props & ReactProps) {
  return (
    <div className={`p-2 rounded-md bg-white ${className}`}>{children}</div>
  );
}
