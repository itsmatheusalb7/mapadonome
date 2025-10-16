import { StepLayout } from '../StepLayout';

interface Step5Props {
    onNext: () => void;
    onBack: () => void;
    setData: (data: { birthDay: number }) => void;
}

const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function Step5_BirthDay({ onNext, onBack, setData }: Step5Props) {

    const handleSelect = (day: number) => {
        setData({ birthDay: day });
        onNext();
    };

    return (
        <StepLayout
            currentStep={4}
            onBack={onBack}
            title="Indique o seu Dia de Nascimento"
        >
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 justify-center max-w-sm mx-auto">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => handleSelect(day)}
                        className="keyboard-key"
                        aria-label={`Dia ${day}`}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </StepLayout>
    );
}
