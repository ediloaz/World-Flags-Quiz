"use client";

import { useEffect, useState } from "react";
import type { RankingEntry } from "@/lib/api";
import { fetchRanking } from "@/lib/api";
import Flag from "./Flag";

export default function RankingBoard() {
  const [entries, setEntries] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchRanking()
      .then((data) => {
        if (mounted) {
          setEntries(data);
        }
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
      <header className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Ranking global</p>
          <h2 className="text-lg font-semibold text-white">Leyendas Legend Mix (25)</h2>
        </div>
        <span className="text-xs text-slate-400">Tiempo + precisión</span>
      </header>
      {loading ? (
        <p className="animate-pulse text-sm text-slate-400">Sincronizando tablero...</p>
      ) : (
        <ol className="space-y-3">
          {entries.map((entry, index) => (
            <li
              key={entry.id}
              className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/40 p-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-400">#{index + 1}</span>
                <Flag countryCode={entry.countryCode} isDetailed size={48} className="rounded" />
                <div>
                  <p className="text-base font-semibold text-white">{entry.nickname}</p>
                  <p className="text-xs text-slate-400">
                    {entry.difficulty} · {entry.totalFlags} banderas
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent">{Math.round(entry.accuracy * 100)}%</p>
                <p className="text-xs text-slate-400">{entry.elapsedSeconds}s</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
