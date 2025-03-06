import express, { Express, Request, Response } from 'express';
import { PORT } from './secret';
import rootRoutes from './routes';
import { PrismaClient } from '@prisma/client';
import { errorMiddleware } from './middlewares/errors';
import { setupSwagger } from './swagger';

const app: Express = express();

app.use(express.json());

setupSwagger(app);
app.use('/api', rootRoutes);

export const prismaClient = new PrismaClient({
    log: ['query']
}).$extends({
    result:{
        address:{
            formattedAdress:{
                needs:{
                    lineOne: true,
                    lineTwo: true,
                    city: true,
                    country: true,
                    pinCode: true,
                },
                compute: (addr) =>{
                    return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}, ${addr.pinCode}`;
                }

            }
        }
    }
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
})