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

/**
 * Componente principal del juego
 */
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

  // Inicializar preguntas
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

    setGameState(prev => ({
      ...prev,
      questions,
      startTime: Date.now(),
    }));
  }, [config]);

  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer !== null || showResult) return;

    const currentQ = gameState.questions[gameState.currentQuestion];
    const correct = answer === currentQ.correctAnswer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowResult(true);

    // Calcular puntos: más rápido = más puntos
    const basePoints = 100;
    const timeBonus = Math.max(0, 30 - timeElapsed) * 2; // Bonus por velocidad
    const difficultyMultiplier = config.difficulty === "mixed" ? 1.5 : 1;
    const sizeMultiplier = config.size === 25 ? 1.5 : 1;
    const points = Math.round((basePoints + timeBonus) * difficultyMultiplier * sizeMultiplier);

    const newScore = correct ? gameState.score + points : gameState.score;
    const newAnswers = [...gameState.answers, correct];

    setGameState(prev => ({
      ...prev,
      score: newScore,
      answers: newAnswers,
    }));

    // Esperar 1.5 segundos antes de pasar a la siguiente pregunta
    setTimeout(() => {
      if (gameState.currentQuestion < gameState.questions.length - 1) {
        setGameState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeElapsed(0);
      } else {
        // Juego terminado
        const endTime = Date.now();
        const totalTime = Math.floor((endTime - gameState.startTime) / 1000);

        setGameState(prev => ({
          ...prev,
          isFinished: true,
          endTime,
        }));

        const result: GameResult = {
          score: newScore,
          time: totalTime,
          correctAnswers: newAnswers.filter(a => a).length,
          totalQuestions: config.size,
          difficulty: config.difficulty,
          size: config.size,
        };

        onFinish(result);
      }
    }, 1500);
  }, [selectedAnswer, showResult, gameState, config, timeElapsed, onFinish]);

  const currentQuestion = gameState.questions[gameState.currentQuestion];

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (gameState.isFinished) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header del juego */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Pregunta {gameState.currentQuestion + 1} de {config.size}
              </h2>
              <p className="text-sm text-gray-500">
                {config.difficulty === "famous" ? "Más Conocidas" : "Mezcladas"}
              </p>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="text-right">
                <p className="text-sm text-gray-500">Puntos</p>
                <p className="text-2xl font-bold text-blue-600">{gameState.score}</p>
              </div>
              <GameTimer
                startTime={gameState.startTime}
                onTimeUpdate={setTimeElapsed}
                className="text-blue-600"
              />
              {/* Switch de estilo detallado */}
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                <span className="whitespace-nowrap">Bandera detallada</span>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={isDetailed}
                    onChange={(e) => setIsDetailed(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
            </div>
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Salir
              </button>
            )}
          </div>
          {/* Barra de progreso */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((gameState.currentQuestion + 1) / config.size) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Pregunta */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 transition-[height] duration-300 ease-in-out">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            ¿De qué país es esta bandera?
          </h3>
          
          <div className="flex justify-center mb-8">
            <div
              className={`transition-all duration-300 ${
                showResult
                  ? isCorrect
                    ? "scale-105 shadow-2xl ring-4 ring-green-400"
                    : "scale-105 shadow-2xl ring-4 ring-red-400"
                  : "hover:scale-105 hover:shadow-xl"
              }`}
            >
              <Flag
                countryCode={currentQuestion.countryCode}
                isDetailed={isDetailed}
                size={240}
                countryName={currentQuestion.countryName}
              />
            </div>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = option === currentQuestion.correctAnswer;

              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium text-lg ";
              
              if (showResult) {
                if (isCorrectOption) {
                  buttonClass += "bg-green-500 text-white border-green-600 shadow-lg";
                } else if (isSelected && !isCorrectOption) {
                  buttonClass += "bg-red-500 text-white border-red-600 shadow-lg";
                } else {
                  buttonClass += "bg-gray-100 text-gray-500 border-gray-200";
                }
              } else {
                buttonClass += "bg-blue-50 hover:bg-blue-100 text-gray-800 border-blue-200 hover:border-blue-400 hover:shadow-md cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white bg-opacity-50 flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showResult && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-semibold animate-slide-up ${
                isCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isCorrect ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  ¡Correcto! +{Math.round((100 + Math.max(0, 30 - timeElapsed) * 2) * (config.difficulty === "mixed" ? 1.5 : 1) * (config.size === 25 ? 1.5 : 1))} puntos
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Incorrecto. La respuesta correcta es: {currentQuestion.correctAnswer}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;

