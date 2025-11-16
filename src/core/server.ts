import Fastify from 'fastify';
import formbody from '@fastify/formbody';
import { loadEnv } from '../config/env';
import { healthRoutes } from '../routes/health';
import { workflowRoutes } from '../routes/workflows';

export const buildServer = () => {
  const env = loadEnv();
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
    ajv: {
      customOptions: {
        removeAdditional: 'all',
        coerceTypes: true,
      },
    },
  });

  app.decorate('env', env);

  app.register(formbody);
  app.register(healthRoutes, { prefix: '/health' });
  app.register(workflowRoutes, { prefix: '/api/workflows' });

  return app;
};
