# Portfolio (Next.js + NestJS + PostgreSQL)

```
frontend/   Next.js site  -> Vercel (free)
backend/    NestJS API    -> Render (free)
docker-compose.yml        -> local Postgres + pgAdmin
```

## 1. Make it yours
Edit **`frontend/lib/data.ts`** (name, email, links, skills, experience). Put `cv.pdf` in `frontend/public/` and set `cv: '/cv.pdf'`.
Projects live in the database: edit/add rows in pgAdmin (table `project`). 3 sample rows are inserted automatically on first start.

## 2. Run locally
```bash
docker compose up -d          # Postgres + pgAdmin (http://localhost:5050, admin@local.dev / admin)
cd backend && cp .env.example .env && npm install
export $(grep -v '^#' .env | xargs) && npm run start:dev    # API on :4000
# new terminal
cd frontend && cp .env.example .env.local && npm install && npm run dev    # site on :3000
```
pgAdmin: Register Server -> Host `postgres`, Port `5432`, User/Password `postgres`, Database `portfolio`.

## 3. Deploy free
1. **Database (Neon.tech)**: create a project, copy the connection string. pgAdmin can connect to it too, using the host/user/password Neon shows.
2. **API (Render.com)**: New Web Service from your GitHub repo. Root Directory `backend`, Build `npm install && npm run build`, Start `npm start`. Env vars: `DATABASE_URL` (Neon string), `DATABASE_SSL=true`, `FRONTEND_URL` (your Vercel URL, add after step 3).
3. **Site (Vercel.com)**: Import the repo. Root Directory `frontend`. Env var: `NEXT_PUBLIC_API_URL=https://YOUR-API.onrender.com/api`.
4. Put the Vercel URL on your CV, then set `FRONTEND_URL` on Render to that URL.

Notes
- Render's free API sleeps when idle and can take about a minute to wake. The site has a built-in fallback, so recruiters always see your projects instantly; only the contact form needs the API awake. Opening `https://YOUR-API.onrender.com/api/health` wakes it.
- Free tier limits change, so check each provider's current plan.
- Read contact-form messages in pgAdmin (table `message`).
