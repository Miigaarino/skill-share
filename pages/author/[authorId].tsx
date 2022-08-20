/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import { BlogCard, HorizontalContainer, Loader } from "components";

import { Query, QueryData, QueryVars } from "queries/UserQuery";
import { useQuery } from "@apollo/client";
import { toLocaleDate } from "utils";
import Link from "next/link";

export default function Author() {
  const {
    query: { authorId },
  } = useRouter();

  const { data, loading, error } = useQuery<QueryData, QueryVars>(Query, {
    variables: { user_id: authorId as string },
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main className="py-8">
      <HorizontalContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="flex items-center rounded-3xl p-4 shadow-xl md:p-8">
              <img
                className="mr-4 aspect-square h-20 rounded-full object-cover md:mr-8 lg:h-40"
                src={data?.user.image}
                alt={data?.user.name}
              />
              <div className="flex flex-col">
                <p className="mb-2 text-xl font-bold md:text-2xl">
                  {data?.user.name}
                </p>
                <p className="mb-4 text-sm sm:text-base md:mb-8">
                  {data?.user.email}
                </p>
                <p className="text-sm sm:text-base">
                  Joined on {toLocaleDate(data?.user.createdAt as string)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8 shadow-xl">
            <p className="mb-2 text-2xl font-bold md:mb-6">
              Posts: {data?.user.posts.length}
            </p>
            <ul className="flex flex-col gap-4 md:gap-8">
              {data?.user.posts.map((post) => (
                <li
                  key={post.id}
                  className="overflow-hidden rounded-3xl shadow-2xl duration-500 hover:opacity-80 "
                >
                  <Link href={`/blog/${post.id}`}>
                    <a>
                      <BlogCard {...post} date={post.createdAt} />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </HorizontalContainer>
    </main>
  );
}
