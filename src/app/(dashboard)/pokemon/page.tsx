import { Card, CardContent } from '@/components/ui/card';
import { getPokemonList, getPokemonTypes } from '@/app/api/actions/pokemon';
import { isSuccessResponse, getErrorMessage } from '@/lib/api-responses';
import PokemonListClient from '@/components/pokemon/PokemonListClient';
import { Database, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PokemonPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const type = typeof params.type === 'string' ? params.type : undefined;
  const sortBy = typeof params.sortBy === 'string' ? params.sortBy as 'id' | 'name' | 'powerScore' : 'id';

  const [pokemonResponse, typesResponse] = await Promise.all([
    getPokemonList({ page, search, type, sortBy, limit: 20 }),
    getPokemonTypes(),
  ]);

  if (!isSuccessResponse(pokemonResponse)) {
    return (
      <div className="min-h-screen relative">
        <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
        <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
        <div className="relative z-10 max-w-7xl mx-auto p-8">
          <Card className="bg-red-50/90 dark:bg-red-900/30 backdrop-blur-md border-2 border-red-300 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300 font-medium text-lg">
                {getErrorMessage(pokemonResponse)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { pokemon, total, totalPages } = pokemonResponse.data!;
  const types = isSuccessResponse(typesResponse) ? typesResponse.data! : [];

  return (
    <div className="min-h-screen relative">
      <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
      <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {pokemon.length === 0 && !search && !type ? (
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2">
            <CardContent className="p-16 text-center">
              <Database className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">No Pokémon data available</p>
            </CardContent>
          </Card>
        ) : (
          <PokemonListClient
            initialPokemon={pokemon}
            total={total}
            page={page}
            totalPages={totalPages}
            types={types}
          />
        )}
      </div>
    </div>
  );
}
