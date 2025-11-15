"use client";

export type TimerBadgeProps = {
  elapsedSeconds: number;
};

export default function TimerBadge({ elapsedSeconds }: TimerBadgeProps) {
  const minutes = Math.floor(elapsedSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");

  return (
    <div className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-sm font-semibold text-accent">
      ⏱️ {minutes}:{seconds}
    </div>
  );
}
