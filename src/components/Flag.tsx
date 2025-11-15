"use client";

import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import * as Flags from "country-flag-icons/react/3x2";

// Mapeo de códigos de país a componentes de banderas
const flagComponents: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  AD: Flags.AD,
  AE: Flags.AE,
  AF: Flags.AF,
  AG: Flags.AG,
  AI: Flags.AI,
  AL: Flags.AL,
  AM: Flags.AM,
  AO: Flags.AO,
  AQ: Flags.AQ,
  AR: Flags.AR,
  AS: Flags.AS,
  AT: Flags.AT,
  AU: Flags.AU,
  AW: Flags.AW,
  AX: Flags.AX,
  AZ: Flags.AZ,
  BA: Flags.BA,
  BB: Flags.BB,
  BD: Flags.BD,
  BE: Flags.BE,
  BF: Flags.BF,
  BG: Flags.BG,
  BH: Flags.BH,
  BI: Flags.BI,
  BJ: Flags.BJ,
  BL: Flags.BL,
  BM: Flags.BM,
  BN: Flags.BN,
  BO: Flags.BO,
  BQ: Flags.BQ,
  BR: Flags.BR,
  BS: Flags.BS,
  BT: Flags.BT,
  BV: Flags.BV,
  BW: Flags.BW,
  BY: Flags.BY,
  BZ: Flags.BZ,
  CA: Flags.CA,
  CC: Flags.CC,
  CD: Flags.CD,
  CF: Flags.CF,
  CG: Flags.CG,
  CH: Flags.CH,
  CI: Flags.CI,
  CK: Flags.CK,
  CL: Flags.CL,
  CM: Flags.CM,
  CN: Flags.CN,
  CO: Flags.CO,
  CR: Flags.CR,
  CU: Flags.CU,
  CV: Flags.CV,
  CW: Flags.CW,
  CX: Flags.CX,
  CY: Flags.CY,
  CZ: Flags.CZ,
  DE: Flags.DE,
  DJ: Flags.DJ,
  DK: Flags.DK,
  DM: Flags.DM,
  DO: Flags.DO,
  DZ: Flags.DZ,
  EC: Flags.EC,
  EE: Flags.EE,
  EG: Flags.EG,
  EH: Flags.EH,
  ER: Flags.ER,
  ES: Flags.ES,
  ET: Flags.ET,
  FI: Flags.FI,
  FJ: Flags.FJ,
  FK: Flags.FK,
  FM: Flags.FM,
  FO: Flags.FO,
  FR: Flags.FR,
  GA: Flags.GA,
  GB: Flags.GB,
  GD: Flags.GD,
  GE: Flags.GE,
  GF: Flags.GF,
  GG: Flags.GG,
  GH: Flags.GH,
  GI: Flags.GI,
  GL: Flags.GL,
  GM: Flags.GM,
  GN: Flags.GN,
  GP: Flags.GP,
  GQ: Flags.GQ,
  GR: Flags.GR,
  GS: Flags.GS,
  GT: Flags.GT,
  GU: Flags.GU,
  GW: Flags.GW,
  GY: Flags.GY,
  HK: Flags.HK,
  HM: Flags.HM,
  HN: Flags.HN,
  HR: Flags.HR,
  HT: Flags.HT,
  HU: Flags.HU,
  ID: Flags.ID,
  IE: Flags.IE,
  IL: Flags.IL,
  IM: Flags.IM,
  IN: Flags.IN,
  IO: Flags.IO,
  IQ: Flags.IQ,
  IR: Flags.IR,
  IS: Flags.IS,
  IT: Flags.IT,
  JE: Flags.JE,
  JM: Flags.JM,
  JO: Flags.JO,
  JP: Flags.JP,
  KE: Flags.KE,
  KG: Flags.KG,
  KH: Flags.KH,
  KI: Flags.KI,
  KM: Flags.KM,
  KN: Flags.KN,
  KP: Flags.KP,
  KR: Flags.KR,
  KW: Flags.KW,
  KY: Flags.KY,
  KZ: Flags.KZ,
  LA: Flags.LA,
  LB: Flags.LB,
  LC: Flags.LC,
  LI: Flags.LI,
  LK: Flags.LK,
  LR: Flags.LR,
  LS: Flags.LS,
  LT: Flags.LT,
  LU: Flags.LU,
  LV: Flags.LV,
  LY: Flags.LY,
  MA: Flags.MA,
  MC: Flags.MC,
  MD: Flags.MD,
  ME: Flags.ME,
  MF: Flags.MF,
  MG: Flags.MG,
  MH: Flags.MH,
  MK: Flags.MK,
  ML: Flags.ML,
  MM: Flags.MM,
  MN: Flags.MN,
  MO: Flags.MO,
  MP: Flags.MP,
  MQ: Flags.MQ,
  MR: Flags.MR,
  MS: Flags.MS,
  MT: Flags.MT,
  MU: Flags.MU,
  MV: Flags.MV,
  MW: Flags.MW,
  MX: Flags.MX,
  MY: Flags.MY,
  MZ: Flags.MZ,
  NA: Flags.NA,
  NC: Flags.NC,
  NE: Flags.NE,
  NF: Flags.NF,
  NG: Flags.NG,
  NI: Flags.NI,
  NL: Flags.NL,
  NO: Flags.NO,
  NP: Flags.NP,
  NR: Flags.NR,
  NU: Flags.NU,
  NZ: Flags.NZ,
  OM: Flags.OM,
  PA: Flags.PA,
  PE: Flags.PE,
  PF: Flags.PF,
  PG: Flags.PG,
  PH: Flags.PH,
  PK: Flags.PK,
  PL: Flags.PL,
  PM: Flags.PM,
  PN: Flags.PN,
  PR: Flags.PR,
  PS: Flags.PS,
  PT: Flags.PT,
  PW: Flags.PW,
  PY: Flags.PY,
  QA: Flags.QA,
  RE: Flags.RE,
  RO: Flags.RO,
  RS: Flags.RS,
  RU: Flags.RU,
  RW: Flags.RW,
  SA: Flags.SA,
  SB: Flags.SB,
  SC: Flags.SC,
  SD: Flags.SD,
  SE: Flags.SE,
  SG: Flags.SG,
  SH: Flags.SH,
  SI: Flags.SI,
  SJ: Flags.SJ,
  SK: Flags.SK,
  SL: Flags.SL,
  SM: Flags.SM,
  SN: Flags.SN,
  SO: Flags.SO,
  SR: Flags.SR,
  SS: Flags.SS,
  ST: Flags.ST,
  SV: Flags.SV,
  SX: Flags.SX,
  SY: Flags.SY,
  SZ: Flags.SZ,
  TC: Flags.TC,
  TD: Flags.TD,
  TF: Flags.TF,
  TG: Flags.TG,
  TH: Flags.TH,
  TJ: Flags.TJ,
  TK: Flags.TK,
  TL: Flags.TL,
  TM: Flags.TM,
  TN: Flags.TN,
  TO: Flags.TO,
  TR: Flags.TR,
  TT: Flags.TT,
  TV: Flags.TV,
  TW: Flags.TW,
  TZ: Flags.TZ,
  UA: Flags.UA,
  UG: Flags.UG,
  UM: Flags.UM,
  US: Flags.US,
  UY: Flags.UY,
  UZ: Flags.UZ,
  VA: Flags.VA,
  VC: Flags.VC,
  VE: Flags.VE,
  VG: Flags.VG,
  VI: Flags.VI,
  VN: Flags.VN,
  VU: Flags.VU,
  WF: Flags.WF,
  WS: Flags.WS,
  YE: Flags.YE,
  YT: Flags.YT,
  ZA: Flags.ZA,
  ZM: Flags.ZM,
  ZW: Flags.ZW,
};

type CountryCode = string;

interface FlagProps {
  countryCode: CountryCode;
  isDetailed: boolean;
  size?: number;
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
  size = 64 
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

  const FlagComponent = flagComponents[normalizedCode];

  try {
    if (isDetailed && FlagComponent) {
      return (
        <div 
          className="flex items-center justify-center rounded overflow-hidden shadow-sm border border-gray-200 bg-white"
          style={{ width: validSize, height: (validSize * 2) / 3 }}
        >
          
          <ReactCountryFlag
            countryCode={normalizedCode}
            svg
            style={{
              width: validSize,
              height: validSize,
            }}
            title={normalizedCode}
          />
        </div>
      );
    } else {
      return (
        <div 
          className="flex items-center justify-center rounded overflow-hidden shadow-sm border border-gray-200 bg-white"
          style={{ width: validSize, height: (validSize * 2) / 3 }}
        >
          <FlagComponent 
            style={{ 
              width: validSize, 
              height: (validSize * 2) / 3,
            }} 
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

