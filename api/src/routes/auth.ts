// Authentication routes: Signup and Login
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { hashPassword, verifyPassword, createToken } from '../lib/auth';

// Validation schema for signup
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  phone: z.string().optional(),
  role: z.enum(['RIDER', 'DRIVER', 'ADMIN']).default('RIDER'),
});

// Validation schema for login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function authRoutes(app: FastifyInstance) {
  // SIGNUP endpoint
  app.post('/signup', async (request, reply) => {
    try {
      // Validate input
      const data = signupSchema.parse(request.body);
      
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });
      
      if (existingUser) {
        return reply.status(400).send({
          error: 'User already exists with this email'
        });
      }
      
      // Hash password
      const passwordHash = await hashPassword(data.password);
      
      // Create user
      const user = await prisma.user.create({
        data: {
          email: data.email,
          passwordHash,
          name: data.name,
          phone: data.phone,
          role: data.role,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        }
      });
      
      // Create profile
      await prisma.profile.create({
        data: {
          userId: user.id,
        }
      });
      
      // Create token
      const token = createToken(user.id, user.role);
      
      return {
        success: true,
        message: 'User created successfully',
        user,
        token,
      };
      
    } catch (error) {
      console.error('Signup error:', error);
      return reply.status(400).send({
        error: 'Invalid data provided'
      });
    }
  });

  // LOGIN endpoint
  app.post('/login', async (request, reply) => {
    try {
      const data = loginSchema.parse(request.body);
      
      // Find user
      const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: { profile: true }
      });
      
      if (!user || !user.passwordHash) {
        return reply.status(401).send({
          error: 'Invalid email or password'
        });
      }
      
      // Verify password
      const validPassword = await verifyPassword(user.passwordHash, data.password);
      
      if (!validPassword) {
        return reply.status(401).send({
          error: 'Invalid email or password'
        });
      }
      
      // Create token
      const token = createToken(user.id, user.role);
      
      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          verified: user.verified,
          profile: user.profile,
        },
        token,
      };
      
    } catch (error) {
      console.error('Login error:', error);
      return reply.status(400).send({
        error: 'Invalid credentials'
      });
    }
  });

  // GET CURRENT USER endpoint
  app.get('/me', async (request, reply) => {
    try {
      // Get token from header
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'No token provided' });
      }
      
      const token = authHeader.split(' ')[1];
      const { getUserFromToken } = await import('../lib/auth');
      const userData = getUserFromToken(token);
      
      if (!userData) {
        return reply.status(401).send({ error: 'Invalid token' });
      }
      
      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: userData.id },
        include: { profile: true }
      });
      
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }
      
      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          verified: user.verified,
          profile: user.profile,
          createdAt: user.createdAt,
        }
      };
      
    } catch (error) {
      console.error('Get me error:', error);
      return reply.status(500).send({ error: 'Server error' });
    }
  });
}
