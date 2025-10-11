import { CosmicDecoder } from '@/components/cosmic-decoder/CosmicDecoder';

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-background bg-no-repeat" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.08), transparent 40%),
          radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.08), transparent 40%),
          radial-gradient(circle at 50% 90%, hsl(var(--accent) / 0.05), transparent 50%)
        `
      }} />
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <CosmicDecoder />
    </main>
  );
}
