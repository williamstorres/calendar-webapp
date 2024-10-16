import React from "react";
import { twMerge } from "tailwind-merge";

export enum ButtonType {
  Submit = "submit",
  Reset = "reset",
}
type ButtonProps = React.ComponentPropsWithoutRef<"input"> & {
  children: string;
  type?: ButtonType;
  onClick?: () => void;
};
export const Button = ({
  children,
  type,
  onClick,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={twMerge("h-8", className, disabled && "text-opacity-50")}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
