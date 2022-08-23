import Link from "next/link";

import { LikedPosts } from "types";

export function UserLikedPosts({ likedPosts }: { likedPosts: LikedPosts[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {likedPosts.map((p) => (
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
          <p className="text-sm text-gray-500">
            {new Date(parseInt(p.createdAt)).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
