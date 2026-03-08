import { getPokemonById } from '@/app/api/actions/pokemon';
import { isSuccessResponse, getErrorMessage } from '@/lib/api-responses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import TypeBadge from '@/components/pokemon/TypeBadge';
import Image from 'next/image';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const { id } = await params;
  const pokemonResponse = await getPokemonById(parseInt(id));

  if (!isSuccessResponse(pokemonResponse)) {
    return (
      <div className="min-h-screen relative">
        <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
        <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
        <div className="relative z-10 max-w-4xl mx-auto p-8">
          <Card className="bg-red-50/90 dark:bg-red-900/30 backdrop-blur-md border-2 border-red-300 dark:border-red-800 rounded-2xl">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600 dark:text-red-400" />
              <p className="text-red-700 dark:text-red-300 font-medium text-lg">
                {getErrorMessage(pokemonResponse)}
              </p>
              <Link href="/pokemon">
                <Button className="mt-4" variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to List
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const pokemon = pokemonResponse.data!;

  return (
    <div className="min-h-screen relative">
      <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
      <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
      
      <div className="relative z-10 max-w-5xl mx-auto p-8">
        <Link href="/pokemon">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Button>
        </Link>

        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-2">
                {pokemon.sprite ? (
                  <Image src={pokemon.sprite} alt={pokemon.name} fill className="object-contain" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-bold text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</span>
                  <CardTitle className="text-3xl font-bold capitalize text-gray-900 dark:text-white">{pokemon.name}</CardTitle>
                </div>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">Power Score</p>
                <p className="text-4xl font-bold text-primary">{pokemon.powerScore}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Base Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">HP</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{pokemon.hp}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(pokemon.hp / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Attack</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{pokemon.attack}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(pokemon.attack / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Defense</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{pokemon.defense}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(pokemon.defense / 255) * 100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Speed</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{pokemon.speed}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(pokemon.speed / 255) * 100}%` }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Stats Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stats</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {pokemon.hp + pokemon.attack + pokemon.defense + pokemon.speed}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Stat</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {Math.round((pokemon.hp + pokemon.attack + pokemon.defense + pokemon.speed) / 4)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest Stat</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {Math.max(pokemon.hp, pokemon.attack, pokemon.defense, pokemon.speed)}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Lowest Stat</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {Math.min(pokemon.hp, pokemon.attack, pokemon.defense, pokemon.speed)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
