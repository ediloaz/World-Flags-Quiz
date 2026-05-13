"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { RankingEntry } from "@/lib/types";

const MEDALS = ["🥇", "🥈", "🥉"];

const PODIUM_COLORS = [
  "border-amber-500/30 bg-amber-500/[0.07]",
  "border-slate-400/25 bg-slate-400/[0.06]",
  "border-orange-700/30 bg-orange-700/[0.07]",
];

export default function RankingClient() {
  const router = useRouter();
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "famous" | "mixed">("all");
  const [sizeFilter, setSizeFilter] = useState<"all" | 10 | 25>("all");

  const fetchRankings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/ranking?difficulty=${filter}&size=${sizeFilter}`
      );
      if (response.ok) {
        const data = await response.json();
        setRankings(data.rankings || []);
      } else {
        setRankings([]);
      }
    } catch (error) {
      console.error("Error al cargar ranking:", error);
      setRankings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sizeFilter]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div className="min-h-screen bg-[#04091a]">
      {/* Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-amber-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 right-1/4 w-[500px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="font-syne font-black text-3xl sm:text-4xl text-white">
              Ranking Global
            </h1>
            <h2 className="text-slate-500 text-sm mt-1 font-normal">
              Los mejores jugadores del Global Flag Quiz Game
            </h2>
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            🎮 Jugar
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8 animate-slide-up">
          <div className="flex items-center gap-0.5 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1">
            {(["all", "famous", "mixed"] as const).map((val) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  filter === val
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {val === "all" ? "Todas" : val === "famous" ? "🌍 Conocidas" : "🌎 Mezcladas"}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-0.5 bg-white/[0.04] border border-white/[0.07] rounded-xl p-1">
            {(["all", 10, 25] as const).map((val) => (
              <button
                key={val}
                onClick={() => setSizeFilter(val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  sizeFilter === val
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {val === "all" ? "Todas" : `${val} banderas`}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Cargando ranking...</p>
          </div>
        ) : rankings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🏜️</div>
            <p className="text-slate-300 text-lg font-semibold mb-1">No hay resultados aún</p>
            <p className="text-slate-600 text-sm mb-6">¡Sé el primero en jugar!</p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all"
            >
              Comenzar Juego
            </button>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {top3.length > 0 && (
              <div className="flex items-end justify-center gap-3 sm:gap-4 mb-8">
                {top3.map((entry, rank) => (
                  <div
                    key={entry.id || rank}
                    className={`flex-1 max-w-[200px] ${rank === 0 ? "order-2" : rank === 1 ? "order-1" : "order-3"}`}
                  >
                    <div
                      className={`rounded-2xl border text-center transition-all px-3 py-4 ${PODIUM_COLORS[rank]} ${
                        rank === 0 ? "pb-7 pt-6 shadow-lg shadow-amber-500/5" : "pb-4"
                      }`}
                    >
                      <div className="text-3xl mb-2">{MEDALS[rank]}</div>
                      <div
                        className="font-syne font-bold text-white text-sm truncate mb-1"
                        title={entry.playerName}
                      >
                        {entry.playerName}
                      </div>
                      <div className="font-syne font-black text-2xl text-white tabular-nums">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 tabular-nums">
                        {entry.correctAnswers}/{entry.totalQuestions} · {formatTime(entry.time)}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-1">
                        {entry.difficulty === "famous" ? "🌍" : "🌎"} {entry.size}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rest of rankings */}
            {rest.length > 0 && (
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden mb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        {[
                          { label: "Pos", cls: "" },
                          { label: "Jugador", cls: "" },
                          { label: "Puntos", cls: "" },
                          { label: "Correctas", cls: "hidden sm:table-cell" },
                          { label: "Tiempo", cls: "hidden sm:table-cell" },
                          { label: "Modo", cls: "hidden md:table-cell" },
                        ].map(({ label, cls }) => (
                          <th
                            key={label}
                            className={`px-4 sm:px-6 py-3 text-left text-[10px] font-bold text-slate-700 uppercase tracking-widest ${cls}`}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rest.map((entry, index) => (
                        <tr
                          key={entry.id || index}
                          className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors duration-100"
                        >
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-slate-500 font-medium text-sm tabular-nums">
                              #{index + 4}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-slate-200 font-medium text-sm">
                              {entry.playerName}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="font-syne font-bold text-blue-400 tabular-nums text-sm">
                              {entry.score.toLocaleString()}
                            </span>
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4">
                            <span className="text-slate-400 text-sm tabular-nums">
                              {entry.correctAnswers}/{entry.totalQuestions}
                            </span>
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4">
                            <span className="text-slate-400 text-sm tabular-nums">
                              {formatTime(entry.time)}
                            </span>
                          </td>
                          <td className="hidden md:table-cell px-6 py-4">
                            <span className="text-slate-600 text-xs">
                              {entry.difficulty === "famous" ? "🌍 Conocidas" : "🌎 Mezcladas"}{" "}
                              · {entry.size}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tip */}
            <p className="text-center text-xs text-slate-700">
              💡 Los mejores puntajes se logran en modo{" "}
              <strong className="text-slate-600">Mezcladas</strong> con{" "}
              <strong className="text-slate-600">25 banderas</strong>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
