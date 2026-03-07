import { Construction } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <Construction className="w-24 h-24 mx-auto text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Coming Soon
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
          The dashboard is currently under construction. Check back soon for exciting features!
        </p>
      </div>
    </div>
  );
}
