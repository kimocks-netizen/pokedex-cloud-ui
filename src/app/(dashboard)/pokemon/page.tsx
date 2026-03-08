import { Card, CardContent } from '@/components/ui/card';
import { getPokemonList, getPokemonTypes } from '@/app/api/actions/pokemon';
import { isSuccessResponse, getErrorMessage } from '@/lib/api-responses';
import PokemonListClient from '@/components/pokemon/PokemonListClient';
import { Database, AlertCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PokemonPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 20;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const type = typeof params.type === 'string' ? params.type : undefined;
  const ability = typeof params.ability === 'string' ? params.ability : undefined;
  const sortBy = typeof params.sortBy === 'string' ? params.sortBy as 'id' | 'name' | 'powerScore' | 'hp' | 'attack' | 'defense' | 'speed' : 'id';
  
  const minHp = params.minHp ? Number(params.minHp) : undefined;
  const maxHp = params.maxHp ? Number(params.maxHp) : undefined;
  const minAttack = params.minAttack ? Number(params.minAttack) : undefined;
  const maxAttack = params.maxAttack ? Number(params.maxAttack) : undefined;
  const minDefense = params.minDefense ? Number(params.minDefense) : undefined;
  const maxDefense = params.maxDefense ? Number(params.maxDefense) : undefined;
  const minSpeed = params.minSpeed ? Number(params.minSpeed) : undefined;
  const maxSpeed = params.maxSpeed ? Number(params.maxSpeed) : undefined;
  const minPower = params.minPower ? Number(params.minPower) : undefined;
  const maxPower = params.maxPower ? Number(params.maxPower) : undefined;

  const [pokemonResponse, typesResponse] = await Promise.all([
    getPokemonList({ 
      page, 
      limit,
      search, 
      type, 
      ability,
      sortBy,
      minHp,
      maxHp,
      minAttack,
      maxAttack,
      minDefense,
      maxDefense,
      minSpeed,
      maxSpeed,
      minPower,
      maxPower,
    }),
    getPokemonTypes(),
  ]);

  if (!isSuccessResponse(pokemonResponse)) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto">
          <Card className="bg-red-50/90 dark:bg-red-900/30 backdrop-blur-md border-2 border-red-300 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300 font-medium text-lg">
                {getErrorMessage(pokemonResponse)}
              </p>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const { pokemon, total, totalPages } = pokemonResponse.data!;
  const types = isSuccessResponse(typesResponse) ? typesResponse.data! : [];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
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
    </AppLayout>
  );
}
