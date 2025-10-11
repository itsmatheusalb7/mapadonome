"use client";

import { useEffect, useRef } from 'react';

interface VturbPlayerProps {
  videoId: string;
}

export function VturbPlayer({ videoId }: VturbPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const scriptId = `vturb-player-script-${videoId}`;

  useEffect(() => {
    // Prevent script from being added multiple times
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/${videoId}/v4/player.js`;
    script.async = true;

    document.head.appendChild(script);

    // Optional: cleanup script on component unmount
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        // While generally safe, some scripts might not clean up well.
        // For Vturb, it's often better to leave it to avoid issues on quick navigations.
        // document.head.removeChild(existingScript);
      }
    };
  }, [videoId, scriptId]);

  return (
    <div className="aspect-video w-full relative">
      <div
        id={`vid-${videoId}`}
        ref={videoRef}
        data-v-838ef529-b5af-4571-b974-3f233f46f302="true"
        data-autoplay="true" // This enables autoplay
        style={{ display: 'block', margin: '0 auto', width: '100%', height: '100%' }}
      ></div>
    </div>
  );
}
