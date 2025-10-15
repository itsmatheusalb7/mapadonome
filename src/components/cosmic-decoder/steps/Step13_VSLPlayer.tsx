'use client'

import { useState, useEffect, useRef } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface Step13Props {
  formData: FormData & { summary?: string };
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [showButton, setShowButton] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, (12 * 60 + 9) * 1000); // 12 minutos e 9 segundos

    const container = videoContainerRef.current;
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    // Create style element
    const style = document.createElement('style');
    style.textContent = `wistia-player[media-id='5ntt9prua0']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/5ntt9prua0/swatch'); display: block; filter: blur(5px); padding-top:178.06%; }`;
    
    // Create wistia-player element
    const playerElement = document.createElement('wistia-player');
    playerElement.setAttribute('media-id', '5ntt9prua0');
    playerElement.setAttribute('aspect', '0.5616224648985959');

    container.appendChild(style);
    container.appendChild(playerElement);

    // Create and append scripts
    const playerScript = document.createElement('script');
    playerScript.src = "https://fast.wistia.com/player.js";
    playerScript.async = true;
    
    const embedScript = document.createElement('script');
    embedScript.src = "https://fast.wistia.com/embed/5ntt9prua0.js";
    embedScript.async = true;
    embedScript.type = 'module';
    
    document.head.appendChild(playerScript);
    document.head.appendChild(embedScript);

    return () => {
      clearTimeout(buttonTimer);
      // Clean up scripts to avoid duplicates on re-render
      const scripts = document.head.querySelectorAll('script[src^="https://fast.wistia.com"]');
      scripts.forEach(s => s.remove());
    };
  }, [isClient]);


  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/U102400458G?checkoutMode=10&bid=1760498781270';
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>

        <div ref={videoContainerRef} className="aspect-video w-full relative bg-black rounded-lg flex items-center justify-center">
            {!isClient && <div className="text-white">Carregando player...</div>}
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
