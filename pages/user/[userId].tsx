/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";

import { useQuery } from "@apollo/client";

import { PostStatus } from "@prisma/client";

import {
  AllPostsTable,
  HorizontalContainer,
  Loader,
  UserComments,
  UserLikedPosts,
} from "components";

import { Query, QueryData, QueryVars } from "queries/UserQuery";

import { toLocaleDate } from "utils";
import { Blog } from "types";

export default function UserDetail() {
  const { query } = useRouter();

  const { data: session } = useSession();

  const [tableData, setTableData] = useState<Blog[]>([]);

  const { userId } = query;

  const { data, loading, error } = useQuery<QueryData, QueryVars>(Query, {
    variables: { user_id: userId as string },
  });

  useEffect(() => data && data.user && setTableData(data.user.posts), [data]);

  if (loading) {
    return <Loader />;
  }

  if (session?.user.role !== "ADMIN") {
    return <p>ONLY ADMIN CAN VIEW USER PROFILE</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return data ? (
    <main>
      <HorizontalContainer>
        <main className="py-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <img
                className="h-16 w-16 rounded-full"
                src={data.user.image}
                alt={data.user.name}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {data.user.name}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  {data.user.email}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Joined on: {toLocaleDate(data.user.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <section>
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-900">
                      Own posts: {data.user.posts.length}
                    </h1>
                    <div>
                      <select
                        onChange={(e) =>
                          setTableData(
                            e.target.value === "ALL"
                              ? data.user.posts
                              : data.user.posts.filter(
                                  (item) => item.status === e.target.value
                                )
                          )
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base sm:text-sm"
                      >
                        <option value={"ALL"}>ALL</option>
                        {[
                          PostStatus.DRAFT,
                          PostStatus.PUBLISHED,
                          PostStatus.REJECTED,
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="overflow-y-scroll">
                    <AllPostsTable data={tableData} />
                  </div>
                </div>
              </section>

              {data.user.role === "ADMIN" ? (
                <section>
                  <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h1 className="text-xl font-semibold text-gray-900">
                        Reviewed posts: {data.user.approvedPosts.length}
                      </h1>
                    </div>
                    <div className="overflow-y-scroll">
                      <AllPostsTable admin data={data.user.approvedPosts} />
                    </div>
                  </div>
                </section>
              ) : null}
            </div>

            <div className="space-y-6">
              <section>
                <div className="bg-white shadow sm:rounded-lg">
                  <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Role
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                        {data?.user.role}
                      </dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Reputation point
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900  sm:mt-0">
                        {data?.user.reputation_point}
                      </dd>
                    </div>
                  </dl>
                </div>
              </section>

              <section>
                <div className="bg-white p-6 shadow sm:rounded-lg">
                  <h1 className="mb-4 text-xl font-semibold text-gray-900">
                    Liked posts: {data.user.likedPosts.length}
                  </h1>
                  <UserLikedPosts likedPosts={data.user.likedPosts} />
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
          </div>
        </main>
      </HorizontalContainer>
    </main>
  ) : null;
}
