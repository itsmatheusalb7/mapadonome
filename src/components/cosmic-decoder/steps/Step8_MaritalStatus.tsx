import { StepLayout } from '../StepLayout';
import { MARITAL_STATUS_OPTIONS } from '@/lib/constants';

interface Step8Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { maritalStatus: string }) => void;
}

export default function Step8_MaritalStatus({ onNext, onBack, setData }: Step8Props) {
    const handleSelect = (status: string) => {
        setData({ maritalStatus: status });
        onNext();
    };

    return (
        <StepLayout
            currentStep={7}
            onBack={onBack}
            title="Quel est votre État Civil ?"
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center max-w-lg mx-auto">
                {MARITAL_STATUS_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => handleSelect(option.value)}
                        className="h-16 flex items-center justify-center gap-2 rounded-md border border-primary/20 bg-card/50 text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg focus:bg-primary focus:text-primary-foreground focus:scale-105 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={option.label}
                    >
                        <option.icon size={20} />
                        <span>{option.label}</span>
                    </button>
                ))}
            </div>
        </StepLayout>
    );
}
