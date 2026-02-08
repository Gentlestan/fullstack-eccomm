export default function PageSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-7 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-8" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      </div>
    </div>
  );
}
