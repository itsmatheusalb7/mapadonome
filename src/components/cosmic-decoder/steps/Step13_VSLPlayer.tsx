'use client'

import { useState, useRef, useEffect } from 'react';
import type { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Volume2, VolumeX, Copy, Check, MessageSquareText, X } from 'lucide-react';
import transcriptData from '@/lib/transcript.json';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
  const transcriptContainerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);

  const { toast } = useToast();
  const vslPoster = PlaceHolderImages.find(img => img.id === 'vsl-poster');

  const { transcript } = transcriptData as { transcript: TranscriptItem[] };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('volumechange', handleVolumeChange);
    
    video.play().catch(error => console.error("Autoplay was prevented:", error));

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      video.paused ? video.play() : video.pause();
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume > 0 && isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  const copyDataToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    console.log(formData);
    setIsCopied(true);
    toast({
      title: "Copiado!",
      description: "Os dados foram copiados para a área de transferência.",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in p-4 mt-8">
      <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl shadow-primary/10 rounded-xl">
        <CardHeader>
          <CardTitle className="text-primary text-center text-2xl">Sua Leitura Personalizada</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-foreground/80 italic">
            &quot;{formData.summary || `Olá ${formData.firstName}, sua jornada está prestes a começar...`}&quot;
          </p>

          <div className="aspect-video w-full rounded-lg overflow-hidden relative glow-border">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster={vslPoster?.imageUrl}
              playsInline
              loop
            />
          </div>

          <div className="bg-card/50 p-2 rounded-md flex items-center gap-4">
             <Button onClick={togglePlayPause} variant="ghost" size="icon" aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}>
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
             </Button>
             <div className="text-sm font-mono">{formatTime(currentTime)}</div>
             <div className="flex-grow text-sm font-mono text-right">{formatTime(duration)}</div>
             <Button onClick={toggleMute} variant="ghost" size="icon" aria-label={isMuted ? 'Ativar som' : 'Silenciar'}>
                {isMuted || volume === 0 ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
             </Button>
             <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.05}
                onValueChange={handleVolumeChange}
                className="w-24"
                aria-label="Volume"
            />
            <Button onClick={() => setIsTranscriptVisible(!isTranscriptVisible)} variant="ghost" size="icon" aria-label={isTranscriptVisible ? 'Fechar transcrição' : 'Abrir transcrição'}>
                {isTranscriptVisible ? <X className="h-6 w-6" /> : <MessageSquareText className="h-6 w-6" />}
            </Button>
          </div>
          
          <div className={cn("transition-all duration-300", isTranscriptVisible ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden")}>
            <ScrollArea className="h-48 w-full rounded-md border border-primary/20 p-4 bg-background/50">
                <div ref={transcriptContainerRef}>
                    {transcript.map((item, index) => {
                    const isActive = currentTime >= item.start && currentTime < item.end;
                    return (
                        <p key={index} className={cn("transition-colors duration-200 p-1 rounded", isActive ? 'text-primary font-semibold' : 'text-foreground/60')}>
                        {item.text.replace('[desafio]', formData.challenge || 'seu desafio atual')}
                        </p>
                    );
                    })}
                </div>
            </ScrollArea>
           </div>
          
          <div className="text-center pt-4">
            <Button onClick={copyDataToClipboard}>
              {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              Copiar Respostas
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
