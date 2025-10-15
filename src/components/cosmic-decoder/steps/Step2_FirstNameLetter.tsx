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
      title="QUE DIT VOTRE NOM SUR VOUS ET VOTRE AVENIR ?"
      subtitle="Votre nom pourrait être la clé pour débloquer une vie de succès, d'amour et de prospérité."
    >
        <div className="bg-black/30 p-6 rounded-lg my-6">
            <p className="text-white mb-4">Une lecture vidéo, 100% personnalisée et gratuite, est prête à révéler les vérités cachées dans votre nom !</p>
            <div className="bg-primary text-primary-foreground font-bold text-lg p-3 rounded-md">
                CLIQUEZ SUR LA 1ÈRE LETTRE DE VOTRE PRÉNOM
            </div>
        </div>
        <div className="grid grid-cols-6 sm:grid-cols-7 md:grid-cols-9 gap-2 justify-center max-w-md mx-auto">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => handleSelect(letter)}
                    className="keyboard-key"
                    aria-label={`Lettre ${letter}`}
                >
                    {letter}
                </button>
            ))}
        </div>
    </StepLayout>
  );
}
