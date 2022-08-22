/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import { Query, QueryData } from "queries/AdminDashboardQuery";
import { AllPostsTable } from "./AllPostsTable";
import { Loader } from "./Loader";

export function AdminDashboard() {
  const { data, loading, error } = useQuery<QueryData>(Query);

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
              </div>
              <div className="overflow-y-scroll">
                <AllPostsTable data={data.allBlogs} />
              </div>
            </div>
          </div>
        </section>
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
                    <div className="flex items-center justify-between border-b-2 pb-4">
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

                      <button
                        type="button"
                        className="ml-4 rounded-md p-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
                      >
                        VIEW
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-base">Reputation point:</p>
                      <b>{item.reputation_point}</b>
                    </div>
                    <p className="text-base">Posts</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">All:</p>
                      <b>{item.posts.length}</b>
                    </div>
                    <div className="flex items-center justify-between text-green-600">
                      <p className="text-sm font-medium">Approved:</p>
                      <b>
                        {
                          item.posts.filter((i) => i.status === "PUBLISHED")
                            .length
                        }
                      </b>
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
