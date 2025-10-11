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

const VTURB_SCRIPT_ID = "vturb-player-script";
const VTURB_PLAYER_ID = "vid-68e9c7b7f14b2c1f241cd7e2";

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [currentTime, setCurrentTime] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const { transcript } = transcriptData as { transcript: TranscriptItem[] };

  useEffect(() => {
    (window as any).onVturbVideoPlay = () => {
      setIsPlaying(true);
    };

    const loadVturbScript = () => {
      if (document.getElementById(VTURB_SCRIPT_ID)) {
          // If script is already there, maybe it failed to load, try removing and re-adding
          const existingScript = document.getElementById(VTURB_SCRIPT_ID);
          existingScript?.remove();
      }

      const script = document.createElement("script");
      script.id = VTURB_SCRIPT_ID;
      script.src = "https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/68e9c7b7f14b2c1f241cd7e2/v4/player.js";
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
          // Script loaded
      };
      script.onerror = () => {
          console.error("Vturb script failed to load.");
      }

      document.body.appendChild(script);
    }
    
    loadVturbScript();

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 10000);

    return () => {
      clearTimeout(buttonTimer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      delete (window as any).onVturbVideoPlay;
      
      const existingScript = document.getElementById(VTURB_SCRIPT_ID);
      if (existingScript) {
        // It's tricky to completely clean up third-party scripts.
        // For Vturb, simply removing the script tag might be enough.
        // existingScript.remove();
      }
      
      if ((window as any).vturb) {
          try {
              // If vturb player instance has a destroy method
              // (window as any).vturb?.players?.[VTURB_PLAYER_ID]?.destroy();
          } catch (e) {
              console.error("Error destroying Vturb player", e);
          }
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => prev + 0.1);
      }, 100);
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
        <div className="aspect-[9/16] w-full relative">
          <div
            id={VTURB_PLAYER_ID}
            ref={playerRef}
            style={{ display: 'block', margin: '0 auto', width: '100%', height: '100%' }}
          ></div>
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
          <p className="text-primary text-base sm:text-lg font-semibold tracking-wide">
            {isPlaying ? (currentTranscript || "Iniciando leitura...") : "Clique no play para iniciar sua leitura em vídeo."}
          </p>
        </div>

      </div>
    </div>
  );
}
