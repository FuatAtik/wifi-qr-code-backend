import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/auth';
import qrcodeRoutes from './routes/qrcode';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins in development - configure this properly in production
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for health check
app.get('/', (req, res) => {
  res.json({ message: 'WiFi QR Code Backend API is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/qrcodes', qrcodeRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server if not running in Vercel
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// Export app for Vercel
export default app;
