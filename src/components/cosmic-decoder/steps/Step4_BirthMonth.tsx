import { StepLayout } from '../StepLayout';
import { MONTHS } from '@/lib/constants';

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { birthMonth: string }) => void;
}

export default function Step4_BirthMonth({ onNext, onBack, setData }: Step4Props) {
    const handleSelect = (month: string) => {
        setData({ birthMonth: month });
        onNext();
    };

    return (
        <StepLayout
            currentStep={3}
            onBack={onBack}
            title="Indique o seu Mês de Nascimento"
        >
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 justify-center max-w-lg mx-auto">
                {MONTHS.map((month) => (
                    <button
                        key={month}
                        onClick={() => handleSelect(month)}
                        className="h-14 rounded-md border border-primary/20 bg-card/50 text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg focus:bg-primary focus:text-primary-foreground focus:scale-105 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        aria-label={month}
                    >
                        {month}
                    </button>
                ))}
            </div>
        </StepLayout>
    );
}
