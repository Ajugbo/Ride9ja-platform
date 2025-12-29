// Health check and monitoring routes
import { FastifyInstance } from 'fastify';
import { testConnection } from '../lib/prisma';

export async function healthRoutes(app: FastifyInstance) {
  // Basic health check
  app.get('/health', async () => {
    const dbConnected = await testConnection();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbConnected ? 'connected' : 'disconnected',
      memory: process.memoryUsage(),
    };
  });

  // Simple ping endpoint
  app.get('/ping', async () => {
    return { message: 'pong', timestamp: new Date().toISOString() };
  });

  // Server info
  app.get('/info', async () => {
    return {
      service: 'Ride9ja API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      node: process.version,
    };
  });
}
