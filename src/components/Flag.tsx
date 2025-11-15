"use client";

import type { ComponentType } from "react";
import ReactCountryFlag from "react-country-flag";
import * as FlagIcons from "country-flag-icons/react/3x2";

export type FlagProps = {
  countryCode: string;
  isDetailed: boolean;
  size?: number;
  className?: string;
};

const FALLBACK_CODE = "UN";

const iconMap = FlagIcons as Record<string, ComponentType<{ title?: string; className?: string }>>;

export default function Flag({ countryCode, isDetailed, size = 120, className }: FlagProps) {
  const normalizedCode = countryCode?.toUpperCase();
  const dimension = Math.max(32, Math.min(size, 240));

  if (!normalizedCode || normalizedCode.length !== 2) {
    return (
      <div
        role="img"
        aria-label="bandera desconocida"
        className={`flex items-center justify-center rounded-lg border border-dashed border-slate-500 text-xs uppercase tracking-widest ${className ?? ""}`.trim()}
        style={{ width: dimension, height: dimension * 0.66 }}
      >
        {FALLBACK_CODE}
      </div>
    );
  }

  if (isDetailed) {
    const DetailedFlag = iconMap[normalizedCode];
    if (DetailedFlag) {
      return (
        <DetailedFlag
          title={normalizedCode}
          className={className}
          style={{ width: dimension, height: dimension * (2 / 3) }}
        />
      );
    }
  }

  return (
    <ReactCountryFlag
      svg
      countryCode={normalizedCode}
      aria-label={`bandera ${normalizedCode}`}
      className={className}
      style={{ width: dimension, height: dimension * 0.66, fontSize: dimension * 0.6 }}
    />
  );
}
