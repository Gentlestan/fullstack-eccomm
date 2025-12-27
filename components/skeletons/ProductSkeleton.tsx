// components/skeletons/ProductSkeleton.tsx

export default function ProductSkeleton() {
  return (
    <div className="rounded-xl p-4 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse">
      
      {/* Image skeleton */}
      <div className="w-full h-40 md:h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

      {/* Text skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2 mt-4">
        <div className="flex-1 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      </div>
    </div>
  );
}
