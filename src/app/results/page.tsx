"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const score = parseInt(searchParams.get("score") || "0");
  const time = parseInt(searchParams.get("time") || "0");
  const correct = parseInt(searchParams.get("correct") || "0");
  const total = parseInt(searchParams.get("total") || "0");

  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const timeFormatted = `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, "0")}`;

  const [displayScore, setDisplayScore] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  // Animated score counter
  useEffect(() => {
    if (score === 0) return;
    const steps = 45;
    const duration = 1300;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const ease = 1 - Math.pow(1 - step / steps, 3); // ease-out cubic
      setDisplayScore(Math.round(score * ease));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  // Animate accuracy bar
  useEffect(() => {
    const t = setTimeout(() => setBarWidth(percentage), 300);
    return () => clearTimeout(t);
  }, [percentage]);

  const trophy =
    percentage >= 90 ? "🏆" : percentage >= 70 ? "🎉" : percentage >= 50 ? "👍" : "💪";

  const headline =
    percentage >= 90
      ? "¡Resultado perfecto!"
      : percentage >= 70
      ? "¡Excelente trabajo!"
      : percentage >= 50
      ? "¡Buen intento!"
      : "¡Sigue practicando!";

  return (
    <div className="min-h-screen bg-[#04091a] flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md animate-fade-in">
          {/* Trophy + headline */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-subtle inline-block">{trophy}</div>
            <h1 className="font-syne font-black text-3xl sm:text-4xl text-white mb-2">
              {headline}
            </h1>
            <p className="text-slate-500 text-sm">Tu resultado ha sido guardado en el ranking</p>
          </div>

          {/* Score card */}
          <div className="bg-gradient-to-br from-blue-600/15 to-violet-600/15 border border-white/[0.10] rounded-3xl p-7 mb-4 text-center">
            <div className="text-slate-400 text-[10px] uppercase tracking-widest mb-2">
              Puntuación total
            </div>
            <div className="font-syne font-black text-6xl sm:text-7xl text-white tabular-nums mb-6 leading-none">
              {displayScore.toLocaleString()}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                  Correctas
                </div>
                <div className="font-bold text-white text-xl tabular-nums">
                  {correct}
                  <span className="text-slate-600 font-normal text-sm">/{total}</span>
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                  Precisión
                </div>
                <div className="font-bold text-white text-xl tabular-nums">
                  {percentage}
                  <span className="text-slate-600 font-normal text-sm">%</span>
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">
                  Tiempo
                </div>
                <div className="font-bold text-white text-xl tabular-nums">{timeFormatted}</div>
              </div>
            </div>
          </div>

          {/* Accuracy bar */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 mb-6">
            <div className="flex justify-between text-[11px] text-slate-600 mb-2">
              <span>Precisión</span>
              <span>{percentage}%</span>
            </div>
            <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-1000 ease-out"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/ranking")}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              🏆 Ver Ranking Global
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-4 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/[0.14] text-slate-300 hover:text-white rounded-2xl font-semibold text-base transition-all duration-200"
            >
              🎮 Jugar de Nuevo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#04091a]">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
