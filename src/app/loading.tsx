export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F3F7F4] px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Skeleton */}
        <section className="overflow-hidden rounded-3xl border border-[#E5E7EB] bg-white shadow-sm">
          <div className="grid items-center gap-8 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2 lg:px-14">
            <div className="animate-pulse">
              <div className="h-4 w-40 rounded bg-[#E5E7EB]" />

              <div className="mt-5 h-10 w-full max-w-lg rounded-lg bg-[#E5E7EB]" />

              <div className="mt-3 h-10 w-4/5 max-w-md rounded-lg bg-[#E5E7EB]" />

              <div className="mt-5 space-y-2">
                <div className="h-4 w-full max-w-xl rounded bg-[#E5E7EB]" />
                <div className="h-4 w-5/6 max-w-lg rounded bg-[#E5E7EB]" />
              </div>

              <div className="mt-7 h-12 w-40 rounded-xl bg-[#E5E7EB]" />
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="h-64 w-full max-w-md animate-pulse rounded-3xl bg-[#E5E7EB] sm:h-72" />
            </div>
          </div>
        </section>

        {/* Price Change Sections */}
        {[0, 1].map((section) => (
          <section key={section} className="mt-10">
            <div className="animate-pulse">
              <div className="h-7 w-48 rounded bg-[#E5E7EB]" />
              <div className="mt-2 h-4 w-72 max-w-full rounded bg-[#E5E7EB]" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-[#E5E7EB]" />

                    <div className="min-w-0 flex-1">
                      <div className="h-4 w-32 max-w-full rounded bg-[#E5E7EB]" />
                      <div className="mt-2 h-3 w-24 rounded bg-[#E5E7EB]" />
                    </div>

                    <div className="h-7 w-16 rounded-full bg-[#E5E7EB]" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* All Products */}
        <section className="mt-10 pb-10">
          <div className="animate-pulse">
            <div className="h-7 w-32 rounded bg-[#E5E7EB]" />
            <div className="mt-2 h-4 w-56 rounded bg-[#E5E7EB]" />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm"
              >
                <div className="h-32 rounded-2xl bg-[#E5E7EB]" />

                <div className="mt-5 h-5 w-3/4 rounded bg-[#E5E7EB]" />

                <div className="mt-3 h-4 w-1/2 rounded bg-[#E5E7EB]" />

                <div className="mt-5 h-8 w-28 rounded-lg bg-[#E5E7EB]" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}