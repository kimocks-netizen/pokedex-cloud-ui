import { AppLayout } from '@/components/layout/AppLayout';
import { Spinner } from '@/components/loaders';

export default function PokemonLoading() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    </AppLayout>
  );
}
