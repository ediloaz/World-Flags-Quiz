"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Captcha from "@/components/Captcha";
import type { GameConfig } from "@/lib/types";

const CAPTCHA_ENABLED = false;

export default function HomeClient() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<"famous" | "mixed">("famous");
  const [size, setSize] = useState<10 | 25>(10);
  const [playerName, setPlayerName] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert("Por favor, ingresa tu nombre");
      return;
    }
    localStorage.setItem("playerName", playerName.trim());

    if (!CAPTCHA_ENABLED) {
      const config: GameConfig = { difficulty, size };
      localStorage.setItem("gameConfig", JSON.stringify(config));
      router.push("/game");
      return;
    }

    const savedToken = localStorage.getItem("captcha_token");
    if (!savedToken) {
      setShowCaptcha(true);
      return;
    }

    const config: GameConfig = { difficulty, size };
    localStorage.setItem("gameConfig", JSON.stringify(config));
    router.push("/game");
  };

  const handleCaptchaVerify = (token: string) => {
    void token;
    setShowCaptcha(false);
    const config: GameConfig = { difficulty, size };
    localStorage.setItem("gameConfig", JSON.stringify(config));
    router.push("/game");
  };

  React.useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) setPlayerName(savedName);
  }, []);

  return (
    <div className="min-h-screen bg-[#04091a] flex flex-col overflow-hidden">
      {/* Background layers */}
      <div className="fixed inset-0 bg-grid pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 right-1/4 w-[700px] h-[700px] bg-violet-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/[0.06] rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-5 pb-2">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl animate-float">🌍</span>
          <span className="font-syne font-extrabold text-white text-base tracking-tight">
            World Flags Quiz
          </span>
        </div>
        <button
          onClick={() => router.push("/ranking")}
          className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.10] border border-white/[0.08] rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-all duration-200"
        >
          <span>🏆</span>
          <span className="hidden sm:inline">Ranking</span>
        </button>
      </nav>

      {/* Main — 2-column on desktop */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-20 px-6 sm:px-10 lg:px-16 py-10 lg:py-12">
        {/* Left: Branding */}
        <div className="flex-1 text-center lg:text-left animate-fade-in max-w-xl">
          <h1 className="font-syne font-black text-white leading-[0.88] mb-6 tracking-tight">
            <span className="block text-[clamp(3rem,8vw,5.5rem)]">World</span>
            <span className="block text-[clamp(3rem,8vw,5.5rem)] bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 text-transparent bg-clip-text">
              Flags
            </span>
            <span className="block text-[clamp(3rem,8vw,5.5rem)] text-slate-200">Quiz</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
            Adivina banderas del mundo y escala en el ranking global
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
            {[
              { icon: "🗺️", text: "160+ países" },
              { icon: "⚡", text: "2 modos" },
              { icon: "🏆", text: "Ranking global" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.04] border border-white/[0.07] rounded-full text-sm text-slate-500"
              >
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form card */}
        <div className="w-full max-w-md animate-slide-up">
          <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
            {!showCaptcha ? (
              <>
                {/* Player name */}
                <div className="mb-5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
                    placeholder="¿Cómo te llamas?"
                    className="w-full px-4 py-3 bg-white/[0.06] border border-white/[0.10] rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 outline-none transition-all text-white placeholder-slate-600 text-sm font-medium"
                    maxLength={30}
                  />
                </div>

                {/* Difficulty */}
                <div className="mb-5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Dificultad
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDifficulty("famous")}
                      className={`p-4 rounded-2xl border transition-all duration-200 text-left ${
                        difficulty === "famous"
                          ? "border-blue-500/40 bg-blue-500/10 shadow-lg shadow-blue-500/10"
                          : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14]"
                      }`}
                    >
                      <div className="text-2xl mb-2">🌍</div>
                      <div className="font-semibold text-white text-sm">Conocidas</div>
                      <div className="text-xs text-slate-600 mt-0.5">Nivel fácil</div>
                    </button>
                    <button
                      onClick={() => setDifficulty("mixed")}
                      className={`p-4 rounded-2xl border transition-all duration-200 text-left ${
                        difficulty === "mixed"
                          ? "border-violet-500/40 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                          : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14]"
                      }`}
                    >
                      <div className="text-2xl mb-2">🌎</div>
                      <div className="font-semibold text-white text-sm">Mezcladas</div>
                      <div className="text-xs text-slate-600 mt-0.5">Difícil · 🏆 Ranking</div>
                    </button>
                  </div>
                </div>

                {/* Size */}
                <div className="mb-7">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Cantidad de banderas
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSize(10)}
                      className={`p-4 rounded-2xl border transition-all duration-200 text-center ${
                        size === 10
                          ? "border-emerald-500/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                          : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14]"
                      }`}
                    >
                      <div className="font-syne font-black text-3xl text-white">10</div>
                      <div className="text-xs text-slate-600 mt-1">Rápido · ~3 min</div>
                    </button>
                    <button
                      onClick={() => setSize(25)}
                      className={`p-4 rounded-2xl border transition-all duration-200 text-center ${
                        size === 25
                          ? "border-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/10"
                          : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.14]"
                      }`}
                    >
                      <div className="font-syne font-black text-3xl text-white">25</div>
                      <div className="text-xs text-slate-600 mt-1">Completo · 🏆 Ranking</div>
                    </button>
                  </div>
                </div>

                {/* Start button */}
                <button
                  onClick={handleStartGame}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Comenzar Juego →
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => router.push("/ranking")}
                    className="text-slate-600 hover:text-slate-400 text-sm transition-colors"
                  >
                    Ver Ranking Global →
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <h2 className="font-syne font-bold text-2xl text-white mb-3">Verificación</h2>
                <p className="text-slate-500 text-sm mb-6">
                  Completa la verificación para continuar
                </p>
                <Captcha
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                  onVerify={handleCaptchaVerify}
                  onError={() => {
                    alert("Error en la verificación. Intenta de nuevo.");
                    setShowCaptcha(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* SEO description — visible but unobtrusive */}
      <section
        className="relative z-10 px-6 sm:px-10 pb-3 text-center"
        aria-label="Descripción del juego"
      >
        <h2 className="sr-only">Juego Educativo de Geografía</h2>
        <p className="text-[11px] text-slate-700 leading-relaxed max-w-2xl mx-auto">
          World Flags Quiz es un juego educativo de geografía donde puedes poner a prueba tus
          conocimientos sobre las banderas del mundo. Este Global Flag Quiz Game te desafía a
          identificar banderas de diferentes países mientras compites contra el tiempo.
        </p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-5 pt-1 text-slate-700 text-xs">
        Hecho con ❤️ por{" "}
        <a
          href="https://www.ediloaz.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-400 transition-colors"
        >
          ediloaz
        </a>
      </footer>
    </div>
  );
}
