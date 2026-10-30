export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-label="পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-4"
        >
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded-2xl bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>

          <div className="mt-5 h-3 w-20 rounded bg-gray-200" />
          <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-3 w-1/3 rounded bg-gray-200" />

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="h-3 w-20 rounded bg-gray-200" />
            <div className="mt-2 h-6 w-2/3 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}