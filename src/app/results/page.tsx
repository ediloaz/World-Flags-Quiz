"use client";

import React, { Suspense } from "react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">¡Excelente trabajo!</h1>
          <p className="text-gray-600">Tu resultado ha sido guardado</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 mb-6 text-white">
          <div className="text-center mb-6">
            <p className="text-sm opacity-90 mb-2">Puntos totales</p>
            <p className="text-6xl font-bold">{score.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm opacity-90 mb-1">Correctas</p>
              <p className="text-2xl font-bold">{correct}/{total}</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Porcentaje</p>
              <p className="text-2xl font-bold">{percentage}%</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Tiempo</p>
              <p className="text-2xl font-bold">{timeFormatted}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/ranking")}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🏆 Ver Ranking Global
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-gray-200 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-200"
          >
            🎮 Jugar de Nuevo
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}

