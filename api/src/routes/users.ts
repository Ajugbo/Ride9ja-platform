// User management routes
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function userRoutes(app: FastifyInstance) {
  // GET user by ID
  app.get('/users/:id', async (request, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });
      
      const { id } = paramsSchema.parse(request.params);
      
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
          vehicles: true,
          tripsAsRider: {
            take: 5,
            orderBy: { createdAt: 'desc' }
          },
        },
        select: {
          id: true,
          email: true,
          phone: true,
          name: true,
          role: true,
          verified: true,
          createdAt: true,
          profile: true,
          vehicles: true,
          tripsAsRider: {
            select: {
              id: true,
              origin: true,
              destination: true,
              status: true,
              fare: true,
              createdAt: true,
            }
          },
        }
      });
      
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      
      return { success: true, user };
      
    } catch (error) {
      console.error('Get user error:', error);
      return reply.status(400).send({ error: 'Invalid user ID' });
    }
  });

  // LIST drivers (with filters)
  app.get('/drivers', async (request, reply) => {
    try {
      const querySchema = z.object({
        verified: z.enum(['true', 'false']).optional(),
        limit: z.string().transform(Number).default('10'),
        page: z.string().transform(Number).default('1'),
      });
      
      const { verified, limit, page } = querySchema.parse(request.query);
      const skip = (page - 1) * limit;
      
      const where: any = {
        role: 'DRIVER',
      };
      
      if (verified) {
        where.verified = verified === 'true';
      }
      
      const [drivers, total] = await Promise.all([
        prisma.user.findMany({
          where,
          include: {
            profile: true,
            vehicles: true,
          },
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' }
        }),
        prisma.user.count({ where })
      ]);
      
      return {
        success: true,
        drivers,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        }
      };
      
    } catch (error) {
      console.error('List drivers error:', error);
      return reply.status(400).send({ error: 'Invalid query parameters' });
    }
  });
}
