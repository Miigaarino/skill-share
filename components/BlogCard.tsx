/* eslint-disable @next/next/no-img-element */
import HeartIcon from "@heroicons/react/solid/HeartIcon";
import { toLocaleDate } from "utils";

export function BlogCard({
  banner,
  title,
  date,
  likes,
}: {
  banner: string;
  title: string;
  date: string;
  likes: number;
}) {
  return (
    <>
      <img
        src={banner}
        alt=""
        loading="lazy"
        className="aspect-video w-full object-cover"
      />
      <div className="m-4 flex items-center justify-between">
        <div>
          <h6 className="mb-4 text-xl font-semibold line-clamp-2">{title}</h6>
          <p className="text-sm font-medium">{toLocaleDate(date)}</p>
        </div>
        <div className="flex flex-col items-center">
          <HeartIcon className="h-6 w-6 fill-pink-300" />
          <p className="text-pink-300">{likes}</p>
        </div>
      </div>
    </>
  );
}
