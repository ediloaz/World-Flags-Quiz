"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Flag from "@/components/Flag";
import DifficultySelector from "@/components/DifficultySelector";
import CaptchaGate from "@/components/CaptchaGate";
import RankingBoard from "@/components/RankingBoard";
import ScoreBoard from "@/components/ScoreBoard";
import TimerBadge from "@/components/TimerBadge";
import { buildRounds, difficulties, type QuizRound } from "@/lib/game";
import { submitScore } from "@/lib/api";

export default function HomePage() {
  const [activeDifficulty, setActiveDifficulty] = useState<keyof typeof difficulties>("iconicas");
  const [totalFlags, setTotalFlags] = useState(10);
  const [rounds, setRounds] = useState<QuizRound[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [nickname, setNickname] = useState("CursorFan");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = difficulties[activeDifficulty];
  const gameFinished = started && roundIndex >= rounds.length;

  useEffect(() => {
    if (!started || gameFinished) {
      return;
    }
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [started, gameFinished]);

  useEffect(() => {
    if (!gameFinished || !started) {
      return;
    }
    const accuracy = rounds.length ? hits / rounds.length : 0;
    setIsSubmitting(true);
    submitScore({
      nickname,
      difficulty: config.label,
      totalFlags,
      accuracy,
      elapsedSeconds
    }).finally(() => setIsSubmitting(false));
  }, [gameFinished, started, hits, rounds.length, nickname, config.label, totalFlags, elapsedSeconds]);

  const currentRound = rounds[roundIndex];
  const accuracy = rounds.length ? hits / rounds.length : 0;

  const startGame = useCallback(() => {
    if (!captchaVerified) {
      setFeedback("Supera el checkpoint anti-bots antes de competir.");
      return;
    }
    const newRounds = buildRounds(config.tier, totalFlags);
    setRounds(newRounds);
    setRoundIndex(0);
    setScore(0);
    setHits(0);
    setFeedback(null);
    setElapsedSeconds(0);
    setStarted(true);
  }, [captchaVerified, config.tier, totalFlags]);

  const handleOption = useCallback(
    (code: string) => {
      if (!started || gameFinished || !currentRound) {
        return;
      }
      const isCorrect = code === currentRound.flag.code;
      setScore((prev) => prev + (isCorrect ? 120 : 0));
      setHits((prev) => prev + (isCorrect ? 1 : 0));
      setFeedback(isCorrect ? "🔥 Correcta" : `❌ Era ${currentRound.flag.name}`);
      setTimeout(() => {
        setRoundIndex((prev) => prev + 1);
        setFeedback(null);
      }, 800);
    },
    [started, gameFinished, currentRound]
  );

  const callToAction = useMemo(() => {
    if (!started) {
      return "Jugar ahora";
    }
    if (!gameFinished) {
      return "Partida en progreso";
    }
    return "Reintentar";
  }, [started, gameFinished]);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <section className="gradient-border relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">World Flags Arena</p>
          <h1 className="text-4xl font-black text-white sm:text-5xl">
            Adivina banderas. Gana puntos. Domina el ranking global.
          </h1>
          <p className="text-lg text-slate-300 sm:w-3/4">
            Juego Next.js + Tailwind optimizado para SEO, con API lista para puntuaciones, niveles icónicos y un modo
            Legend Mix para coleccionistas de banderas poco comunes.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startGame}
              className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-900 transition hover:brightness-110"
            >
              {callToAction}
            </button>
            <TimerBadge elapsedSeconds={elapsedSeconds} />
            {feedback && <span className="text-sm text-amber-300">{feedback}</span>}
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-full bg-slate-800/60 px-3 py-1">Captcha táctil</span>
            <span className="rounded-full bg-slate-800/60 px-3 py-1">Ranking real time*</span>
            <span className="rounded-full bg-slate-800/60 px-3 py-1">API ready</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <DifficultySelector
            activeKey={activeDifficulty}
            onChange={(key) => setActiveDifficulty(key)}
            totalFlags={totalFlags}
            onTotalFlagsChange={setTotalFlags}
          />

          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">Partida actual</p>
                <h2 className="text-2xl font-semibold text-white">{config.label}</h2>
              </div>
              <input
                type="text"
                value={nickname}
                maxLength={20}
                onChange={(event) => setNickname(event.target.value)}
                className="w-full rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white focus:border-accent focus:outline-none sm:w-auto"
                placeholder="Tu alias"
              />
            </div>
            <ScoreBoard
              score={score}
              round={Math.min(roundIndex + 1, totalFlags)}
              totalRounds={totalFlags}
              accuracy={accuracy}
            />
            <div className="mt-6 space-y-4">
              {currentRound && !gameFinished ? (
                <div className="space-y-4">
                  <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800/60 bg-slate-950/50 p-6 text-center">
                    <Flag countryCode={currentRound.flag.code} isDetailed={config.detailed} size={200} className="rounded" />
                    <p className="text-lg font-semibold text-white">¿Qué bandera es?</p>
                    <p className="text-sm text-slate-400">Ronda {roundIndex + 1} de {totalFlags}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {currentRound.options.map((option) => (
                      <button
                        key={option.code}
                        type="button"
                        disabled={!started}
                        onClick={() => handleOption(option.code)}
                        className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-left text-base font-semibold text-white transition hover:border-accent/60 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {option.name}
                        <span className="block text-xs font-normal text-slate-400">{option.continent}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-800/80 p-6 text-center text-slate-400">
                  {gameFinished ? (
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold text-white">¡Listo!</h3>
                      <p>
                        {isSubmitting
                          ? "Enviando tu puntuación al backend..."
                          : "Presiona Jugar ahora para volver a competir."}
                      </p>
                    </div>
                  ) : (
                    <p>Presiona Jugar ahora para generar banderas y comenzar.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <CaptchaGate verified={captchaVerified} onVerify={() => setCaptchaVerified(true)} />
          <RankingBoard />
        </div>
      </section>

      <p className="text-center text-xs text-slate-500">
        *El ranking se actualiza vía API externa configurable. Esta versión usa datos mock cuando el backend aún no existe.
      </p>
    </main>
  );
}
