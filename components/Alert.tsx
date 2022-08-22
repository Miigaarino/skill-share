import { ExclamationIcon } from "@heroicons/react/solid";

export function Alert({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 rounded-md bg-yellow-50 p-4 shadow-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
