import { StepLayout } from '../StepLayout';
import { CHALLENGE_OPTIONS } from '@/lib/constants';

interface Step9Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { challenge: string }) => void;
}

export default function Step9_Challenge({ onNext, onBack, setData }: Step9Props) {
    const handleSelect = (challenge: string) => {
        setData({ challenge: challenge });
        onNext();
    };

    return (
        <StepLayout
            currentStep={8}
            onBack={onBack}
            title="Qual maior desafio da sua vida no momento?"
        >
            <div className="grid grid-cols-2 gap-3 justify-center max-w-lg mx-auto">
                {CHALLENGE_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className="h-20 flex items-center justify-center gap-2 rounded-md border border-primary/20 bg-card/50 text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg focus:bg-primary focus:text-primary-foreground focus:scale-105 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={option.label}
                    >
                        <option.icon size={24} />
                        <span className="text-lg">{option.label}</span>
                    </button>
                ))}
            </div>
        </StepLayout>
    );
}
