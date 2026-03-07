// frontend/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/layout/Providers';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Document Processing App',
  description: 'Upload and process documents with AI extraction',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}