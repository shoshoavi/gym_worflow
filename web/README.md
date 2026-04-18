# Web (Next.js)

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Öffne http://localhost:3000 — das Formular postet an `NEXT_PUBLIC_API_URL` (Standard: http://127.0.0.1:8000).

Backend muss laufen und CORS muss die Origin erlauben (`CORS_ORIGINS` im Backend-`.env`).
