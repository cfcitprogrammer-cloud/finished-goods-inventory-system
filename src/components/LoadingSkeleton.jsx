export default function LoadingSkeleton() {
  return (
    <div>
      <div className="p-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="flex flex-col gap-4 w-full">
            <div className="skeleton h-48 w-full rounded-md"></div>
            <div className="skeleton h-4 w-32 rounded"></div>
            <div className="skeleton h-4 w-full rounded"></div>
            <div className="skeleton h-4 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
