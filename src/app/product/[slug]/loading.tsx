export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-[#F3F7F4] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="min-h-72 rounded-2xl bg-gray-200" />

            <div>
              <div className="h-5 w-24 rounded bg-gray-200" />

              <div className="mt-4 h-10 w-72 max-w-full rounded bg-gray-200" />

              <div className="mt-4 h-5 w-full rounded bg-gray-200" />

              <div className="mt-2 h-5 w-4/5 rounded bg-gray-200" />

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="h-24 rounded-xl bg-gray-200" />
                <div className="h-24 rounded-xl bg-gray-200" />
                <div className="h-24 rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
