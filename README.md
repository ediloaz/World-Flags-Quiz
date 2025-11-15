# 🌍 World Flags Arena

Juego de banderas minimalista pero "wow" construido con **Next.js 14**, **React 18** y **Tailwind CSS**. Modo arcade, ranking público y preparado para conectarse a tu backend desde el día cero.

## ✨ Highlights
- ✅ Dos niveles pensados para viralizar: **Icono Pop** (banderas más conocidas) y **Legend Mix** (conocidas + poco vistas).
- ✅ Tamaños personalizados: partidas de **10** o **25** banderas, siendo el combo Legend Mix + 25 el ranking principal.
- ✅ Captcha táctil incorporado para mitigar bots antes de enviar puntajes.
- ✅ Timer visible + accuracy + puntaje listos para enviarse a tu API.
- ✅ Componente `Flag` reutilizable con `country-flag-icons/react/3x2` y `react-country-flag` según el detalle requerido.
- ✅ UI responsive, oscura y lista para SEO (App Router + metadata).

## 🧠 Arquitectura
```
src/
 ├─ app/
 │   ├─ layout.tsx        # Metadata + fuentes + estilos globales
 │   └─ page.tsx          # Vista principal, lógica de juego y llamadas al backend
 ├─ components/
 │   ├─ Flag.tsx          # Wrapper inteligente de banderas
 │   ├─ CaptchaGate.tsx   # Slider anti-bots
 │   ├─ DifficultySelector.tsx
 │   ├─ RankingBoard.tsx
 │   ├─ ScoreBoard.tsx
 │   └─ TimerBadge.tsx
 ├─ data/
 │   └─ countries.ts      # Pool de banderas por tier
 └─ lib/
     ├─ api.ts            # Fetch + submit contra backend externo
     └─ game.ts           # Utilidades para rounds, niveles y opciones
```

## 🚀 Comenzar
1. **Instala dependencias** (usa `pnpm`, `npm` o `yarn`).
   ```bash
   npm install
   ```
2. **Configura el endpoint** opcional para el backend público:
   ```bash
   cp .env.example .env.local
   # edita NEXT_PUBLIC_API_BASE_URL
   ```
3. **Levanta el entorno**
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:3000` y comienza a jugar.

> Nota: si el backend aún no existe, el ranking usa datos mock sin romper la UX.

## 🔌 Endpoints esperados
- `POST /score` — recibe `nickname`, `difficulty`, `totalFlags`, `accuracy`, `elapsedSeconds`.
- `GET /ranking` — devuelve el top global (se cachea solo en el backend). El cliente hace `fetch` y muestra fallback si falla.

## 🧰 Tech Stack
- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [country-flag-icons](https://github.com/hampusborgos/country-flags)
- [react-country-flag](https://github.com/danalloway/react-country-flag)

## 🧪 Scripts útiles
| Comando        | Descripción                            |
| -------------- | -------------------------------------- |
| `npm run dev`  | Modo desarrollo con recarga rápida     |
| `npm run build`| Compila la app para producción         |
| `npm run start`| Sirve la build de producción           |
| `npm run lint` | Ejecuta ESLint con la config de Next.js|

## 📄 Licencia
MIT — úsalo, modifica y publícalo en tu web personal.
