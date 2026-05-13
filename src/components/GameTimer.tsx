"use client";

import React, { useEffect, useState } from "react";

interface GameTimerProps {
  startTime: number;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

const GameTimer: React.FC<GameTimerProps> = ({
  startTime,
  onTimeUpdate,
  className = "",
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(elapsedSeconds);
      onTimeUpdate?.(elapsedSeconds);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`flex items-center gap-1.5 font-bold tabular-nums ${className}`}>
      <svg
        className="w-4 h-4 opacity-60 flex-shrink-0"
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
      <span>{formatTime(elapsed)}</span>
    </div>
  );
};

export default GameTimer;
