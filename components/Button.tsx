import { ButtonHTMLAttributes } from "react";

export function Button({
  type = "button",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      {...props}
      className={`inline-flex items-center justify-center rounded-md border border-transparent bg-cool-cyan px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cool-cyan sm:w-auto ${className}`}
    />
  );
}
