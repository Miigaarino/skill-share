import { ProgressSVG } from "./svg";

export function Loader() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ProgressSVG className="h-16 w-16 animate-spin fill-cool-cyan  text-gray-200 dark:text-gray-600" />
    </div>
  );
}
