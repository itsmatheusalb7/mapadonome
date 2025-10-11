import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface Step1Props {
  onNext: () => void;
}

export default function Step1_Preloader({ onNext }: Step1Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => onNext(), 2500);
    
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 1;
      });
    }, 20);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-md mx-auto animate-fade-in py-16">
        <h1 className="text-3xl font-bold text-primary">Carregando o Teste</h1>
        <p className="text-foreground/80 mt-2">Analisando as estrelas para você...</p>
        <Progress value={progress} className="w-full h-2 mt-8 bg-primary/20 [&>div]:bg-primary" />
    </div>
  );
}
