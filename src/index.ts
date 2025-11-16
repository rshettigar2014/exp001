import { buildServer } from './core/server';

const start = async () => {
  const server = buildServer();
  const { PORT, HOST } = server.env;

  try {
    await server.listen({ port: PORT, host: HOST });
    server.log.info(`Workflow engine listening on http://${HOST}:${PORT}`);
  } catch (error) {
    server.log.error(error, 'Failed to start workflow engine');
    process.exit(1);
  }
};

void start();
