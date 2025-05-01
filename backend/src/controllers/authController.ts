import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../middleware/auth';
import User from '../models/User';

// In-memory storage for demo purposes
// In production, use a proper database
const users: User[] = [{
  id: 'admin-1',
  username: 'admin',
  password: '$2b$10$8eTmKorHCGgqxXvOeZwqc.YvT3U2hI6WMwTR.qKtLYaGHQEH0.Aqm', // hashed '123123aa'
  createdAt: new Date().toISOString()
}];

// Helper function to initialize admin password
const initializeAdminPassword = async () => {
  const adminUser = users.find(u => u.username === 'admin');
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('123123aa', 10);
    users.push({
      id: 'admin-1',
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date().toISOString()
    });
  }
};

// Initialize admin user
initializeAdminPassword();

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if username already exists
    if (users.some((user: User) => user.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: User = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Save user to in-memory storage
    users.push(newUser);

    // Generate token
    const token = generateToken({
      id: newUser.id,
      username: newUser.username
    });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Use in-memory users array
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      username: user.username
    });

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        isAdmin: user.username === 'admin'
      },
      success: true,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
