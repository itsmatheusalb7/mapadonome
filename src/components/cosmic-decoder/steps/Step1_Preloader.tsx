import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';

interface Step1Props {
  onNext: () => void;
}

export default function Step1_Preloader({ onNext }: Step1Props) {
  const [progress, setProgress] = useState(0);
  const animationDuration = 3000; // Total duration in ms

  useEffect(() => {
    // Start the progress animation shortly after the component mounts
    const startTimer = setTimeout(() => {
      setProgress(100);
    }, 100);

    // Navigate to the next step after the animation duration
    const navigateTimer = setTimeout(() => {
      onNext();
    }, animationDuration);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(navigateTimer);
    };
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto animate-fade-in py-16">
      <h1 className="text-2xl font-bold text-white mb-4">Carregando...</h1>
      <Progress 
        value={progress} 
        className="w-full h-2 bg-primary/20" 
        indicatorClassName="bg-primary transition-transform duration-[2900ms] ease-linear" 
      />
    </div>
  );
}
