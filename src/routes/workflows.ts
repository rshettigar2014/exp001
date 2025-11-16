import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { getWorkflowEngine } from '../workflows/engine';
import { workflowBlueprintSchema } from '../workflows/schema';

export const workflowRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  const engine = getWorkflowEngine();

  app.get('/', async () => ({
    prompt: engine.prompt,
    capabilities: engine.capabilities,
    registeredWorkflows: engine.listWorkflows(),
  }));

  app.post('/', async (request, reply) => {
    const parsed = workflowBlueprintSchema.safeParse(request.body);
    if (!parsed.success) {
      reply.status(400);
      return {
        message: 'Invalid workflow definition',
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      };
    }

    const record = engine.registerWorkflow(parsed.data);

    reply.status(201);
    return {
      message: 'Workflow registered',
      workflow: record,
    };
  });
};
