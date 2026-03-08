// frontend/app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/layout/Providers';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PokéDex - Pokémon Data Pipeline',
  description: 'A resilient data pipeline and dashboard for Pokémon data from PokeAPI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}