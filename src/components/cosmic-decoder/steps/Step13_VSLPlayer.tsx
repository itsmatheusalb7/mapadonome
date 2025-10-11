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
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const scriptAddedRef = useRef(false);

  useEffect(() => {
    // This is a mock for transcript progression since we can't easily get events from youtube iframe.
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 1); // Slower progression
      }, 4500); // ~4.5 seconds interval
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
    let buttonTimer: NodeJS.Timeout;
    if (isPlaying) {
      buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 729000); // 12 minutes and 9 seconds (12 * 60 + 9) * 1000
    }

    return () => {
      if (buttonTimer) {
        clearTimeout(buttonTimer);
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (videoContainerRef.current && !scriptAddedRef.current) {
      const scriptId = 'vturb-player-script';
      
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/68e9c7b7f14b2c1f241cd7e2/v4/player.js";
      script.async = true;
      
      script.onload = () => {
        // We can't directly know when play is clicked, but we can assume it starts soon.
        // A better integration would use player events if the API allows.
        // For now, clicking the transcript box will start the timer.
      };
      
      document.head.appendChild(script);
      scriptAddedRef.current = true; // Mark script as added

      // No cleanup of script tag to prevent re-adding on re-renders,
      // as Vturb script might handle its own state.
    }
  }, []);
  
  const currentTranscript = transcript.find(item => currentTime >= item.start && currentTime < item.end)?.text.replace('[desafio]', formData.challenge || 'seu desafio atual');

  const handlePurchase = () => {
    window.location.href = 'https://pay.hotmart.com/M88827540R';
  };

  const handleTranscriptClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-center text-xl font-bold text-white mb-4">
          ⚠️ Atenção, {formData.firstName || 'visitante'}
        </h2>
        <div className="aspect-video w-full relative" ref={videoContainerRef}>
          <vturb-smartplayer 
              id="vid-68e9c7b7f14b2c1f241cd7e2" 
              style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px'}}>
          </vturb-smartplayer>
        </div>

        {showButton && (
          <div className='text-center pt-4 animate-fade-in'>
            <Button
              size="lg"
              className="text-lg sm:text-xl h-14 shadow-lg animate-pulse font-bold px-20"
              style={{ backgroundColor: '#d1b37d', color: '#000000' }}
              onClick={handlePurchase}
            >
              COMPRAR AGORA
            </Button>
          </div>
        )}

        <div className="bg-black/50 border-2 border-primary backdrop-blur-sm rounded-xl p-4 min-h-[100px] flex items-center justify-center text-center">
          <p className="text-primary text-base sm:text-lg font-semibold tracking-wide" onClick={handleTranscriptClick}>
            {currentTranscript || "Clique no play para iniciar sua leitura em vídeo e a transcrição."}
          </p>
        </div>

      </div>
    </div>
  );
}
