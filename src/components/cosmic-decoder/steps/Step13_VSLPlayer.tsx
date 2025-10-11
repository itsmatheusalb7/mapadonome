'use client'

import { useState, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface Step13Props {
  formData: FormData & { summary?: string };
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [showButton, setShowButton] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
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
      // Wistia player scripts
      const playerScript = document.createElement('script');
      playerScript.src = "https://fast.wistia.com/player.js";
      playerScript.async = true;

      const embedScript = document.createElement('script');
      embedScript.src = "https://fast.wistia.com/embed/0so9zkutl0.js";
      embedScript.async = true;
      embedScript.type = "module";
      
      document.head.appendChild(playerScript);
      document.head.appendChild(embedScript);

      return () => {
        // Clean up scripts on component unmount
        const scripts = document.querySelectorAll('script[src*="wistia.com"]');
        scripts.forEach(s => s.remove());
      };
    }
  }, [isClient]);


  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/M88827540R';
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>

        <div className="aspect-video w-full relative bg-black rounded-lg flex items-center justify-center">
            {isClient ? (
                 <div className="wistia_embed wistia_async_0so9zkutl0" style={{height:'100%', width:'100%', position: 'relative'}}>&nbsp;</div>
            ) : (
                <div className="text-white">Carregando player...</div>
            )}
        </div>

        <div className="bg-black/50 border-2 border-primary backdrop-blur-sm rounded-xl p-4 min-h-[100px] flex items-center justify-center text-center">
          <p className="text-primary text-base sm:text-lg font-semibold tracking-wide">
             Antes de continuar eu preciso te alertar, essa leitura não pode ser repetida, Não saia dessa página!
          </p>
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
      </div>
    </div>
  );
}
