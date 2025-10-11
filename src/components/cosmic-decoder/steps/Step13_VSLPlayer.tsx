'use client'

import { useState, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Video } from 'lucide-react';

interface Step13Props {
  formData: FormData & { summary?: string };
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [showButton, setShowButton] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const videoId = "68e9c7b7f14b2c1f241cd7e2";

  useEffect(() => {
    setIsClient(true);
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, (12 * 60 + 9) * 1000); // 12 minutos e 9 segundos

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);

  useEffect(() => {
    if (isClient) {
      if (document.querySelector(`script[src*="${videoId}"]`)) {
        return;
      }
      const script = document.createElement('script');
      script.src = `https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/${videoId}/v4/player.js`;
      script.async = true;
      document.head.appendChild(script);

      return () => {
        // Opcional: remover o script ao desmontar o componente
        const scriptToRemove = document.querySelector(`script[src*="${videoId}"]`);
        if (scriptToRemove) {
          // document.head.removeChild(scriptToRemove);
        }
      };
    }
  }, [isClient, videoId]);

  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/M88827540R';
  };
  
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>

        <div className="aspect-video w-full relative bg-black rounded-lg flex items-center justify-center">
          {isClient ? (
            isProduction ? (
              <div id={`vid-${videoId}`} style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '800px' }}></div>
            ) : (
              <Alert className="max-w-md mx-auto bg-gray-900 border-primary/50">
                <Video className="h-5 w-5 text-primary" />
                <AlertTitle className="text-white font-bold">VSL indisponível no modo de pré-visualização</AlertTitle>
                <AlertDescription className="text-gray-300">
                  O vídeo só pode ser carregado no domínio oficial. Por favor, publique o site para visualizar o VSL corretamente. Isso ocorre para garantir a segurança e o correto funcionamento do player de vídeo.
                </AlertDescription>
              </Alert>
            )
          ) : (
            <div className="text-white">Carregando player...</div>
          )}
        </div>

        {showButton && (
          <div className='text-center pt-4 animate-fade-in'>
            <Button
              size="lg"
              className="text-lg sm:text-xl h-14 shadow-lg animate-pulse font-bold w-full max-w-md"
              style={{ backgroundColor: '#d1b37d', color: '#000000' }}
              onClick={handlePurchase}
            >
              COMPRAR AGORA
            </Button>
          </div>
        )}

        <div className="bg-black/50 border-2 border-primary backdrop-blur-sm rounded-xl p-4 min-h-[100px] flex items-center justify-center text-center">
          <p className="text-primary text-base sm:text-lg font-semibold tracking-wide">
             Antes de continuar eu preciso te alertar, essa leitura não pode ser repetida, Não saia dessa página!
          </p>
        </div>
      </div>
    </div>
  );
}
