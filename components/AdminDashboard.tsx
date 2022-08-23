/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import Link from "next/link";

import { useQuery } from "@apollo/client";

import { PostStatus } from "@prisma/client";

import { CalendarIcon } from "@heroicons/react/solid";

import { Query, QueryData } from "queries/AdminDashboardQuery";

import { Blog } from "types";

import { AllPostsTable } from "./AllPostsTable";
import { Loader } from "./Loader";

export function AdminDashboard() {
  const { data, loading, error } = useQuery<QueryData>(Query);

  const [tableData, setTableData] = useState<Blog[]>([]);

  useEffect(() => data && data.allBlogs && setTableData(data.allBlogs), [data]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return data ? (
    <div className="my-4 grid grid-cols-1 items-start gap-4 md:my-8 lg:grid-cols-3 lg:gap-8">
      <div className="grid grid-cols-1 gap-4 lg:col-span-2">
        <section>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  Posts: {data.allBlogs.length}
                </h1>
                <div>
                  <select
                    onChange={(e) =>
                      setTableData(
                        e.target.value === "ALL"
                          ? data.allBlogs
                          : data.allBlogs.filter(
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
                <AllPostsTable admin data={tableData} />
              </div>
            </div>
          </div>
        </section>
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {data.allComments.map((comment) => (
              <li key={comment.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {new Date(parseInt(comment.createdAt)).toLocaleString()}
                    </p>
                    <div className="ml-2 flex">
                      <Link href={`/blog/${comment.blog.id}`}>
                        <a className="rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 hover:opacity-70">
                          {comment.blog.title}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <Link href={`/user/${comment.author.id}`}>
                      <a className="text-sm text-gray-500 hover:underline">
                        <p>{comment.author.name}</p>
                        <p>{comment.author.email}</p>
                      </a>
                    </Link>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <CalendarIcon
                        className="mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <section>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-900">
                  Users: {data.users.length}
                </h1>
              </div>
              <ul className="flex flex-col gap-y-4 divide-y">
                {data.users.map((item) => (
                  <li key={item.id} className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="mr-2 h-10 w-10 rounded-full"
                        />
                        <div>
                          <p>{item.name}</p>
                          <p className="text-xs">{item.email}</p>
                        </div>
                      </div>

                      <Link href={`/user/${item.id}`}>
                        <a className="ml-4 rounded-md p-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                          VIEW
                        </a>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  ) : null;
}
