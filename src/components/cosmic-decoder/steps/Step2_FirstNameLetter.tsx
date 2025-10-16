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
      title="O QUE O SEU NOME DIZ SOBRE VOCÊ E SEU FUTURO?"
      subtitle="Seu nome pode ser a chave para destravar uma vida de sucesso, amor e prosperidade."
    >
        <div className="bg-black/30 p-6 rounded-lg my-6">
            <p className="text-white mb-4">Uma leitura em vídeo, 100% personalizada e gratuita, está pronta para revelar as verdades ocultas em seu nome!</p>
            <div className="bg-primary text-primary-foreground font-bold text-lg p-3 rounded-md">
                CLIQUE NA 1ª LETRA DO SEU PRIMEIRO NOME
            </div>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 gap-2 justify-center max-w-md mx-auto">
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
