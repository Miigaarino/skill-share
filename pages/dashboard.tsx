import { HorizontalContainer } from "components";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();
  console.log(data);

  return (
    <main>
      <HorizontalContainer>
        <div className="my-4 grid grid-cols-1 items-start gap-4 md:my-8 lg:grid-cols-3 lg:gap-8">
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">{/* Your content */}</div>
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <section>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">{/* Your content */}</div>
              </div>
            </section>
          </div>
        </div>
      </HorizontalContainer>
    </main>
  );
}
