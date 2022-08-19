import Link from "next/link";
import { TreeSVG } from "./svg";
import Lmao from "@heroicons/react/solid/ArchiveIcon";

export function Topbar() {
  return (
    <header className=" shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between border-b py-3 lg:border-none">
          <Link href="/">
            <a>
              <TreeSVG className="h-6 w-6" />
            </a>
          </Link>
          <Lmao className="h-6 w-6 text-red-600" />
          <div className="ml-10 space-x-4">
            <a
              href="#"
              className="inline-block rounded-md border border-transparent bg-cool-cyan/70 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Sign in
            </a>
            <a
              href="#"
              className="inline-block rounded-md border border-transparent bg-cool-cyan py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
