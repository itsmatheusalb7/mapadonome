"use client";

import React from 'react';

interface VturbPlayerProps {
  videoId: string;
}

export function VturbPlayer({ videoId }: VturbPlayerProps) {
  const playerHTML = `
    <vturb-smartplayer id="vid-${videoId}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>
    <script type="text/javascript">
      var s = document.createElement("script");
      s.src = "https://scripts.converteai.net/838ef529-b5af-4571-b974-3f233f46f302/players/${videoId}/v4/player.js";
      s.async = true;
      document.head.appendChild(s);
    </script>
  `;

  return <div dangerouslySetInnerHTML={{ __html: playerHTML }} />;
}
