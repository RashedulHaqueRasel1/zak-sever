import express from 'express';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
import router from './routes';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
      origin: '*',
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Zakers Server API is running smoothly',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/v1', router);

app.use(notFound as never);
app.use(globalErrorHandler);

export default app;
