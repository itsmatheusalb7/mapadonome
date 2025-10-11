import { StepLayout } from '../StepLayout';

interface Step2Props {
  onNext: () => void;
  setData: (data: { firstLetter: string }) => void;
}

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export default function Step2_FirstNameLetter({ onNext, setData }: Step2Props) {
  
  const handleSelect = (letter: string) => {
    setData({ firstLetter: letter });
    onNext();
  };

  return (
    <StepLayout
      currentStep={1}
      title="O QUE SEU NOME DIZ SOBRE VOCÊ E SEU FUTURO?"
      subtitle="Seu nome pode ser a chave para desbloquear uma vida de sucesso, amor e prosperidade."
    >
        <p className="text-foreground/90 mb-6">Uma leitura em vídeo, 100% personalizada e gratuita, está pronta para revelar as verdades escondidas no seu nome!</p>
        <p className="text-lg font-semibold text-primary mb-4 uppercase">Clique na 1ª letra do seu nome</p>
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-2 justify-center max-w-sm mx-auto">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => handleSelect(letter)}
                    className="keyboard-key"
                    aria-label={`Letra ${letter}`}
                >
                    {letter}
                </button>
            ))}
        </div>
    </StepLayout>
  );
}
