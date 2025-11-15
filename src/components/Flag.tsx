"use client";

import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import * as Flags from "country-flag-icons/react/3x2";

type CountryCode = string;

interface FlagProps {
  countryCode: CountryCode;
  isDetailed: boolean;
  size?: number;
  countryName?: string; // Nombre del país para alt text SEO
}

/**
 * Componente Flag para mostrar banderas de países
 * 
 * @param countryCode - Código ISO del país (ej: 'US', 'ES', 'FR')
 * @param isDetailed - Si es true usa SVG detallado, si es false usa emoji/SVG simple
 * @param size - Tamaño opcional en píxeles (default: 64)
 */
const Flag: React.FC<FlagProps> = ({ 
  countryCode, 
  isDetailed, 
  size = 64,
  countryName
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validaciones
  if (!countryCode || typeof countryCode !== "string") {
    console.warn("Flag: countryCode debe ser un string válido");
    return (
      <div 
        className="bg-gray-200 flex items-center justify-center rounded"
        style={{ width: size, height: size }}
      >
        <span className="text-gray-400 text-xs">?</span>
      </div>
    );
  }

  const normalizedCode = countryCode.toUpperCase().trim();
  const altText = countryName 
    ? `Bandera de ${countryName}` 
    : `Bandera del país con código ${normalizedCode}`;

  if (normalizedCode.length !== 2) {
    console.warn(`Flag: countryCode debe tener 2 caracteres. Recibido: ${normalizedCode}`);
    return (
      <div 
        className="bg-gray-200 flex items-center justify-center rounded"
        style={{ width: size, height: size }}
      >
        <span className="text-gray-400 text-xs">?</span>
      </div>
    );
  }

  if (size && (size < 16 || size > 512)) {
    console.warn("Flag: size debe estar entre 16 y 512 píxeles");
  }

  const validSize = Math.max(16, Math.min(512, size || 64));

  // Mostrar placeholder mientras se carga en el cliente
  if (!mounted) {
    return (
      <div 
        className="bg-gray-100 animate-pulse rounded border border-gray-200"
        style={{ width: validSize, height: (validSize * 2) / 3 }}
      />
    );
  }

  const FlagComponent = Flags[normalizedCode as keyof typeof Flags];

  try {
    if (isDetailed) {
      return (
        <div 
          className="flex items-center justify-center rounded overflow-hidden shadow-sm border border-gray-200 bg-white transition-[height] duration-300 ease-in-out"
          style={{ width: validSize, height: 'auto' }}
        >
          <ReactCountryFlag
            countryCode={normalizedCode}
            svg
            style={{
              width: validSize,
              height: 'auto',
            }}
            title={countryName || normalizedCode}
            aria-label={altText}
          />
        </div>
      );
    } else if (FlagComponent) {
      return (
        <div 
          className="flex items-center justify-center rounded overflow-hidden shadow-sm border border-gray-200 bg-white transition-[height] duration-300 ease-in-out"
          style={{ width: validSize, height: 'auto' }}
          role="img"
          aria-label={altText}
        >
          <FlagComponent 
            style={{ 
              width: validSize, 
              height: 'auto',
            }}
            aria-label={altText}
            title={countryName || normalizedCode}
          />
        </div>
      );
    }
  } catch (error) {
    console.error(`Flag: Error al cargar bandera para ${normalizedCode}:`, error);
    return (
      <div 
        className="bg-gray-200 flex items-center justify-center rounded border border-gray-300"
        style={{ width: validSize, height: validSize }}
      >
        <span className="text-gray-400 text-xs">{normalizedCode}</span>
      </div>
    );
  }
};

export default Flag;

