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
        <h1 className="text-2xl font-bold text-white mb-4">Carregando...</h1>
        <Progress value={progress} className="w-full h-2 bg-primary/20" indicatorClassName="bg-primary" />
    </div>
  );
}
