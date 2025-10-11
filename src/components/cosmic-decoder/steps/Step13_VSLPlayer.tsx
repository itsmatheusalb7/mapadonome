'use client'

import { useState, useRef, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import transcriptData from '@/lib/transcript.json';
import { useToast } from '@/hooks/use-toast';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeTranscriptRef = useRef<HTMLParagraphElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const vslPoster = PlaceHolderImages.find(img => img.id === 'vsl-poster');

  const { transcript } = transcriptData as { transcript: TranscriptItem[] };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('volumechange', handleVolumeChange);
    
    video.play().catch(error => {
      console.error("Autoplay was prevented:", error);
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);
  
  useEffect(() => {
    activeTranscriptRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
  }, [currentTime])

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in p-4 mt-12 md:mt-16">
      <div className="border-2 border-primary bg-black/50 rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
          <div className="aspect-video w-full relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster={vslPoster?.imageUrl}
              playsInline
              loop
              muted
            />
          </div>

          <div className="bg-background/80 backdrop-blur-sm p-4 border-t-2 border-primary flex items-center justify-between text-lg text-primary">
            <div className='flex items-center gap-4'>
                {transcript.map((item, index) => {
                    const isActive = currentTime >= item.start && currentTime < item.end;
                    if (isActive) {
                        return (
                            <p key={index} ref={activeTranscriptRef} className={cn('transition-colors duration-200 p-1 rounded font-semibold')}>
                                {item.text.replace('[desafio]', formData.challenge || 'seu desafio atual')}
                            </p>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="flex items-center gap-2">
                <Button onClick={togglePlayPause} variant="ghost" size="icon" aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}>
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                <Button onClick={toggleMute} variant="ghost" size="icon" aria-label={isMuted ? 'Ativar som' : 'Silenciar'}>
                    {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                </Button>
            </div>
          </div>
      </div>
    </div>
  );
}
