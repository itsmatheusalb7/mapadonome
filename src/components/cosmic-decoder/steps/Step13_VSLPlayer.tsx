'use client'

import { useState, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Script from 'next/script';

interface Step13Props {
  formData: FormData & { summary?: string };
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    let buttonTimer: NodeJS.Timeout;
    
    const checkPlayer = () => {
        // @ts-ignore
        if (window.player) {
            // @ts-ignore
            window.player.on('play', () => {
                buttonTimer = setTimeout(() => {
                    setShowButton(true);
                }, (12 * 60 + 9) * 1000); // 12 minutes and 9 seconds
            });
            // @ts-ignore
            if (window.player.play) {
                // @ts-ignore
                window.player.play();
            }
        }
    }

    const intervalId = setInterval(() => {
        // @ts-ignore
        if (window.player) {
            clearInterval(intervalId);
            checkPlayer();
        }
    }, 100);

    return () => {
      if (buttonTimer) clearTimeout(buttonTimer);
      clearInterval(intervalId);
    };
  }, []);
  
  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/M88827540R';
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
        <Script
          src="https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/68e9c7b7f14b2c1f241cd7e2/v4/player.js"
          strategy="lazyOnload"
          onLoad={() => {
            const intervalId = setInterval(() => {
                // @ts-ignore
                if (window.player) {
                    clearInterval(intervalId);
                    // @ts-ignore
                    window.player.play();
                }
            }, 100);
          }}
        />
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>
        <div id="video-container" className="aspect-video w-full relative">
             <div
                id="vid-68e9c7b7f14b2c1f241cd7e2"
                style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '100%', aspectRatio: '16/9'}}
                data-v-838ef529-b5af-4571-b974-3f233f46f302="true"
                data-options="autoplay=true"
            ></div>
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
