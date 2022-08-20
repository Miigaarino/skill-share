/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import { HorizontalContainer, Loader } from "components";

import { Query, QueryData, QueryVars } from "queries/BlogQuery";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { toLocaleDate } from "utils";

export default function Blog() {
  const {
    query: { blogId },
  } = useRouter();

  const { data, loading, error } = useQuery<QueryData, QueryVars>(Query, {
    variables: { blog_id: blogId as string },
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
        <article className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold">{data?.blog.title}</h1>
          <p className="mb-8">
            Published on {toLocaleDate(data?.blog.createdAt as string)}
          </p>
          <Link href={`/author/${data?.blog.author.id}`}>
            <a className="mb-8 flex items-center">
              <img
                src={data?.blog.author.image}
                alt={data?.blog.author.name}
                loading="lazy"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-lg font-bold">{data?.blog.author.name}</p>
                <p className="text-sm">{data?.blog.author.email}</p>
              </div>
            </a>
          </Link>
          <img
            src={data?.blog.banner}
            alt={data?.blog.title}
            loading="lazy"
            className="mb-8 w-full rounded-3xl"
          />
          <div>{data?.blog.content}</div>
        </article>
      </HorizontalContainer>
    </main>
  );
}
