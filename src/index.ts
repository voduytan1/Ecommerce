import express, { Express, Request, Response } from 'express';
import { PORT } from './secret';
import rootRoutes from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';
const app: Express = express();

app.use(express.json());

app.use('/api', rootRoutes);

export const prismaClient = new PrismaClient({
    log: ['query']
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})