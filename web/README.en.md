> English translation of [README.md](README.md)

# Web (Next.js)

```bash
cd web
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000 — the form posts to `NEXT_PUBLIC_API_URL` (default: http://127.0.0.1:8000).

The backend must be running and CORS must allow the origin (`CORS_ORIGINS` in the backend `.env`).
