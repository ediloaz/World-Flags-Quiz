"use client";

import React, { useEffect, useState } from "react";

interface GameTimerProps {
  startTime: number;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

/**
 * Componente para mostrar el tiempo transcurrido en el juego
 */
const GameTimer: React.FC<GameTimerProps> = ({ 
  startTime, 
  onTimeUpdate,
  className = "" 
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      setElapsed(elapsedSeconds);
      onTimeUpdate?.(elapsedSeconds);
    }, 100); // Actualizar cada 100ms para suavidad

    return () => clearInterval(interval);
  }, [startTime, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`text-2xl font-bold ${className}`}>
      <span className="inline-flex items-center gap-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {formatTime(elapsed)}
      </span>
    </div>
  );
};

export default GameTimer;

