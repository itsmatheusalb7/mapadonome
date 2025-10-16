import { StepLayout } from '../StepLayout';
import type { FormData } from '@/lib/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { birthYear: number }) => void;
  formData: FormData;
}

export default function Step7_BirthYear({ onNext, onBack, setData, formData }: Step7Props) {
    const decade = formData.birthDecade;
    
    if (!decade) {
        return (
             <StepLayout
                currentStep={6}
                onBack={onBack}
                title="Erro"
            >
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertDescription>
                    Década de nascimento não encontrada. Por favor, volte e selecione sua década.
                  </AlertDescription>
                </Alert>
            </StepLayout>
        );
    }
    
    const years = Array.from({ length: 10 }, (_, i) => decade + i);

    const handleSelect = (year: number) => {
        setData({ birthYear: year });
        onNext();
    };

    return (
        <StepLayout
            currentStep={6}
            onBack={onBack}
            title="Indique a sua Ano de Nascimento"
        >
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 justify-center max-w-lg mx-auto">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => handleSelect(year)}
                        className="h-14 rounded-md border border-primary/20 bg-card/50 text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg focus:bg-primary focus:text-primary-foreground focus:scale-105 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={`Ano ${year}`}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </StepLayout>
    );
}
