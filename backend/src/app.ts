import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import membershipRoutes from './routes/membership';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/membership', membershipRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;
