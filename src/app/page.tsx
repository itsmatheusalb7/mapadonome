import { CosmicDecoder } from '@/components/cosmic-decoder/CosmicDecoder';
import { DynamicUserCounter } from '@/components/cosmic-decoder/DynamicUserCounter';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 overflow-hidden bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      <DynamicUserCounter />
      <div className="relative z-10 w-full">
        <CosmicDecoder />
      </div>
    </main>
  );
}
