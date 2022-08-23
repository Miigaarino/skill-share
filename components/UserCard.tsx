import { toLocaleDate } from "utils";

import { UserSession } from "types";

/* eslint-disable @next/next/no-img-element */
export function UserCard({
  user,
}: {
  user: UserSession & { reputation_point: number };
}) {
  console.log(user);
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-6">
        <div className="mb-4 flex justify-center">
          <img
            className="aspect-square h-20 rounded-full object-cover lg:h-40"
            src={user.image}
            alt={user.name}
          />
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <p>Username</p>
            <p className="text-xl font-bold line-clamp-1 md:text-2xl">
              {user.name}
            </p>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <p>E-mail</p>
            <p className="text-sm sm:text-base">{user.email}</p>
          </div>
          <div className="mb-2 flex items-center justify-between">
            <p>Joined on</p>
            <p className="text-sm sm:text-base">
              {user.createdAt.length !== 13
                ? user.createdAt
                : toLocaleDate(user.createdAt as string)}
            </p>
          </div>
          {user.reputation_point ? (
            <div className="flex items-center justify-between">
              <p>Reputation point</p>
              <p className="text-sm sm:text-base">{user.reputation_point}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
