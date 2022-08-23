/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";

import Link from "next/link";

import { signOut, useSession, signIn } from "next-auth/react";

import { Menu, Transition } from "@headlessui/react";
import { BookOpenIcon, ChevronDownIcon } from "@heroicons/react/solid";

import { ProgressSVG } from "./svg/Progress";

import { UserSession } from "types";

export function Topbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex w-full items-center justify-between border-b py-3 lg:border-none">
          <Link href="/">
            <a>
              <BookOpenIcon className="h-6 w-6 fill-cool-cyan" />
            </a>
          </Link>
          {loading ? (
            <ProgressSVG className="mr-2 h-8 w-8 animate-spin fill-cool-cyan text-gray-200 dark:text-gray-600" />
          ) : session ? (
            <DropdownMenu user={session.user} />
          ) : (
            <div className="ml-10 space-x-4">
              <button
                onClick={() => signIn()}
                className="inline-block rounded-md border border-transparent bg-cool-cyan/70 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default function DropdownMenu({ user }: { user: UserSession }) {
  return user ? (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <img
            src={user.image as string}
            alt={user.name as string}
            className="mr-2 h-8 w-8 rounded-full"
          />
          {user.name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3">
            <p className="text-sm">Signed in as</p>
            <p className="truncate text-sm font-medium text-gray-900">
              {user.email}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              <>
                <Link href="/dashboard">
                  <a
                    className={
                      "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }
                  >
                    Dashboard
                  </a>
                </Link>
              </>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <button
                onClick={() => signOut()}
                type="button"
                className={
                  "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
              >
                Sign out
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <p>NO USER</p>
  );
}
