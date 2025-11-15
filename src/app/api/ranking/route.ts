import { NextRequest, NextResponse } from "next/server";
import type { RankingEntry, GameResult } from "@/lib/types";

// Simulación de base de datos en memoria (en producción, usar una BD real)
let rankings: RankingEntry[] = [];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const difficulty = searchParams.get("difficulty");
    const size = searchParams.get("size");

    let filteredRankings = [...rankings];

    // Aplicar filtros
    if (difficulty && difficulty !== "all") {
      filteredRankings = filteredRankings.filter((r) => r.difficulty === difficulty);
    }

    if (size && size !== "all") {
      const sizeNum = parseInt(size);
      filteredRankings = filteredRankings.filter((r) => r.size === sizeNum);
    }

    // Ordenar por score descendente, luego por tiempo ascendente
    filteredRankings.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    });

    // Agregar posición (rank)
    const ranked = filteredRankings.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    return NextResponse.json({
      rankings: ranked.slice(0, 100), // Top 100
    });
  } catch (error) {
    console.error("Error al obtener ranking:", error);
    return NextResponse.json(
      { error: "Error al cargar ranking" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GameResult & { playerName: string; captchaToken?: string } =
      await request.json();

    // Validar captcha token (en producción, verificar con Cloudflare)
    if (!body.captchaToken) {
      return NextResponse.json(
        { error: "Token de captcha requerido" },
        { status: 400 }
      );
    }

    // Aquí validarías el token con Cloudflare Turnstile
    // const isValid = await verifyTurnstileToken(body.captchaToken);
    // if (!isValid) {
    //   return NextResponse.json({ error: "Captcha inválido" }, { status: 400 });
    // }

    // Crear entrada de ranking
    const entry: RankingEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      playerName: body.playerName || "Anónimo",
      score: body.score,
      time: body.time,
      correctAnswers: body.correctAnswers,
      totalQuestions: body.totalQuestions,
      difficulty: body.difficulty,
      size: body.size,
      timestamp: new Date().toISOString(),
    };

    // Agregar a rankings
    rankings.push(entry);

    // Mantener solo los top 1000
    rankings.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    });
    rankings = rankings.slice(0, 1000);

    return NextResponse.json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error("Error al guardar resultado:", error);
    return NextResponse.json(
      { error: "Error al guardar resultado" },
      { status: 500 }
    );
  }
}

