/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

import Router from "next/router";

import { useSession } from "next-auth/react";

import { useQuery } from "@apollo/client";

import {
  AdminDashboard,
  BecomeAdminBanner,
  Button,
  HorizontalContainer,
  Loader,
  UserCard,
  UserComments,
  UserLikedPosts,
  UserPostsTable,
} from "components";

import { Query, QueryData, QueryVars } from "queries/UserQuery";
import { classNames } from "utils";

const tabs: { id: "0" | "1"; name: string }[] = [
  { id: "0", name: "My Account" },
  { id: "1", name: "ADMIN" },
];

export default function Dashboard() {
  const { data: session, status } = useSession();

  const sessionLoading = status === "loading";

  const [tabIndex, setTabIndex] = useState<"0" | "1">("0");

  const { data, loading, error } = useQuery<QueryData, QueryVars>(Query, {
    variables: { user_id: session?.user.id as string },
  });

  if (loading || sessionLoading) {
    return <Loader />;
  }

  if (!session) {
    return <p>PLEASE LOG IN</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return data ? (
    <main>
      {session?.user?.role !== "ADMIN" ? <BecomeAdminBanner /> : null}
      <HorizontalContainer>
        {session?.user?.role === "ADMIN" ? (
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="sm:hidden">
              <select
                className="block w-full rounded-md border-gray-300"
                value={tabIndex}
                onChange={({ target: { value } }) =>
                  setTabIndex(value as "0" | "1")
                }
              >
                {tabs.map((tab) => (
                  <option value={tab.id} key={tab.name}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow-lg">
                {tabs.map((tab, tabIdx) => (
                  <button
                    onClick={() => setTabIndex(tab.id)}
                    key={tab.name}
                    className={classNames(
                      tab.id === tabIndex
                        ? "text-gray-900"
                        : "text-gray-500 hover:text-gray-700",
                      tabIdx === 0 ? "rounded-l-lg" : "",
                      tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                      "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50"
                    )}
                  >
                    <span>{tab.name}</span>
                    <span
                      className={classNames(
                        tab.id === tabIndex ? "bg-cool-cyan" : "bg-transparent",
                        "absolute inset-x-0 bottom-0 h-0.5"
                      )}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        ) : null}

        {tabIndex === "0" ? (
          <div className="my-4 grid grid-cols-1 items-start gap-4 md:my-8 lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section>
                <div className="overflow-hidden rounded-lg bg-white shadow">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Posts: {data?.user.posts.length}
                      </h1>
                      <div>
                        <Button onClick={() => Router.push("/blog/create")}>
                          Create post
                        </Button>
                      </div>
                    </div>

                    <div className="overflow-y-scroll">
                      <UserPostsTable data={data.user.posts} />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="bg-white p-6 shadow sm:rounded-lg">
                  <h1 className="mb-4 text-xl font-semibold text-gray-900">
                    Comments: {data.user.comments.length}
                  </h1>
                  <UserComments comments={data.user.comments} />
                </div>
              </section>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <section>
                <UserCard user={data?.user} />
              </section>

              <section>
                <div className="bg-white p-6 shadow sm:rounded-lg">
                  <h1 className="mb-4 text-xl font-semibold text-gray-900">
                    Liked posts: {data.user.likedPosts.length}
                  </h1>
                  <UserLikedPosts likedPosts={data.user.likedPosts} />
                </div>
              </section>
            </div>
          </div>
        ) : (
          <AdminDashboard />
        )}
      </HorizontalContainer>
    </main>
  ) : null;
}
