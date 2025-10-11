"use client";

import { StepLayout } from '../StepLayout';
import { Card } from '@/components/ui/card';
import { PersonStanding } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { gender: 'male' | 'female' }) => void;
  formData: { gender?: 'male' | 'female' };
}

export default function Step3_Gender({ onNext, onBack, setData, formData }: Step3Props) {
  const handleSelect = (gender: 'male' | 'female') => {
    setData({ gender });
    onNext();
  };

  return (
    <StepLayout
      currentStep={2}
      onBack={onBack}
      title="Clique no seu Sexo:"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Card
          onClick={() => handleSelect('male')}
          className={cn(
            "p-8 flex-1 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 border-2 border-primary/20 hover:border-primary hover:bg-primary/10",
            formData.gender === 'male' && "border-primary bg-primary/10"
          )}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect('male')}
        >
          <Image src="/male-icon.png" alt="Homem" width={48} height={48} style={{ filter: 'brightness(0) invert(1)' }}/>
          <span className="text-lg font-semibold">Homem</span>
        </Card>
        <Card
          onClick={() => handleSelect('female')}
          className={cn(
            "p-8 flex-1 flex flex-col items-center gap-4 cursor-pointer transition-all duration-200 border-2 border-primary/20 hover:border-primary hover:bg-primary/10",
            formData.gender === 'female' && "border-primary bg-primary/10"
          )}
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect('female')}
        >
          <PersonStanding size={48} className="text-primary" />
          <span className="text-lg font-semibold">Mulher</span>
        </Card>
      </div>
    </StepLayout>
  );
}
