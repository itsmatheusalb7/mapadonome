'use client'

import { useState, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface Step13Props {
  formData: FormData & { summary?: string };
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [showButton, setShowButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let buttonTimer: NodeJS.Timeout;
    
    // This is a simplified play detection. The user must click the video.
    const handlePlay = () => {
      if (!isPlaying) {
        setIsPlaying(true);
      }
    };
    
    // The YouTube Iframe API would be needed for reliable play detection.
    // For now, we assume a click on the container is a play attempt.
    const videoContainer = document.getElementById('video-container');
    videoContainer?.addEventListener('click', handlePlay);

    if (isPlaying) {
      // Show button after 12 minutes and 9 seconds
      buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, (12 * 60 + 9) * 1000); 
    }

    return () => {
      if (buttonTimer) {
        clearTimeout(buttonTimer);
      }
      videoContainer?.removeEventListener('click', handlePlay);
    };
  }, [isPlaying]);

  
  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/M88827540R';
  };

  const videoId = "KsymdlfpnS4";

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>
        <div id="video-container" className="aspect-video w-full relative">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
            ></iframe>
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
