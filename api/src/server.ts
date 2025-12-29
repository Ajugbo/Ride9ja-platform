// Main server file - This starts our API server
import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { authRoutes } from './routes/auth';
import { healthRoutes } from './routes/health';
import { userRoutes } from './routes/users';

// Create Fastify server
const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
});

// Register plugins
async function registerPlugins() {
  // Security headers
  await app.register(helmet);
  
  // CORS - allow requests from any origin in development
  await app.register(cors, {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://ajugbo.github.io']  // Your frontend URL
      : '*',  // Allow all in development
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
}

// Register routes
async function registerRoutes() {
  // Health routes (no auth required)
  await app.register(healthRoutes);
  
  // Auth routes (no auth required)
  await app.register(authRoutes, { prefix: '/auth' });
  
  // User routes
  await app.register(userRoutes, { prefix: '/api' });
  
  // 404 handler
  app.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      error: 'Route not found',
      path: request.url,
      method: request.method,
    });
  });
}

// Start server
async function startServer() {
  try {
    // Register plugins
    await registerPlugins();
    
    // Register routes
    await registerRoutes();
    
    // Get port from environment or default to 3000
    const port = parseInt(process.env.PORT || '3000');
    const host = process.env.HOST || '0.0.0.0';
    
    // Start listening
    await app.listen({ port, host });
    
    console.log(`🚀 Ride9ja API server running at http://${host}:${port}`);
    console.log(`📚 Health check: http://${host}:${port}/health`);
    console.log(`🔐 Auth endpoints: http://${host}:${port}/auth/signup`);
    
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await app.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await app.close();
  process.exit(0);
});

// Start the server
startServer();
