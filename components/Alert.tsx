import { useMutation } from "@apollo/client";
import BanIcon from "@heroicons/react/solid/BanIcon";
import CheckCircleIcon from "@heroicons/react/solid/CheckCircleIcon";
import ExclamationIcon from "@heroicons/react/solid/ExclamationIcon";
import { PostStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import {
  Mutation,
  MutationData,
  MutationVars,
} from "queries/ReviewBlogMutation";
import toast from "react-hot-toast";
import { classNames } from "utils";

export function Alert({
  title,
  description,
  rejected = false,
}: {
  title: string;
  description: string;
  rejected?: boolean;
}) {
  const { query } = useRouter();
  const { data: session } = useSession();
  const { blogId } = query;
  const [reviewBlog, { loading }] = useMutation<MutationData, MutationVars>(
    Mutation
  );

  function onClick(status: PostStatus) {
    toast.promise(
      reviewBlog({
        variables: {
          blog_id: blogId as string,
          status,
        },
      }),
      {
        loading: "Changing blog status...",
        success: "Blog status changed!🎉",
        error: `Blog status change failed 😥 Please try again`,
      }
    );
  }

  return (
    <div
      className={classNames(
        `sticky top-4 mx-8 mb-4 rounded-md  p-4 shadow-lg`,
        rejected ? "bg-red-100" : "bg-yellow-50"
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{description}</p>
          </div>
          {session?.user.role === "ADMIN" && !rejected ? (
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onClick("PUBLISHED")}
                  className="flex items-center rounded-md bg-yellow-200 px-2 py-1.5 text-sm font-medium text-yellow-800 shadow-xl hover:bg-yellow-300 disabled:opacity-60"
                >
                  <CheckCircleIcon className="mr-1 h-6 w-6" />
                  Approve
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onClick("REJECTED")}
                  className="ml-3 flex items-center rounded-md bg-yellow-200 px-2 py-1.5 text-sm font-medium text-yellow-800 shadow-xl hover:bg-yellow-300 disabled:opacity-60"
                >
                  <BanIcon className="mr-1 h-6 w-6 " />
                  Reject
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
