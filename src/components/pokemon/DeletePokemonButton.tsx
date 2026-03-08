'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deletePokemon } from '@/app/api/actions/delete-pokemon';
import { isSuccessResponse } from '@/lib/api-responses';
import { toast } from '@/lib/toast';
import { useRouter } from 'next/navigation';

interface DeletePokemonButtonProps {
  pokemonId: number;
  pokemonName: string;
}

export default function DeletePokemonButton({ pokemonId, pokemonName }: DeletePokemonButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsDeleting(true);
    const response = await deletePokemon([pokemonId]);

    if (isSuccessResponse(response)) {
      toast.success(`${pokemonName} deleted successfully`);
      router.refresh();
    } else {
      toast.error('Failed to delete Pokemon');
    }
    
    setIsDeleting(false);
    setShowConfirm(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-7 px-2 text-xs"
        >
          Confirm
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
          disabled={isDeleting}
          className="h-7 px-2 text-xs"
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleDelete}
      disabled={isDeleting}
      className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
    >
      <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
    </Button>
  );
}
