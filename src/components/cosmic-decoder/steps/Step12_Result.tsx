import { StepLayout } from '../StepLayout';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { getPersonalizedSummaryAction } from '@/app/actions';

interface Step12Props {
  onNext: () => void;
  onBack: () => void;
  setData: (data: { summary?: string }) => void;
  formData: FormData;
}

export default function Step12_Result({ onNext, onBack, setData, formData }: Step12Props) {
  
  const handleStart = () => {
    if (formData.firstName && formData.birthMonth && formData.birthDay) {
      // We are not awaiting this anymore to make it faster
      getPersonalizedSummaryAction({
        firstName: formData.firstName,
        birthMonth: formData.birthMonth,
        birthDay: String(formData.birthDay),
      }).then(summary => {
        setData({ summary });
      });
    }
    onNext();
  };

  return (
    <StepLayout
      currentStep={10}
      onBack={onBack}
      title={`Resultado para ${formData.firstName || 'Você'}`}
      className="max-w-3xl"
    >
      <div className="space-y-6">
        <p className="text-lg text-foreground/80">Sua leitura em vídeo personalizada e gratuita está pronta.</p>
        <p className="text-xl font-semibold text-primary">Por favor, aumente o volume para ouvir a apresentação e clique no botão abaixo.</p>
        <Button 
          onClick={handleStart} 
          size="lg" 
          className="w-full max-w-xs mx-auto text-xl h-14 bg-primary text-primary-foreground hover:bg-accent"
        >
          Começar
        </Button>
      </div>
    </StepLayout>
  );
}
