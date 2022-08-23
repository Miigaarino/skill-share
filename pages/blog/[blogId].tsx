/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation, useQuery } from "@apollo/client";

import { PostStatus } from "@prisma/client";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { HeartIcon } from "@heroicons/react/solid";

import { Alert, HorizontalContainer, Loader } from "components";

import { Query, QueryData, QueryVars } from "queries/BlogQuery";
import {
  Mutation as AddCommentMutation,
  MutationData as AddCommentMutationData,
  MutationVars as AddCommentMutationVars,
} from "queries/AddCommentMutation";

import {
  Mutation as LikeMutation,
  MutationData as LikeMutationData,
  MutationVars as LikeMutationVars,
} from "queries/LikeMutation";

import { toLocaleDate } from "utils";

function ShowAlert({ status }: { status: PostStatus }) {
  switch (status) {
    case "DRAFT":
      return (
        <Alert
          title="Blog is draft"
          description="Waiting for admin's approval"
        />
      );
    case "REJECTED":
      return (
        <Alert
          rejected
          title="Blog is rejected"
          description="Nothing u can do at this point"
        />
      );
    default:
      return null;
  }
}

export default function Blog() {
  const {
    query: { blogId },
  } = useRouter();

  const { data, loading, error, refetch } = useQuery<QueryData, QueryVars>(
    Query,
    {
      variables: { blog_id: blogId as string },
    }
  );
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "" },
  });

  const [addComment, { loading: addingComment }] = useMutation<
    AddCommentMutationData,
    AddCommentMutationVars
  >(AddCommentMutation, {
    onCompleted: () => {
      refetch();
      reset();
    },
  });

  const [like, { loading: liking }] = useMutation<
    LikeMutationData,
    LikeMutationVars
  >(LikeMutation, { onCompleted: () => refetch() });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return data ? (
    <main className="py-8">
      <HorizontalContainer>
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          <article className="md:col-span-2">
            <ShowAlert status={data.blog.status} />
            <h1 className="mb-4 text-3xl font-bold">{data.blog.title}</h1>
            <p className="mb-8">
              Published on {toLocaleDate(data.blog.createdAt as string)}
            </p>
            <div className="flex justify-between">
              <Link href={`/author/${data.blog.author.id}`}>
                <a className="mb-8 flex items-center hover:opacity-70">
                  <img
                    src={data.blog.author.image}
                    alt={data.blog.author.name}
                    loading="lazy"
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-bold">{data.blog.author.name}</p>
                    <p className="text-sm">{data.blog.author.email}</p>
                  </div>
                </a>
              </Link>
              {data.blog.status === "PUBLISHED" && (
                <button
                  disabled={liking}
                  type="button"
                  onClick={() => {
                    try {
                      toast.promise(
                        like({
                          variables: {
                            blog_id: blogId as string,
                          },
                        }),
                        {
                          loading: "Liking...",
                          success: "Liked!🎉",
                          error: `Like failed 😥 Please try again`,
                        }
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <HeartIcon className="h-16 w-16 cursor-pointer rounded-full border fill-red-500 p-4 hover:opacity-70" />
                </button>
              )}
            </div>
            <img
              src={data.blog.banner}
              alt={data.blog.title}
              loading="lazy"
              className="mb-8 w-full rounded-3xl"
            />
            <div>{data.blog.content}</div>
          </article>
          {data.blog.status === "PUBLISHED" && (
            <div>
              <section className="mb-4 rounded-2xl bg-white p-4 shadow-lg md:mb-8">
                <div className="flex items-center text-red-500">
                  <HeartIcon className="mr-2 mb-2 h-10 w-10" />
                  <h4 className="text-xl">{data.blog.likedBy.length}</h4>
                </div>
                <ul className="flex flex-col gap-2">
                  {data.blog.likedBy.map(({ user, createdAt }) => (
                    <li key={user.id} className="rounded-xl bg-gray-100">
                      <p className="mt-2 text-center">
                        {new Date(parseInt(createdAt)).toLocaleString()}
                      </p>
                      <Link href={`/author/${user.id}`}>
                        <a className="flex items-center p-2 hover:opacity-70">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="mr-2 h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm text-gray-400">{user.name}</p>
                            <p className="text-sm text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="rounded-2xl bg-white p-4 shadow-lg">
                <h4 className="mb-2 text-xl">
                  Comments: {data.blog.comments.length}
                </h4>
                <div className="mb-4 rounded-xl bg-gray-100 p-4">
                  <form
                    onSubmit={handleSubmit(({ content }) => {
                      try {
                        toast.promise(
                          addComment({
                            variables: {
                              blog_id: blogId as string,
                              content,
                            },
                          }),
                          {
                            loading: "Adding comment...",
                            success: "Comment added!🎉",
                            error: `Comment add failed 😥 Please try again`,
                          }
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    })}
                  >
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Add your comment
                    </label>
                    <div className="mt-1">
                      <input
                        id="comment"
                        className="block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
                        {...register("content", { required: true })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button disabled={addingComment}>SUBMIT</button>
                    </div>
                  </form>
                </div>
                <ul className="flex flex-col gap-2">
                  {data.blog.comments.map((item) => (
                    <li key={item.id} className="rounded-xl bg-gray-100">
                      <p className="mt-2 text-center">
                        {new Date(parseInt(item.createdAt)).toLocaleString()}
                      </p>
                      <Link href={`/author/${item.author.id}`}>
                        <a className="flex items-center p-2 hover:opacity-70">
                          <img
                            src={item.author.image}
                            alt={item.author.name}
                            className="mr-2 h-10 w-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm text-gray-400">
                              {item.author.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {item.author.email}
                            </p>
                          </div>
                        </a>
                      </Link>
                      <div className="m-4 rounded-xl bg-white p-4">
                        {item.content}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>
      </HorizontalContainer>
    </main>
  ) : null;
}
