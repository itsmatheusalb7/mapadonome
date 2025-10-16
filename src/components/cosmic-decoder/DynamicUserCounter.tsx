"use client"

import { useState, useEffect } from 'react';

export function DynamicUserCounter() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Set initial random value only on the client
    const initialCount = Math.floor(Math.random() * (160 - 90 + 1)) + 90;
    setUserCount(initialCount);

    let intervalId: NodeJS.Timeout;

    const updateUserCount = () => {
      setUserCount(prevCount => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prevCount + change;
        return Math.max(90, Math.min(newCount, 160)); // Keep within range
      });

      // Schedule next update with random delay
      const randomDelay = Math.random() * (4000 - 1500) + 1500;
      intervalId = setTimeout(updateUserCount, randomDelay);
    };

    // Start the first update
    const initialDelay = Math.random() * (4000 - 1500) + 1500;
    intervalId = setTimeout(updateUserCount, initialDelay);

    // Cleanup on component unmount
    return () => clearTimeout(intervalId);
  }, []);

  if (userCount === 0) {
    return (
        <div className="fixed top-0 left-0 right-0 h-8 flex items-center justify-center bg-primary text-primary-foreground z-50 text-sm font-semibold tracking-widest shadow-lg">
          <p className="relative">CARREGANDO...</p>
        </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-8 flex items-center justify-center bg-primary text-primary-foreground z-50 text-sm font-semibold tracking-widest shadow-lg">
      <p className="relative">VOCÊ E {userCount} PESSOAS ESTÃO FAZENDO ESTE TESTE</p>
    </div>
  );
}
