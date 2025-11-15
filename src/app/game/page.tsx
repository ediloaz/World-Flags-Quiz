"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game from "@/components/Game";
import type { GameConfig, GameResult } from "@/lib/types";

export default function GamePage() {
  const router = useRouter();
  const [config, setConfig] = useState<GameConfig | null>(null);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    // Cargar configuración del juego
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
    
    // Obtener nombre del jugador
    const playerName = localStorage.getItem("playerName") || "Anónimo";
    
    // Aquí se haría la llamada al backend
    // Por ahora, guardamos localmente
    try {
      const response = await fetch("/api/ranking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...result,
          playerName,
          captchaToken: localStorage.getItem("captcha_token"),
        }),
      });

      if (response.ok) {
        console.log("Resultado guardado en el ranking");
      }
    } catch (error) {
      console.error("Error al guardar resultado:", error);
    }

    // Redirigir a resultados después de 2 segundos
    setTimeout(() => {
      router.push(`/results?score=${result.score}&time=${result.time}&correct=${result.correctAnswers}&total=${result.totalQuestions}`);
    }, 2000);
  };

  const handleCancel = () => {
    if (confirm("¿Estás seguro de que quieres salir? Se perderá tu progreso.")) {
      router.push("/");
    }
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando juego...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Game config={config} onFinish={handleFinish} onCancel={handleCancel} />
      {gameResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 animate-slide-up">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              ¡Juego Completado!
            </h2>
            <div className="text-center space-y-2 mb-6">
              <p className="text-4xl font-bold text-blue-600">{gameResult.score} puntos</p>
              <p className="text-gray-600">
                {gameResult.correctAnswers} de {gameResult.totalQuestions} correctas
              </p>
              <p className="text-gray-600">
                Tiempo: {Math.floor(gameResult.time / 60)}:{(gameResult.time % 60).toString().padStart(2, "0")}
              </p>
            </div>
            <p className="text-center text-gray-500">
              Redirigiendo al ranking...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

