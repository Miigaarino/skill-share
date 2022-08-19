/* eslint-disable @next/next/no-img-element */
import { useQuery } from "@apollo/client";
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import { HorizontalContainer, Loader } from "components";
import type { NextPage } from "next";
import Link from "next/link";
import { Query, QueryData } from "queries/BlogsQuery";

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
        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data?.blogs.map((item) => (
            <Link key={item.id} href={`/blog/${item.id}`}>
              <a>
                <li className="cursor:pointer overflow-hidden rounded-3xl shadow-md duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <img
                    src={item.banner}
                    alt=""
                    loading="lazy"
                    className="aspect-video w-full object-cover"
                  />
                  <div className="m-4 flex items-center justify-between">
                    <div>
                      <h6 className="mb-4 text-xl font-semibold line-clamp-2">
                        {item.title}
                      </h6>
                      <p className="text-sm font-medium">
                        {new Date(
                          parseInt(item.createdAt)
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-center">
                      <HeartIcon className="h-6 w-6 fill-pink-300" />
                      <p className="text-pink-300">{item.likes}</p>
                    </div>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </HorizontalContainer>
    </main>
  );
};

export default Home;
