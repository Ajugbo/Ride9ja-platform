// This file handles user authentication (signup/login)
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Hash password (securely)
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

// Verify password
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return await argon2.verify(hash, password);
}

// Create JWT token
export function createToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Extract user from request (we'll use this later)
export function getUserFromToken(token: string) {
  const payload = verifyToken(token);
  return payload ? { id: payload.userId, role: payload.role } : null;
}// This file handles user authentication (signup/login)
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Hash password (securely)
export async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password);
}

// Verify password
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return await argon2.verify(hash, password);
}

// Create JWT token
export function createToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
}

// Verify JWT token
export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Extract user from request (we'll use this later)
export function getUserFromToken(token: string) {
  const payload = verifyToken(token);
  return payload ? { id: payload.userId, role: payload.role } : null;
}
