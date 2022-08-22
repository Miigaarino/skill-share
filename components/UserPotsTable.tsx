/* eslint-disable @next/next/no-img-element */
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { Blog } from "types";
import { classNames, toLocaleDate } from "utils";

const columnHelper = createColumnHelper<Blog>();

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
        <Link href={`blog/${info.row.original.id}`}>
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
      <span
        className={classNames(
          "inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ",
          info.getValue() === "PUBLISHED"
            ? "bg-green-100 text-green-800"
            : "bg-gray-300 text-gray-800"
        )}
      >
        {info.getValue()}
      </span>
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
];

export function UserPostsTable({ data }: { data: Blog[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-300">
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
