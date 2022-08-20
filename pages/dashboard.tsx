/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import { Button, HorizontalContainer, Loader } from "components";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Query, QueryData, QueryVars } from "queries/UserQuery";
import { classNames, toLocaleDate } from "utils";

export default function Dashboard() {
  const { data: session } = useSession();

  const { data, loading, error } = useQuery<QueryData, QueryVars>(Query, {
    variables: { user_id: session?.user?.id },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main>
      <HorizontalContainer>
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
                      <Button>Create post</Button>
                    </div>
                  </div>
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Banner
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5  text-left text-sm font-semibold text-gray-900"
                              >
                                Title
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                CreatedAt
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Likes
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {data?.user.posts.map((post) => (
                              <tr key={post.id}>
                                <td className="whitespace-nowrap py-4 pl-4 text-sm">
                                  <div className="flex items-center">
                                    <img
                                      className=" aspect-video w-20 rounded-lg object-cover"
                                      src={post.banner}
                                      alt={post.title}
                                    />
                                  </div>
                                </td>
                                <td className="w-40 px-3 py-4 text-sm text-gray-500">
                                  <div className="text-gray-500 ">
                                    <Link href={`blog/${post.id}`}>
                                      <a className="hover:underline">
                                        {post.title}
                                      </a>
                                    </Link>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="text-gray-500">
                                    {toLocaleDate(post.createdAt)}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span
                                    className={classNames(
                                      "inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ",
                                      post.status === "PUBLISHED"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-300 text-gray-800"
                                    )}
                                  >
                                    {post.status}
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {post.likes}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <section>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <div className="mb-4 flex justify-center">
                    <img
                      className="aspect-square h-20 rounded-full object-cover lg:h-40"
                      src={data?.user.image}
                      alt={data?.user.name}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="mb-2 flex items-center justify-between">
                      <p>Username</p>
                      <p className="text-xl font-bold md:text-2xl">
                        {data?.user.name}
                      </p>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <p>E-mail</p>
                      <p className="text-sm sm:text-base">{data?.user.email}</p>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <p>Joined on</p>
                      <p className="text-sm sm:text-base">
                        {toLocaleDate(data?.user.createdAt as string)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Reputation point</p>
                      <p className="text-sm sm:text-base">
                        {data?.user.reputation_point}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </HorizontalContainer>
    </main>
  );
}
