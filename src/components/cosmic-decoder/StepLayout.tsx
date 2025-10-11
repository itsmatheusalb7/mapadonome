import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BackButton } from './BackButton';
import { TOTAL_STEPS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StepLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  currentStep: number;
  title: string;
  subtitle?: string;
  className?: string;
}

export function StepLayout({ children, onBack, currentStep, title, subtitle, className }: StepLayoutProps) {
  const progressValue = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
        <Card className={cn("bg-black/50 backdrop-blur-sm border-2 border-gray-800 shadow-2xl shadow-primary/10 rounded-xl relative", className)}>
            
            {onBack && <BackButton onBack={onBack} />}

            <CardContent className="p-6 md:p-10 text-center">
                <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide">{title}</h1>
                {subtitle && <p className="mt-4 text-base md:text-lg text-gray-300 max-w-lg mx-auto">{subtitle}</p>}
                
                <div className="mt-8">
                    {children}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
