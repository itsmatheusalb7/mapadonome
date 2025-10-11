'use client'

import { useState, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import transcriptData from '@/lib/transcript.json';

interface Step13Props {
  formData: FormData & { summary?: string };
}

interface TranscriptItem {
  start: number;
  end: number;
  text: string;
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const { transcript } = transcriptData as { transcript: TranscriptItem[] };
  
  useEffect(() => {
    // Carrega o script do player da Vturb
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/68e9c7b7f14b2c1f241cd7e2/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    // Timer para mostrar o botão de CTA
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 10000); // 10 segundos em milissegundos

    // Simula a progressão da VSL para a transcrição
    const interval = setInterval(() => {
      setCurrentTime(prev => prev + 0.1);
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(buttonTimer);
      // Opcional: remover o script quando o componente for desmontado
      const existingScript = document.querySelector('script[src="https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/68e9c7b7f14b2c1f241cd7e2/v4/player.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
            ⚠️ Atenção, {formData.firstName}
        </h2>
        <div className="aspect-[9/16] w-full relative">
          <div
              id="vid-68e9c7b7f14b2c1f241cd7e2"
              style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px', height: '100%' }}
          ></div>
        </div>
        
        <div className="bg-black/50 border-2 border-primary backdrop-blur-sm rounded-xl p-4 min-h-[80px] flex items-center justify-center text-center">
            <p className="text-primary text-base sm:text-lg font-semibold tracking-wide">
                {
                    transcript.find(item => currentTime >= item.start && currentTime < item.end)?.text.replace('[desafio]', formData.challenge || 'seu desafio atual') 
                    || "Continue assistindo para descobrir como alinhar sua energia e manifestar a vida que você deseja."
                }
            </p>
        </div>
        
        {showButton && (
            <div className='text-center pt-4 animate-fade-in'>
                <Button 
                  size="lg" 
                  className="text-lg sm:text-xl h-12 sm:h-14 shadow-lg animate-pulse"
                  style={{ backgroundColor: '#d1b37d', color: '#000000' }}
                >
                    Acessar Mapa do Nome AGORA!
                </Button>
            </div>
        )}

      </div>
    </div>
  );
}
