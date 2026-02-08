export default function OrdersSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border rounded p-4 space-y-2 bg-gray-200 dark:bg-gray-700"
        >
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>
      ))}
    </div>
  );
}
