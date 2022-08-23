import { useState } from "react";

import { useSession } from "next-auth/react";

import { useMutation } from "@apollo/client";

import toast from "react-hot-toast";

import XIcon from "@heroicons/react/solid/XIcon";
import SpeakerphoneIcon from "@heroicons/react/solid/SpeakerphoneIcon";

import {
  Mutation,
  MutationData,
  MutationVars,
} from "queries/BecomeAdminMutation";

export function BecomeAdminBanner() {
  const [open, setOpen] = useState(true);

  const { data: session } = useSession();

  const reloadSession = () => {
    setOpen(false);
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  const [becomeAdmin] = useMutation<MutationData, MutationVars>(Mutation, {
    onCompleted: reloadSession,
  });

  function onClick() {
    try {
      toast.promise(
        becomeAdmin({ variables: { user_id: session?.user.id as string } }),
        {
          loading: "Becoming adminnnn...",
          success: "You are now admin!🎉",
          error: `Becoming admin failed 😥 Please try again`,
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return open ? (
    <div className="fixed inset-x-0 bottom-0 pb-2 opacity-90 sm:pb-5">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-cool-cyan/70 p-2 shadow-lg sm:p-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-cool-cyan p-2">
                <SpeakerphoneIcon
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-medium text-white">
                <span className="inline">
                  Та арын товч дээр дарснаар АДМИН болох боломжтой.
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
              <button
                onClick={onClick}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-cool-cyan shadow-sm hover:bg-cool-cyan/20"
              >
                Админ болох
              </button>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="-mr-1 flex rounded-md p-2 hover:bg-cool-cyan"
              >
                <XIcon className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
