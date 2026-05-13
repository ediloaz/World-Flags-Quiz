"use client";

import React, { useState, useEffect, useCallback } from "react";
import Flag from "./Flag";
import GameTimer from "./GameTimer";
import type { GameConfig, FlagQuestion, GameState, GameResult } from "@/lib/types";
import { getCountriesByDifficulty, generateQuestion } from "@/lib/gameData";

interface GameProps {
  config: GameConfig;
  onFinish: (result: GameResult) => void;
  onCancel?: () => void;
}

const Game: React.FC<GameProps> = ({ config, onFinish, onCancel }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    questions: [],
    score: 0,
    startTime: Date.now(),
    answers: [],
    isFinished: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isDetailed, setIsDetailed] = useState(true);
  const [flagSize, setFlagSize] = useState(220);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Responsive flag size
  useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setFlagSize(280);
      else if (window.innerWidth >= 768) setFlagSize(250);
      else setFlagSize(200);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Initialize questions
  useEffect(() => {
    const countries = getCountriesByDifficulty(config.difficulty);
    const questions: FlagQuestion[] = [];
    const usedCountries = new Set<string>();

    for (let i = 0; i < config.size; i++) {
      const question = generateQuestion(countries, usedCountries);
      if (!question) break;
      usedCountries.add(question.countryCode);
      questions.push({
        countryCode: question.countryCode,
        countryName: question.countryName,
        options: question.options,
        correctAnswer: question.countryName,
      });
    }

    setGameState((prev) => ({ ...prev, questions, startTime: Date.now() }));
  }, [config]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (selectedAnswer !== null || showResult) return;

      const currentQ = gameState.questions[gameState.currentQuestion];
      const correct = answer === currentQ.correctAnswer;

      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setShowResult(true);

      const basePoints = 100;
      const timeBonus = Math.max(0, 30 - timeElapsed) * 2;
      const difficultyMultiplier = config.difficulty === "mixed" ? 1.5 : 1;
      const sizeMultiplier = config.size === 25 ? 1.5 : 1;
      const points = Math.round(
        (basePoints + timeBonus) * difficultyMultiplier * sizeMultiplier
      );

      setPointsEarned(correct ? points : 0);
      const newScore = correct ? gameState.score + points : gameState.score;
      const newAnswers = [...gameState.answers, correct];

      setGameState((prev) => ({ ...prev, score: newScore, answers: newAnswers }));

      setTimeout(() => {
        if (gameState.currentQuestion < gameState.questions.length - 1) {
          setGameState((prev) => ({
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
          }));
          setSelectedAnswer(null);
          setShowResult(false);
          setTimeElapsed(0);
          setPointsEarned(0);
        } else {
          const endTime = Date.now();
          const totalTime = Math.floor((endTime - gameState.startTime) / 1000);
          setGameState((prev) => ({ ...prev, isFinished: true, endTime }));

          const result: GameResult = {
            score: newScore,
            time: totalTime,
            correctAnswers: newAnswers.filter((a) => a).length,
            totalQuestions: config.size,
            difficulty: config.difficulty,
            size: config.size,
          };

          onFinish(result);
        }
      }, 1500);
    },
    [selectedAnswer, showResult, gameState, config, timeElapsed, onFinish]
  );

  const currentQuestion = gameState.questions[gameState.currentQuestion];
  const progress = ((gameState.currentQuestion + 1) / config.size) * 100;

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#04091a]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (gameState.isFinished) return null;

  const getAnswerClass = (option: string) => {
    const isSelected = selectedAnswer === option;
    const isCorrectOption = option === currentQuestion.correctAnswer;

    const base =
      "w-full p-4 text-left rounded-2xl border transition-all duration-200 flex items-center gap-3 font-medium ";

    if (!showResult) {
      return (
        base +
        "bg-white/[0.04] border-white/[0.08] text-slate-200 hover:bg-white/[0.08] hover:border-white/[0.18] hover:text-white cursor-pointer active:scale-[0.98]"
      );
    }
    if (isCorrectOption) {
      return (
        base +
        "bg-emerald-500/[0.12] border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10"
      );
    }
    if (isSelected) {
      return base + "bg-rose-500/[0.12] border-rose-500/40 text-rose-300";
    }
    return base + "bg-white/[0.02] border-white/[0.04] text-slate-700 cursor-default";
  };

  const flagRingClass = showResult
    ? isCorrect
      ? "ring-4 ring-emerald-400/50 shadow-[0_0_50px_rgba(16,185,129,0.25)]"
      : "ring-4 ring-rose-400/50 shadow-[0_0_50px_rgba(244,63,94,0.25)]"
    : "";

  const feedbackEl = showResult ? (
    <div
      className={`flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl text-sm font-semibold animate-slide-up ${
        isCorrect
          ? "bg-emerald-500/[0.12] border border-emerald-500/30 text-emerald-300"
          : "bg-rose-500/[0.12] border border-rose-500/30 text-rose-300"
      }`}
    >
      {isCorrect ? (
        <>
          <span className="text-base">✓</span>
          <span>
            ¡Correcto! <strong>+{pointsEarned}</strong> pts
          </span>
        </>
      ) : (
        <>
          <span className="text-base">✗</span>
          <span>
            Era: <strong>{currentQuestion.correctAnswer}</strong>
          </span>
        </>
      )}
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-[#04091a] flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-60" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[450px] h-[450px] bg-blue-600/[0.07] rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-1/3 w-[450px] h-[450px] bg-violet-600/[0.07] rounded-full blur-[110px]" />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-40 bg-[#04091a]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 gap-3">
            {/* Question counter */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div>
                <div className="text-[10px] text-slate-600 uppercase tracking-wider">Pregunta</div>
                <div className="font-syne font-black text-white text-lg leading-none">
                  {gameState.currentQuestion + 1}
                  <span className="text-slate-600 font-normal text-sm">
                    /{config.size}
                  </span>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/[0.08]" />
              <div className="hidden sm:flex items-center px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-lg">
                <span className="text-[11px] text-slate-500">
                  {config.difficulty === "famous" ? "🌍 Conocidas" : "🌎 Mezcladas"}
                </span>
              </div>
            </div>

            {/* Score */}
            <div className="flex-shrink-0 text-center">
              <div className="text-[10px] text-slate-600 uppercase tracking-wider">Puntos</div>
              <div className="font-syne font-black text-blue-400 text-xl tabular-nums leading-none">
                {gameState.score.toLocaleString()}
              </div>
            </div>

            {/* Timer + toggle + exit */}
            <div className="flex items-center gap-2 sm:gap-3">
              <GameTimer
                startTime={gameState.startTime}
                onTimeUpdate={setTimeElapsed}
                className="text-slate-300 text-sm sm:text-base"
              />

              {/* HD toggle — desktop */}
              <label
                className="hidden sm:flex items-center gap-1.5 cursor-pointer group"
                title="Bandera detallada"
              >
                <span className="text-[11px] text-slate-600 group-hover:text-slate-400 transition-colors select-none">
                  HD
                </span>
                <div className="relative w-8 h-[18px]">
                  <input
                    type="checkbox"
                    checked={isDetailed}
                    onChange={(e) => setIsDetailed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-[18px] bg-white/10 peer-checked:bg-blue-600 rounded-full transition-colors duration-200" />
                  <div className="absolute top-[3px] left-[3px] w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[14px]" />
                </div>
              </label>

              {onCancel && (
                <button
                  onClick={onCancel}
                  className="p-1.5 text-slate-600 hover:text-slate-300 hover:bg-white/[0.06] rounded-lg transition-all"
                  title="Salir"
                  aria-label="Salir del juego"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-0.5 bg-white/[0.05] -mx-4 sm:-mx-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Game content */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center lg:min-h-[calc(100vh-88px)]">
          {/* Left panel: Question + Flag */}
          <div className="flex flex-col items-center mb-8 lg:mb-0">
            <h2 className="font-syne text-slate-300 text-lg sm:text-xl font-semibold mb-7 sm:mb-9 text-center">
              ¿De qué país es esta bandera?
            </h2>

            <div
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${flagRingClass}`}
            >
              <Flag
                countryCode={currentQuestion.countryCode}
                isDetailed={isDetailed}
                size={flagSize}
                countryName={currentQuestion.countryName}
              />
            </div>

            {/* Feedback shown below flag on desktop */}
            {showResult && (
              <div className="hidden lg:block mt-8 w-full max-w-xs">{feedbackEl}</div>
            )}
          </div>

          {/* Right panel: Answers */}
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={getAnswerClass(option)}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      showResult && isCorrectOption
                        ? "bg-emerald-500/25 text-emerald-300"
                        : showResult && isSelected
                        ? "bg-rose-500/25 text-rose-300"
                        : "bg-white/[0.08] text-slate-500"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-sm sm:text-base">{option}</span>
                  {showResult && isCorrectOption && (
                    <span className="ml-auto text-emerald-400 flex-shrink-0">✓</span>
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <span className="ml-auto text-rose-400 flex-shrink-0">✗</span>
                  )}
                </button>
              );
            })}

            {/* Feedback on mobile/tablet */}
            {showResult && <div className="lg:hidden mt-1">{feedbackEl}</div>}

            {/* HD toggle — mobile only */}
            <div className="sm:hidden flex items-center justify-center gap-2 mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-xs text-slate-600 select-none">Bandera detallada</span>
                <div className="relative w-8 h-[18px]">
                  <input
                    type="checkbox"
                    checked={isDetailed}
                    onChange={(e) => setIsDetailed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-[18px] bg-white/10 peer-checked:bg-blue-600 rounded-full transition-colors duration-200" />
                  <div className="absolute top-[3px] left-[3px] w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-[14px]" />
                </div>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;
