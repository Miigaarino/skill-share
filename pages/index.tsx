import Link from "next/link";
import type { NextPage } from "next";

import { useQuery } from "@apollo/client";

import { BlogCard, HorizontalContainer, Loader } from "components";

import { Query, QueryData } from "queries/PublishedBlogsQuery";

const Home: NextPage = () => {
  const { data, loading, error } = useQuery<QueryData>(Query);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main className="py-8">
      <HorizontalContainer>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.blogs.map((item) => (
            <li
              key={item.id}
              className="cursor:pointer overflow-hidden rounded-3xl shadow-md duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <Link href={`/blog/${item.id}`}>
                <a>
                  <BlogCard
                    banner={item.banner}
                    date={item.createdAt}
                    likes={item.likes}
                    title={item.title}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </HorizontalContainer>
    </main>
  );
};

export default Home;
