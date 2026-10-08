export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-[#F0F5F0]">
      {/* Navbar Skeleton */}
      <header className="border-b border-[#E1E8E1] bg-[#FAFCFA]">
        {/* Top row */}
        <div className="mx-auto flex h-[68px] max-w-[1164px] items-center justify-between gap-4 px-4 sm:px-5">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="skeleton h-10 w-10 rounded-xl" />

            <div className="space-y-1">
              <div className="skeleton h-6 w-24 rounded" />
              <div className="skeleton h-4 w-40 rounded" />
            </div>
          </div>

          {/* Auth */}
          <div className="skeleton h-10 w-[117px] rounded-lg" />
        </div>

        {/* Category navigation */}
        <div className="h-[50px] border-t border-[#F0F5F0]">
          <div className="mx-auto flex h-full max-w-[1152px] items-center gap-1 overflow-hidden px-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="skeleton h-8 w-[72px] shrink-0 rounded-lg"
              />
            ))}
          </div>
        </div>
      </header>

      {/* Price ticker skeleton */}
      <div className="h-[37px] overflow-hidden border-b border-[#E1E8E1] bg-[#FAFCFA]">
        <div className="mx-auto flex h-full max-w-[1440px] items-center gap-4 px-4">
          <div className="skeleton h-5 w-14 shrink-0 rounded" />

          <div className="skeleton h-5 w-48 shrink-0 rounded" />
          <div className="skeleton h-5 w-56 shrink-0 rounded" />
          <div className="skeleton h-5 w-44 shrink-0 rounded" />
          <div className="skeleton h-5 w-52 shrink-0 rounded" />
        </div>
      </div>

      {/* Main */}
      <main className="min-h-[620px]">
        <div className="mx-auto w-full max-w-[1120px] px-4 pb-12 pt-6 sm:pb-14 lg:pb-16">
          {/* Category Header Skeleton */}
          <section className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] px-5 py-5">
            <div className="flex items-center gap-4">
              <div className="skeleton h-9 w-9 shrink-0 rounded-xl" />

              <div className="space-y-2">
                <div className="skeleton h-8 w-24 rounded" />

                <div className="skeleton h-4 w-56 rounded" />
              </div>
            </div>
          </section>

          {/* Toolbar Skeleton */}
          <div className="mb-4 mt-6 flex items-center justify-between gap-4">
            <div className="skeleton h-5 w-40 rounded" />

            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-10 rounded" />

              <div className="skeleton h-8 w-[75px] rounded-lg" />
            </div>
          </div>

          {/* Product Cards Skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[138px] rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-4"
              >
                {/* Top row */}
                <div className="flex h-12 items-center gap-3">
                  <div className="skeleton h-12 w-12 shrink-0 rounded-xl" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="skeleton h-5 w-3/4 rounded" />

                    <div className="skeleton h-4 w-1/3 rounded" />
                  </div>
                </div>

                {/* Bottom row */}
                <div className="mt-3 flex h-11 items-end justify-between gap-3">
                  <div className="space-y-1">
                    <div className="skeleton h-4 w-16 rounded" />

                    <div className="skeleton h-7 w-20 rounded" />
                  </div>

                  <div className="skeleton h-6 w-16 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="border-t border-[#E1E8E1] bg-[#FAFCFA]">
        <div className="mx-auto flex min-h-[69px] max-w-[1152px] flex-col items-start justify-center gap-2 px-4 py-5 sm:px-5 md:flex-row md:items-center md:justify-between md:gap-6 lg:px-4">
          <div className="skeleton h-4 w-64 rounded" />

          <div className="skeleton h-4 w-80 rounded" />
        </div>
      </footer>
    </div>
  );
}
