"use client";

import { difficulties } from "@/lib/game";

export type DifficultySelectorProps = {
  activeKey: keyof typeof difficulties;
  onChange: (key: keyof typeof difficulties) => void;
  totalFlags: number;
  onTotalFlagsChange: (value: number) => void;
};

const flagOptions = [10, 25];

export default function DifficultySelector({
  activeKey,
  onChange,
  totalFlags,
  onTotalFlagsChange
}: DifficultySelectorProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 backdrop-blur">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-400">Niveles</p>
          <h2 className="text-lg font-semibold text-slate-50">Escoge tu mood</h2>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          {flagOptions.join(" / ")} banderas
        </span>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(difficulties).map(([key, config]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key as keyof typeof difficulties)}
            className={`rounded-xl border p-4 text-left transition hover:border-accent/70 hover:bg-slate-800/80 ${
              activeKey === key ? "border-accent bg-slate-800/60" : "border-slate-800"
            }`}
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">{config.label}</p>
            <p className="text-base font-semibold text-white">{config.tier}</p>
            <p className="text-sm text-slate-300">{config.description}</p>
          </button>
        ))}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">Total de banderas</p>
        <div className="mt-2 flex gap-2">
          {flagOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onTotalFlagsChange(option)}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                option === totalFlags ? "border-accent bg-accent/10 text-accent" : "border-slate-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
