'use client'

import { useState, useRef, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import transcriptData from '@/lib/transcript.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Step13Props {
  formData: FormData & { summary?: string };
}

interface TranscriptItem {
  start: number;
  end: number;
  text: string;
}

export default function Step13_VSLPlayer({ formData }: Step13Props) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const playerRef = useRef<any>(null);

  // YouTube video ID from the URL
  const videoId = 'hYctID1AusU';

  const { transcript } = transcriptData as { transcript: TranscriptItem[] };
  
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&rel=0&showinfo=0&enablejsapi=1&mute=${isMuted ? 1 : 0}`;

  useEffect(() => {
    // Simulate VSL progression for transcript
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const nextTime = prev + 0.1;
        if (nextTime >= 59) {
          setShowButton(true);
          clearInterval(interval);
        }
        return nextTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);
  
  const handleUnmute = () => {
    setIsMuted(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in p-2 sm:p-4 mt-12 md:mt-16">
      <div className="space-y-4 md:space-y-6">
        <div className="aspect-[9/16] w-full relative">
          <iframe
            ref={playerRef}
            className="w-full h-full border-2 border-primary rounded-xl shadow-2xl shadow-primary/20"
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
           {isMuted && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button onClick={handleUnmute} variant="ghost" className="text-white flex flex-col h-auto">
                <VolumeX className="h-12 w-12" />
                <span className="mt-2 text-lg">Ativar som</span>
              </Button>
            </div>
          )}
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
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg sm:text-xl h-12 sm:h-14 shadow-lg animate-pulse">
                    QUERO MEU ACESSO AGORA!
                </Button>
            </div>
        )}

      </div>
    </div>
  );
}
