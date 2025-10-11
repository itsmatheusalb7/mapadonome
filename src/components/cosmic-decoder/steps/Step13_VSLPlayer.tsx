'use client'

import { useState, useEffect, useRef } from 'react';
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
  const [showButton, setShowButton] = useState(false);
  const { transcript } = transcriptData as { transcript: TranscriptItem[] };
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // This is a mock for transcript progression since we can't easily get events from youtube iframe.
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 0.5);
      }, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 10000); // 10 seconds for testing

    return () => {
      clearTimeout(buttonTimer);
    };
  }, []);
  
  const currentTranscript = transcript.find(item => currentTime >= item.start && currentTime < item.end)?.text.replace('[desafio]', formData.challenge || 'seu desafio atual');

  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/M88827540R';
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>
        <div className="aspect-video w-full relative">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/B5j6GPSP8PI?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsPlaying(true)}
          ></iframe>
        </div>

        {showButton && (
          <div className='text-center pt-4 animate-fade-in'>
            <Button
              size="lg"
              className="text-lg sm:text-xl h-12 sm:h-14 shadow-lg animate-pulse font-bold px-20"
              style={{ backgroundColor: '#d1b37d', color: '#000000' }}
              onClick={handlePurchase}
            >
              COMPRAR AGORA
            </Button>
          </div>
        )}

        <div className="bg-black/50 border-2 border-primary backdrop-blur-sm rounded-xl p-4 min-h-[100px] flex items-center justify-center text-center">
          <p className="text-primary text-base sm:text-lg font-semibold tracking-wide" onClick={() => setIsPlaying(!isPlaying)}>
            {currentTranscript || "Clique no play para iniciar sua leitura em vídeo."}
          </p>
        </div>

      </div>
    </div>
  );
}
