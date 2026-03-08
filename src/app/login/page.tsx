import { use } from 'react';
import Image from 'next/image';
import { Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Mask from '@/components/Mask';
import LoginFormClient from './LoginFormClient';

interface LoginPageProps {
  searchParams: Promise<{ success?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/bg-images/bg-dark.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover dark:block hidden"
        />
        <Image
          src="/bg-images/bg-light.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover dark:hidden block"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-950/85 to-purple-950/90 dark:from-slate-900/90 dark:via-blue-950/85 dark:to-purple-950/90 hidden dark:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/25 to-purple-500/30 dark:hidden" />
      </div>

      <Mask particleCount={100} />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="hidden lg:block">
            <div className="flex items-center justify-center gap-3 mb-36">
              <Database className="w-14 h-14 text-gray-900 dark:text-white drop-shadow-lg" />
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
                PokéDex
              </h1>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white drop-shadow-lg text-center">
                Secure Access
              </h2>
              <p className="text-xl text-gray-800 dark:text-gray-200 drop-shadow-lg text-center">
                Sign in to manage your Pokémon data pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white dark:bg-slate-900/95 border-gray-200 dark:border-slate-700/50 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
              <CardHeader className="text-center space-y-3 pb-6">
                <div className="mx-auto w-16 h-16 p-3 bg-blue-600 rounded-full flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-sm">
                  Sign in to access your dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <LoginFormClient success={params.success} />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
