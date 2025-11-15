"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Captcha from "@/components/Captcha";
import type { GameConfig } from "@/lib/types";

export default function HomeClient() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<"famous" | "mixed">("famous");
  const [size, setSize] = useState<10 | 25>(10);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);

  const handleStartGame = () => {
    if (!playerName.trim()) {
      alert("Por favor, ingresa tu nombre");
      return;
    }

    // Guardar nombre del jugador
    localStorage.setItem("playerName", playerName.trim());

    // Si no hay token, mostrar captcha
    const savedToken = localStorage.getItem("captcha_token");
    if (!savedToken) {
      setShowCaptcha(true);
      return;
    }

    // Iniciar juego
    const config: GameConfig = { difficulty, size };
    localStorage.setItem("gameConfig", JSON.stringify(config));
    router.push("/game");
  };

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token);
    setShowCaptcha(false);
    const config: GameConfig = { difficulty, size };
    localStorage.setItem("gameConfig", JSON.stringify(config));
    router.push("/game");
  };

  // Cargar nombre guardado si existe
  React.useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          {/* Título */}
          <header className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              World Flags Quiz - Global Flag Guessing Game
            </h1>
            <p className="text-gray-600 text-lg">
              Adivina banderas del mundo y compite en el ranking global
            </p>
          </header>

          {/* Texto descriptivo para SEO */}
          <section className="mb-6 text-center text-gray-700" aria-label="Descripción del juego">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Juego Educativo de Geografía
            </h2>
            <p className="text-base leading-relaxed">
              World Flags Quiz es un juego educativo de geografía donde puedes poner a prueba tus conocimientos sobre las banderas del mundo. 
              Este Global Flag Quiz Game te desafía a identificar banderas de diferentes países mientras compites contra el tiempo. 
              Elige entre diferentes niveles de dificultad, desde banderas más conocidas hasta desafíos mixtos, y escala en el ranking global. 
              Perfecto para estudiantes, amantes de la geografía y cualquier persona que quiera aprender sobre los países del mundo de forma divertida.
            </p>
          </section>

          {!showCaptcha ? (
            <>
              {/* Input nombre */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tu nombre
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg text-gray-900 placeholder-gray-400 bg-white"
                  maxLength={30}
                />
              </div>

              {/* Dificultad */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Dificultad
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDifficulty("famous")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      difficulty === "famous"
                        ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-2">🌍</div>
                    <div className="font-semibold text-gray-800">Más Conocidas</div>
                    <div className="text-sm text-gray-500 mt-1">Nivel fácil</div>
                  </button>
                  <button
                    onClick={() => setDifficulty("mixed")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      difficulty === "mixed"
                        ? "border-purple-500 bg-purple-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-2">🌎</div>
                    <div className="font-semibold text-gray-800">Mezcladas</div>
                    <div className="text-sm text-gray-500 mt-1">Nivel difícil</div>
                    <div className="text-xs text-purple-600 font-bold mt-2">🏆 Ranking Global</div>
                  </button>
                </div>
              </div>

              {/* Tamaño del juego */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Cantidad de banderas
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSize(10)}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      size === 10
                        ? "border-green-500 bg-green-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="font-bold text-2xl text-gray-800">10</div>
                    <div className="text-sm text-gray-500">Rápido</div>
                  </button>
                  <button
                    onClick={() => setSize(25)}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      size === 25
                        ? "border-orange-500 bg-orange-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="font-bold text-2xl text-gray-800">25</div>
                    <div className="text-sm text-gray-500">Completo</div>
                    <div className="text-xs text-orange-600 font-bold mt-1">🏆 Ranking Global</div>
                  </button>
                </div>
              </div>

              {/* Botón iniciar */}
              <button
                onClick={handleStartGame}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                🎮 Comenzar Juego
              </button>

              {/* Link al ranking */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => router.push("/ranking")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Ver Ranking Global →
                </button>
              </div>
            </>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Verificación de seguridad
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Completa la verificación para comenzar el juego
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

        {/* Footer */}
        <div className="text-center mt-6 text-white text-sm">
          <p>Hecho con ❤️ por <a href="https://www.ediloaz.com/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-blue-300">ediloaz</a> para amantes de la geografía</p>
        </div>
      </div>
    </div>
  );
}

