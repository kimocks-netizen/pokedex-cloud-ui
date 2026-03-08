export function CardSkeleton() {
  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-2 border-blue-400/20 dark:border-blue-400/20 rounded-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24" />
        <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-lg" />
      </div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-16 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32" />
    </div>
  );
}
