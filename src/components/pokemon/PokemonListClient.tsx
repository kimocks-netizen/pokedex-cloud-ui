'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, X, ChevronDown, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import TypeBadge from './TypeBadge';
import type { Pokemon } from '@/app/api/actions/pokemon';
import Image from 'next/image';

interface PokemonListClientProps {
  initialPokemon: Pokemon[];
  total: number;
  page: number;
  totalPages: number;
  types: string[];
}

export default function PokemonListClient({ initialPokemon, total, page, totalPages, types }: PokemonListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const currentType = searchParams.get('type') || '';
  const currentSort = searchParams.get('sortBy') || 'id';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.set('page', '1');
    
    startTransition(() => {
      router.push(`/pokemon?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearchValue('');
    startTransition(() => {
      router.push('/pokemon');
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    
    startTransition(() => {
      router.push(`/pokemon?${params.toString()}`);
    });
  };

  const handleSort = (field: string) => {
    updateFilters('sortBy', field);
  };

  const hasFilters = searchValue || currentType || currentSort !== 'id';

  return (
    <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-2 border-gray-200 dark:border-blue-400/20 shadow-xl rounded-2xl">
      <CardHeader className="pb-4 border-b border-gray-200 dark:border-blue-400/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Pokémon Database</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">Browse and search through all Pokémon</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Pokémon..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9 w-[200px] h-9 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <Select value={currentType} onValueChange={(value) => updateFilters('type', value)}>
                <SelectTrigger className="w-[150px] h-9 rounded-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasFilters && (
                <Button variant="outline" onClick={clearFilters} disabled={isPending} className="h-9 px-3 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {isPending && (
          <div className="text-center py-16">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading Pokémon...</p>
          </div>
        )}

        {!isPending && initialPokemon.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No Pokémon found</p>
            {hasFilters && (
              <Button onClick={clearFilters} className="mt-4" variant="outline">
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {!isPending && initialPokemon.length > 0 && (
          <>
            <div className="rounded-xl border-2 border-gray-200 dark:border-blue-400/20 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50">
                  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <TableHead className="w-[70px] font-semibold text-gray-700 dark:text-gray-300">Avatar</TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('id')}>
                      <div className="flex items-center gap-1">
                        ID
                        {currentSort === 'id' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-1">
                        Name
                        {currentSort === 'name' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300">Types</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">HP</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">ATK</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">DEF</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700 dark:text-gray-300">SPD</TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('powerScore')}>
                      <div className="flex items-center gap-1">
                        Power
                        {currentSort === 'powerScore' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialPokemon.map((pokemon) => (
                    <TableRow key={pokemon.id} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => router.push(`/pokemon/${pokemon.id}`)}>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-1">
                          <Image src={pokemon.sprite} alt={pokemon.name} fill className="object-contain" unoptimized />
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-gray-600 dark:text-gray-400">#{pokemon.id.toString().padStart(3, '0')}</TableCell>
                      <TableCell className="font-bold text-gray-900 dark:text-white capitalize text-base">{pokemon.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {pokemon.types.map((type) => (
                            <TypeBadge key={type} type={type} />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-bold text-gray-900 dark:text-white">{pokemon.hp}</TableCell>
                      <TableCell className="text-center font-bold text-gray-900 dark:text-white">{pokemon.attack}</TableCell>
                      <TableCell className="text-center font-bold text-gray-900 dark:text-white">{pokemon.defense}</TableCell>
                      <TableCell className="text-center font-bold text-gray-900 dark:text-white">{pokemon.speed}</TableCell>
                      <TableCell className="font-bold text-primary text-lg">{pokemon.powerScore}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-blue-400/20">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Showing {((page - 1) * 20) + 1}-{Math.min(page * 20, total)} of {total} Pokémon
              </p>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || isPending}
                  onClick={() => updateFilters('page', String(page - 1))}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-white">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || isPending}
                  onClick={() => updateFilters('page', String(page + 1))}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
