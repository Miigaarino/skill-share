/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Blog } from "types";

import { classNames, toLocaleDate } from "utils";

const columnHelper = createColumnHelper<Blog>();

export const STATUS = {
  PUBLISHED: (
    <span
      className={classNames(
        "inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800"
      )}
    >
      PUBLISHED
    </span>
  ),
  DRAFT: (
    <span
      className={classNames(
        "inline-flex rounded-full bg-gray-300 px-2 text-xs font-semibold leading-5 text-gray-800"
      )}
    >
      DRAFT
    </span>
  ),
  REJECTED: (
    <span
      className={classNames(
        "inline-flex rounded-full bg-red-300 px-2 text-xs font-semibold leading-5 text-red-600"
      )}
    >
      REJECTED
    </span>
  ),
};

const columns = [
  columnHelper.accessor("banner", {
    header: "Banner",
    cell: (info) => (
      <img
        className="my-4 mr-4 aspect-video w-20 rounded-lg border object-cover"
        src={info.getValue()}
        alt={info.getValue()}
      />
    ),
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="mr-2 w-24 py-4 text-gray-500 md:w-48">
        <Link href={`/blog/${info.row.original.id}`}>
          <a className="hover:underline">{info.getValue()}</a>
        </Link>
      </div>
    ),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created at",
    cell: (info) => (
      <div className="text-gray-500">{toLocaleDate(info.getValue())}</div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <div className="flex flex-col">
        <div>{STATUS[info.getValue()]}</div>
        {info.row.original.approvedBy ? (
          <Link href={`/user/${info.row.original.approvedBy.id}`}>
            <a className="inline-block cursor-pointer text-[10px] hover:underline">
              By {info.row.original.approvedBy?.name}
            </a>
          </Link>
        ) : null}
      </div>
    ),
  }),
  columnHelper.accessor("likes", {
    header: "Likes",
    cell: (info) => (
      <div className="flex justify-center text-gray-500 ">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("author", {
    header: "Author",
    cell: (info) => {
      const author = info.getValue();
      return (
        <Link href={`/author/${author.id}`}>
          <a className="m-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl bg-gray-50 p-2 text-gray-500 shadow-lg hover:opacity-70">
            <img
              src={author.image}
              alt={author.name}
              className="h-10 w-10 rounded-full"
            />
            <p>{author.name}</p>
          </a>
        </Link>
      );
    },
  }),
];

export function AllPostsTable({
  data,
  admin = false,
}: {
  data: Blog[];
  admin?: boolean;
}) {
  const table = useReactTable({
    data,
    columns,
    initialState: { columnVisibility: { author: admin } },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-300 bg-gray-50">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="flex-1">
            {headerGroup.headers.map((header) => (
              <th
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                key={header.id}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-gray-200">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
