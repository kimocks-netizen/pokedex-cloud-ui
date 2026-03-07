import { Card, CardContent } from '@/components/ui/card';
import type { Pokemon } from '@/app/api/actions/pokemon';
import Image from 'next/image';
import TypeBadge from './TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 hover:border-primary transition-all hover:shadow-xl">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-6 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <Image
                src={pokemon.sprite}
                alt={pokemon.name}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</span>
              <h3 className="text-xl font-bold capitalize text-gray-900 dark:text-white">{pokemon.name}</h3>
              <div className="ml-auto flex gap-1">
                {pokemon.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 text-center border border-red-200 dark:border-red-800">
                <div className="text-xs font-medium text-red-700 dark:text-red-400 mb-1">HP</div>
                <div className="text-lg font-bold text-red-600 dark:text-red-300">{pokemon.hp}</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 text-center border border-orange-200 dark:border-orange-800">
                <div className="text-xs font-medium text-orange-700 dark:text-orange-400 mb-1">ATK</div>
                <div className="text-lg font-bold text-orange-600 dark:text-orange-300">{pokemon.attack}</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">DEF</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-300">{pokemon.defense}</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center border border-green-200 dark:border-green-800">
                <div className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">SPD</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-300">{pokemon.speed}</div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Power Score</span>
                <span className="text-2xl font-bold text-primary">{pokemon.powerScore}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
