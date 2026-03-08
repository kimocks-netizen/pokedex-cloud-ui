export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-2 border-blue-400/20 dark:border-blue-400/20 rounded-lg overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse" />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded flex-1" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}
