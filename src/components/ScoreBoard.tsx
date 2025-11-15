"use client";

export type ScoreBoardProps = {
  score: number;
  round: number;
  totalRounds: number;
  accuracy: number;
};

export default function ScoreBoard({ score, round, totalRounds, accuracy }: ScoreBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4 text-center text-sm">
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">Puntaje</p>
        <p className="text-2xl font-bold text-white">{score}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">Ronda</p>
        <p className="text-2xl font-bold text-white">
          {round}/{totalRounds}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">Precisión</p>
        <p className="text-2xl font-bold text-accent">{Math.round(accuracy * 100)}%</p>
      </div>
    </div>
  );
}
