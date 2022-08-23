import Link from "next/link";
import { Comment } from "types";

export function UserComments({ comments }: { comments: Comment[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {comments.map((p) => (
        <li className="rounded-xl bg-gray-100 p-4" key={p.createdAt}>
          <Link href={`/blog/${p.blog.id}`}>
            <a className="inline-block font-semibold hover:underline">
              {p.blog.title}
            </a>
          </Link>
          <Link href={`/author/${p.blog.author.id}`}>
            <a className="font-medium text-gray-700 hover:underline">
              By {p.blog.author.name}
            </a>
          </Link>
          <p className="mb-4 text-sm text-gray-500">
            {new Date(parseInt(p.createdAt)).toLocaleString()}
          </p>
          <p className="rounded-xl bg-white p-4">{p.content}</p>
        </li>
      ))}
    </ul>
  );
}
