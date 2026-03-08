'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronLeft, ChevronRight, X, ChevronDown, Filter, SlidersHorizontal, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import TypeBadge from './TypeBadge';
import type { Pokemon } from '@/app/api/actions/pokemon';
import { getPokemonById } from '@/app/api/actions/pokemon';
import { isSuccessResponse } from '@/lib/api-responses';
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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  
  // Local state for advanced filters
  const [advancedFilters, setAdvancedFilters] = useState({
    minHp: searchParams.get('minHp') || '',
    maxHp: searchParams.get('maxHp') || '',
    minAttack: searchParams.get('minAttack') || '',
    maxAttack: searchParams.get('maxAttack') || '',
    minDefense: searchParams.get('minDefense') || '',
    maxDefense: searchParams.get('maxDefense') || '',
    minSpeed: searchParams.get('minSpeed') || '',
    maxSpeed: searchParams.get('maxSpeed') || '',
    minPower: searchParams.get('minPower') || '',
    maxPower: searchParams.get('maxPower') || '',
  });
  
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const currentType = searchParams.get('type') || '';
  const currentSort = searchParams.get('sortBy') || 'id';
  const currentLimit = searchParams.get('limit') || '20';

  const applyAdvancedFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(advancedFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.set('page', '1');
    
    startTransition(() => {
      router.push(`/pokemon?${params.toString()}`);
    });
  };

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      minHp: '',
      maxHp: '',
      minAttack: '',
      maxAttack: '',
      minDefense: '',
      maxDefense: '',
      minSpeed: '',
      maxSpeed: '',
      minPower: '',
      maxPower: '',
    });
  };

  const hasAdvancedFilters = Object.values(advancedFilters).some(v => v !== '');

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

  const handleViewPokemon = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoadingDetail(true);
    setIsDialogOpen(true);
    const response = await getPokemonById(id);
    if (isSuccessResponse(response)) {
      setSelectedPokemon(response.data!);
    }
    setIsLoadingDetail(false);
  };

  const hasFilters = searchValue || currentType || currentSort !== 'id' || currentLimit !== '20';

  return (
    <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-2 border-gray-200 dark:border-blue-400/20 shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
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

              <Select value={currentLimit} onValueChange={(value) => updateFilters('limit', value)}>
                <SelectTrigger className="w-[120px] h-9 rounded-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => setShowAdvanced(!showAdvanced)} 
                className="h-9 px-3 rounded-full"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Advanced
              </Button>

              {hasFilters && (
                <Button variant="outline" onClick={clearFilters} disabled={isPending} className="h-9 px-3 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {showAdvanced && (
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl border-2 border-blue-200 dark:border-blue-400/30">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Min HP</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={advancedFilters.minHp}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minHp: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Max HP</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="255"
                    value={advancedFilters.maxHp}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxHp: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Min Attack</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={advancedFilters.minAttack}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minAttack: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Max Attack</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="255"
                    value={advancedFilters.maxAttack}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxAttack: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Min Defense</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={advancedFilters.minDefense}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minDefense: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Max Defense</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="255"
                    value={advancedFilters.maxDefense}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxDefense: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Min Speed</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={advancedFilters.minSpeed}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minSpeed: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Max Speed</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="255"
                    value={advancedFilters.maxSpeed}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxSpeed: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Min Power</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={advancedFilters.minPower}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, minPower: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Max Power</label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="1000"
                    value={advancedFilters.maxPower}
                    onChange={(e) => setAdvancedFilters(prev => ({ ...prev, maxPower: e.target.value }))}
                    className="h-9 bg-white dark:bg-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearAdvancedFilters}
                  disabled={!hasAdvancedFilters || isPending}
                  className="h-8"
                >
                  Clear
                </Button>
                <Button 
                  size="sm"
                  onClick={applyAdvancedFilters}
                  disabled={isPending}
                  className="h-8 bg-blue-600 hover:bg-blue-700"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
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
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('hp')}>
                      <div className="flex items-center justify-center gap-1">
                        HP
                        {currentSort === 'hp' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('attack')}>
                      <div className="flex items-center justify-center gap-1">
                        ATK
                        {currentSort === 'attack' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('defense')}>
                      <div className="flex items-center justify-center gap-1">
                        DEF
                        {currentSort === 'defense' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('speed')}>
                      <div className="flex items-center justify-center gap-1">
                        SPD
                        {currentSort === 'speed' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer font-semibold text-gray-700 dark:text-gray-300" onClick={() => handleSort('powerScore')}>
                      <div className="flex items-center gap-1">
                        Power
                        {currentSort === 'powerScore' && <ChevronDown className="h-4 w-4" />}
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialPokemon.map((pokemon) => (
                    <TableRow key={pokemon.id} className="bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200 cursor-pointer" onClick={() => router.push(`/pokemon/${pokemon.id}`)}>
                      <TableCell>
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-1">
                          {pokemon.sprite ? (
                            <Image src={pokemon.sprite} alt={pokemon.name} fill className="object-contain" unoptimized />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">?</div>
                          )}
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
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => handleViewPokemon(pokemon.id, e)}
                          className="rounded-full"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-blue-400/20">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Showing {((page - 1) * parseInt(currentLimit)) + 1}-{Math.min(page * parseInt(currentLimit), total)} of {total} Pokémon
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl">
          <DialogTitle className="sr-only">Pokémon Details</DialogTitle>
          {isLoadingDetail ? (
            <div className="text-center py-12">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          ) : selectedPokemon ? (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-2">
                  {selectedPokemon.sprite ? (
                    <Image src={selectedPokemon.sprite} alt={selectedPokemon.name} fill className="object-contain" unoptimized />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">?</div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-lg font-bold text-gray-500 dark:text-gray-400">#{selectedPokemon.id.toString().padStart(3, '0')}</span>
                    <h2 className="text-3xl font-bold capitalize text-gray-900 dark:text-white">{selectedPokemon.name}</h2>
                  </div>
                  <div className="flex gap-2">
                    {selectedPokemon.types.map((type) => (
                      <TypeBadge key={type} type={type} />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Power Score</p>
                  <p className="text-4xl font-bold text-primary">{selectedPokemon.powerScore}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Base Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">HP</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPokemon.hp}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(selectedPokemon.hp / 255) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Attack</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPokemon.attack}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(selectedPokemon.attack / 255) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Defense</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPokemon.defense}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(selectedPokemon.defense / 255) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Speed</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedPokemon.speed}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(selectedPokemon.speed / 255) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Stats Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stats</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {selectedPokemon.hp + selectedPokemon.attack + selectedPokemon.defense + selectedPokemon.speed}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Stat</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round((selectedPokemon.hp + selectedPokemon.attack + selectedPokemon.defense + selectedPokemon.speed) / 4)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest Stat</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.max(selectedPokemon.hp, selectedPokemon.attack, selectedPokemon.defense, selectedPokemon.speed)}
                      </span>
                    </div>
                    <div className="flex justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Lowest Stat</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.min(selectedPokemon.hp, selectedPokemon.attack, selectedPokemon.defense, selectedPokemon.speed)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
