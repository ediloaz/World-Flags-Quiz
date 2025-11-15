"use client";

import { useEffect, useState } from "react";

export type CaptchaGateProps = {
  verified: boolean;
  onVerify: () => void;
};

export default function CaptchaGate({ verified, onVerify }: CaptchaGateProps) {
  const [value, setValue] = useState(0);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    if (verified) {
      return;
    }
    if (value >= 95 && !cooldown) {
      setCooldown(true);
      const timeout = setTimeout(() => {
        onVerify();
        setCooldown(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [value, onVerify, verified, cooldown]);

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-4">
      <p className="text-sm font-semibold text-slate-100">Checkpoint anti-bots</p>
      <p className="text-xs text-slate-400">
        Arrastra el control hasta el 100% para desbloquear el modo competitivo.
      </p>
      <div className="relative h-14 rounded-xl bg-slate-800/60 p-3">
        <input
          type="range"
          min={0}
          max={100}
          value={verified ? 100 : value}
          onChange={(event) => setValue(Number(event.target.value))}
          disabled={verified}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700"
        />
        <div
          className={`mt-2 text-center text-xs font-semibold ${
            verified ? "text-emerald-400" : "text-slate-300"
          }`}
        >
          {verified ? "Verificado" : `Progreso ${Math.round(value)}%`}
        </div>
        {!verified && cooldown && (
          <p className="mt-2 text-center text-[10px] text-amber-300">Validando movimiento...</p>
        )}
      </div>
    </div>
  );
}
