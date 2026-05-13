"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game from "@/components/Game";
import type { GameConfig, GameResult } from "@/lib/types";

export default function GameClient() {
  const router = useRouter();
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    const savedConfig = localStorage.getItem("gameConfig");
    if (!savedConfig) {
      router.push("/");
      return;
    }
    try {
      const gameConfig: GameConfig = JSON.parse(savedConfig);
      setConfig(gameConfig);
    } catch (error) {
      console.error("Error al cargar configuración:", error);
      router.push("/");
    }
  }, [router]);

  const handleFinish = async (result: GameResult) => {
    setGameResult(result);
    const playerName = localStorage.getItem("playerName") || "Anónimo";

    try {
      const response = await fetch("/api/ranking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result,
          playerName,
          captchaToken: localStorage.getItem("captcha_token"),
        }),
      });
      if (response.ok) console.log("Resultado guardado en el ranking");
    } catch (error) {
      console.error("Error al guardar resultado:", error);
    }

    setTimeout(() => {
      router.push(
        `/results?score=${result.score}&time=${result.time}&correct=${result.correctAnswers}&total=${result.totalQuestions}`
      );
    }, 2500);
  };

  const handleCancel = () => {
    if (confirm("¿Salir? Se perderá tu progreso.")) {
      router.push("/");
    }
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#04091a]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Cargando juego...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Game config={config} onFinish={handleFinish} onCancel={handleCancel} />

      {gameResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />
          <div className="relative bg-[#0b1325] border border-white/[0.10] rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-slide-up">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="font-syne font-black text-2xl text-white mb-1">
                ¡Completado!
              </h2>
              <p className="text-slate-500 text-xs">Guardando resultado en el ranking...</p>
            </div>

            <div className="bg-gradient-to-br from-blue-600/15 to-violet-600/15 border border-white/[0.08] rounded-2xl p-5 text-center mb-4">
              <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-1">
                Puntos totales
              </div>
              <div className="font-syne font-black text-4xl text-white tabular-nums">
                {gameResult.score.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
                <div className="text-slate-500 text-[10px] mb-1">Correctas</div>
                <div className="text-white font-bold tabular-nums">
                  {gameResult.correctAnswers}
                  <span className="text-slate-600 font-normal">/{gameResult.totalQuestions}</span>
                </div>
              </div>
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
                <div className="text-slate-500 text-[10px] mb-1">Tiempo</div>
                <div className="text-white font-bold tabular-nums">
                  {Math.floor(gameResult.time / 60)}:
                  {(gameResult.time % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5">
              {[0, 150, 300].map((delay) => (
                <div
                  key={delay}
                  className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
              <span className="text-slate-600 text-xs ml-2">Redirigiendo...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
