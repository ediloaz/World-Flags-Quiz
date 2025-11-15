# 🚀 Guía de Configuración - Bandera Rush

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
# o
pnpm install
# o
yarn install
```

2. Configura las variables de entorno:
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Agrega tu Site Key de Cloudflare Turnstile:
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=tu_site_key_aqui
```

## 🔐 Configurar Cloudflare Turnstile (Captcha)

1. Visita [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo sitio
4. Copia tu Site Key pública
5. Agrega la clave a `.env.local`

**Nota:** Para desarrollo, puedes usar la clave de prueba: `1x00000000000000000000AA`

## 🎮 Ejecutar el Proyecto

```bash
npm run dev
# o
pnpm dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Backend (Opcional)

El proyecto está preparado para conectarse a un backend. Por ahora, usa una simulación en memoria.

Para conectar a tu backend real:

1. Actualiza la URL en `.env.local`:
```
NEXT_PUBLIC_API_URL=https://tu-backend.com
```

2. El backend debe implementar estos endpoints:
   - `GET /api/ranking?difficulty={difficulty}&size={size}` - Obtener ranking
   - `POST /api/ranking` - Guardar resultado del juego

### Estructura de datos esperada:

**POST /api/ranking:**
```json
{
  "playerName": "string",
  "score": number,
  "time": number,
  "correctAnswers": number,
  "totalQuestions": number,
  "difficulty": "famous" | "mixed",
  "size": 10 | 25,
  "captchaToken": "string"
}
```

**GET /api/ranking:**
Retorna:
```json
{
  "rankings": [
    {
      "id": "string",
      "playerName": "string",
      "score": number,
      "time": number,
      "correctAnswers": number,
      "totalQuestions": number,
      "difficulty": "famous" | "mixed",
      "size": 10 | 25,
      "timestamp": "ISO string",
      "rank": number
    }
  ]
}
```

## 📝 Componente Flag

El componente `Flag` está listo para usar:

```tsx
import Flag from "@/components/Flag";

// Bandera detallada (SVG de country-flag-icons)
<Flag countryCode="US" isDetailed={true} size={240} />

// Bandera simple (emoji/SVG de react-country-flag)
<Flag countryCode="ES" isDetailed={false} size={64} />
```

## 🎯 Sistema de Puntos

- **Base:** 100 puntos por respuesta correcta
- **Bonus de velocidad:** (30 - tiempo en segundos) × 2
- **Multiplicador de dificultad:** 
  - Más Conocidas: ×1
  - Mezcladas: ×1.5
- **Multiplicador de cantidad:**
  - 10 banderas: ×1
  - 25 banderas: ×1.5

**Fórmula final:**
```
Puntos = (100 + bonus_velocidad) × multiplicador_dificultad × multiplicador_cantidad
```

## 🏆 Ranking

El ranking se ordena por:
1. Puntos (mayor a menor)
2. Tiempo (menor a mayor) - en caso de empate

El ranking más alto se obtiene jugando:
- Modo: **Mezcladas**
- Cantidad: **25 banderas**

## 🚢 Despliegue

El proyecto está listo para desplegar en:
- Vercel (recomendado para Next.js)
- Netlify
- Cualquier plataforma que soporte Next.js

**Nota:** Asegúrate de configurar las variables de entorno en tu plataforma de despliegue.

