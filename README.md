# Pulseboard API (NestJS)

NestJS backend skeleton with:
- Fail-fast environment validation (Zod)
- Strict TypeScript
- Husky + lint-staged (blocks bad commits)
- Clean structure designed to grow into AWS + Docker deployments
- DTO validation (ValidationPipe + class-validator)

## Requirements
- Node.js (LTS recommended)
- npm

## Getting started

```bash
npm install
cp .env.example .env
npm run start:dev
```

Then open Swagger docs:
- http://localhost:3000/docs


## API
- `GET /targets` — list monitoring targets
- `POST /targets/http` — create HTTP monitoring target
- `GET /targets/:id/status` — latest check status


## Scripts

- `npm run start:dev` — run in watch mode
- `npm run start` — run normally
- `npm run build` — build production output to `dist/`
- `npm run lint` — eslint (fails on warnings)
- `npm run format` — run Prettier across the repo
- `npm run typecheck` — TypeScript compile check (no emit)
- `npm test` — unit tests

## Configuration (fail-fast)

Environment variables are validated at startup using Zod.  
If configuration is invalid, the app crashes before starting (fail-fast).

Files:

- `src/config/env.ts` — Zod schema + env parsing / validation (single source of truth)
- `src/config/app-config.service.ts` — typed access to config via Nest DI

## Architecture (boring on purpose)

This project aims to stay clean and reusable as a template.

Main structure:

- `src/config/*` — configuration schema + DI wrapper
- `src/app.module.ts` — main root module
- `src/main.ts` — Nest bootstrap + server startup

## Development principles

- Prefer clarity over cleverness
- Keep modules boring and testable
- Avoid accessing `process.env` outside `src/config/env.ts`
- Use strict typing (fail early)
- Keep git history clean (Husky gates)

## Roadmap

Planned additions (incremental):

- Dockerfile + docker-compose (local development)
- Health endpoints + monitoring
- Logging + request correlation IDs
- AWS deployment playground
  - EC2 deployment first
  - later: Lambda-style work (serverless patterns)
- Optional worker process (queue / cron style)

## Database