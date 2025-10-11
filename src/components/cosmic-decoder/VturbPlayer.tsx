"use client";

import { useEffect, useRef } from 'react';

interface VturbPlayerProps {
  videoId: string;
}

export function VturbPlayer({ videoId }: VturbPlayerProps) {
  const scriptId = `vturb-player-script-${videoId}`;

  useEffect(() => {
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/${videoId}/v4/player.js`;
    script.async = true;
    document.head.appendChild(script);

  }, [videoId, scriptId]);

  return (
      <div id={`vid-${videoId}`} style={{display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px'}}></div>
  );
}
