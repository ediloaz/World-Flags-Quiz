export type ScorePayload = {
  nickname: string;
  difficulty: string;
  totalFlags: number;
  accuracy: number;
  elapsedSeconds: number;
};

export type RankingEntry = ScorePayload & {
  id: string;
  countryCode: string;
  createdAt: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://backend.world-flags-arena.test";

async function safeFetch<T>(url: string, init?: RequestInit, fallback: T): Promise<T> {
  try {
    const response = await fetch(url, init);
    if (!response.ok) {
      throw new Error("Bad response");
    }
    return (await response.json()) as T;
  } catch (error) {
    console.warn("API fallback activado", error);
    return fallback;
  }
}

export async function fetchRanking(): Promise<RankingEntry[]> {
  return safeFetch<RankingEntry[]>(
    `${API_BASE}/ranking`,
    { cache: "no-store" },
    [
      {
        id: "demo-1",
        nickname: "CursorHero",
        difficulty: "Legend Mix",
        totalFlags: 25,
        accuracy: 0.92,
        elapsedSeconds: 75,
        countryCode: "AR",
        createdAt: new Date().toISOString()
      }
    ]
  );
}

export async function submitScore(payload: ScorePayload): Promise<void> {
  await safeFetch(
    `${API_BASE}/score`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    },
    undefined
  );
}
