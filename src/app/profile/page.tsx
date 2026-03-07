import { getUserData } from '@/app/api/actions/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Shield, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProfilePage() {
  const userData = await getUserData();

  return (
    <div className="min-h-screen relative">
      <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
      <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
      
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account information</p>
        </div>

        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{userData?.username || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{userData?.email || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <Shield className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">{userData?.role || 'user'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
                <form action="/api/logout" method="POST" className="flex-1">
                  <Button type="submit" variant="destructive" className="w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
