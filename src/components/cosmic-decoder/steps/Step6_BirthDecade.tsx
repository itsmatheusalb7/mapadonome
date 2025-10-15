import { StepLayout } from '../StepLayout';
import { DECADES } from '@/lib/constants';

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { birthDecade: number }) => void;
}

export default function Step6_BirthDecade({ onNext, onBack, setData }: Step6Props) {
    const handleSelect = (decade: number) => {
        setData({ birthDecade: decade });
        onNext();
    };

    return (
        <StepLayout
            currentStep={5}
            onBack={onBack}
            title="Indiquez votre Décennie de Naissance"
        >
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 justify-center max-w-lg mx-auto">
                {DECADES.map((decade) => (
                    <button
                        key={decade}
                        onClick={() => handleSelect(decade)}
                        className="h-14 rounded-md border border-primary/20 bg-card/50 text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg focus:bg-primary focus:text-primary-foreground focus:scale-105 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={`Décennie ${decade}`}
                    >
                        {decade}
                    </button>
                ))}
            </div>
        </StepLayout>
    );
}
