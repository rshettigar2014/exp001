## Enterprise Workflow Development Engine

Self-hosted TypeScript + Fastify agent framework for tenant-scoped tax compliance and advisory automation. The platform orchestrates MCP tools, browser automations, RBAC, low-code workflow design, and Kubernetes-native deployments.

### Key Capabilities
- Tenant-aware workflows defined per client + fiscal year with long-running context retention
- Consolidated tax compliance prompt baked into the engine for plan/response generation
- In-memory workflow registry with maker-checker role scaffolding
- Fastify API surface (`/health`, `/api/workflows`) ready to grow into MCP-aware endpoints
- Environment loader + Zod validation for secure configuration management
- TypeScript build, lint, and dev-server scripts for rapid iteration

### Getting Started
```bash
npm install
npm run dev       # start Fastify with ts-node-dev
npm run build     # emit dist/ artifacts
npm start         # run compiled server
npm run lint      # static analysis
```

API highlights:
- `GET /health` – basic readiness info
- `GET /api/workflows` – inspect system prompt, capability summary, and registered workflows
- `POST /api/workflows` – register a workflow blueprint (name, FY, jurisdictions, steps, etc.)

### Next Steps
- Persist workflow blueprints + audit logs in a tenant-safe store
- Implement RBAC middleware backed by the admin panel concept
- Wire MCP connectors + browser automation drivers
- Build low-code designer UI + deployment manifests for dev/prod Kubernetes clusters

Reference prompt lives in `src/config/prompt.ts` for re-use in downstream agent orchestration.
