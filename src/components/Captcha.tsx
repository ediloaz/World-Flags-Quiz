"use client";

import React, { useEffect, useRef } from "react";

interface CaptchaProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

/**
 * Componente Captcha usando Cloudflare Turnstile
 * Es moderno, rápido y sin fricción para los usuarios
 * Usa el script oficial de Cloudflare directamente
 */
const Captcha: React.FC<CaptchaProps> = ({ 
  siteKey, 
  onVerify, 
  onError,
  onExpire 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Auto-verificar si hay un token guardado
    const savedToken = localStorage.getItem("captcha_token");
    if (savedToken) {
      onVerify(savedToken);
      return;
    }

    // Cargar script de Cloudflare Turnstile
    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // Esperar a que el script cargue
    const initTurnstile = () => {
      if (typeof window !== "undefined" && (window as any).turnstile && containerRef.current) {
        const effectiveSiteKey = siteKey || "1x00000000000000000000AA";
        
        const widgetId = (window as any).turnstile.render(containerRef.current, {
          sitekey: effectiveSiteKey,
          callback: (token: string) => {
            localStorage.setItem("captcha_token", token);
            onVerify(token);
          },
          "error-callback": () => {
            localStorage.removeItem("captcha_token");
            onError?.();
          },
          "expired-callback": () => {
            localStorage.removeItem("captcha_token");
            onExpire?.();
          },
          theme: "light",
          size: "normal",
        });

        widgetIdRef.current = widgetId;
      }
    };

    // Intentar inicializar inmediatamente o esperar al evento load
    if ((window as any).turnstile) {
      initTurnstile();
    } else {
      window.addEventListener("load", initTurnstile);
      return () => {
        window.removeEventListener("load", initTurnstile);
        if (widgetIdRef.current && (window as any).turnstile) {
          (window as any).turnstile.remove(widgetIdRef.current);
        }
      };
    }

    return () => {
      if (widgetIdRef.current && (window as any).turnstile) {
        (window as any).turnstile.remove(widgetIdRef.current);
      }
    };
  }, [siteKey, onVerify, onError, onExpire]);

  return (
    <div className="flex justify-center items-center py-4">
      <div ref={containerRef} id="cf-turnstile-container"></div>
    </div>
  );
};

export default Captcha;

