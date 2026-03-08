import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Database, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function PerformancePage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Performance Comparison</h1>
          <p className="text-gray-600 dark:text-gray-400">OpenSearch Indexing vs API Speed Test - Querying <span className="font-bold text-red-600 dark:text-red-400">1,201</span> Pokémon Records</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300 text-base">
                <Zap className="h-4 w-4" />
                OpenSearch - Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">37ms</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Fast operation</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300 text-base">
                <Database className="h-4 w-4" />
                API - Response
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">1,120ms</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Slow operation</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-base">
                <TrendingUp className="h-4 w-4" />
                Speed Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">30.27x</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Faster with OpenSearch</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Test Results Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Measurement</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Fast operation (OpenSearch)</td>
                    <td className="py-3 px-4 font-bold text-green-600 dark:text-green-400">37 ms (0.037 s)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Slow operation (PostgreSQL)</td>
                    <td className="py-3 px-4 font-bold text-red-600 dark:text-red-400">1,120 ms (1.12 s)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Exact speed difference</td>
                    <td className="py-3 px-4 font-bold text-blue-600 dark:text-blue-400">30.27× faster</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">Time saved</td>
                    <td className="py-3 px-4 font-bold text-indigo-600 dark:text-indigo-400">1.083 seconds</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">PostgreSQL API Response - <span className="font-bold text-red-600 dark:text-red-400">1,201</span> Pokémon Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <Image 
                  src="/api-results-light.png" 
                  alt="PostgreSQL API Results" 
                  fill 
                  className="object-contain dark:hidden"
                />
                <Image 
                  src="/api-results.png" 
                  alt="PostgreSQL API Results" 
                  fill 
                  className="object-contain hidden dark:block"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">OpenSearch Response - <span className="font-bold text-red-600 dark:text-red-400">1,201</span> Pokémon Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <Image 
                  src="/open-results-light.png" 
                  alt="OpenSearch Results" 
                  fill 
                  className="object-contain dark:hidden"
                />
                <Image 
                  src="/open-results.png" 
                  alt="OpenSearch Results" 
                  fill 
                  className="object-contain hidden dark:block"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
