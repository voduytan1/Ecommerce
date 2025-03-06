import morgan from 'morgan';
import logger from './logger';
import { Request, Response } from 'express';
// Define the type for the morgan stream
interface MorganStreamInterface {
    write: (message: string) => void;
}

const morganStream: MorganStreamInterface = {
    write: (message: string) => {
        logger.info(message.trim());
    }
};

// Create a custom token to help with debugging if needed
morgan.token('status-type', (req, res) => {
    const status = res.statusCode;
    return status < 400 ? 'success' : 'error';
});

const morganMiddleware = morgan(
    //define log format
    ':method :url :status :res[content-length] - :response-time ms',
    {
        // Skip logging for successful responses (optional)
        skip: (req:Request, res:Response) => {
            return res.statusCode < 400;
        },
        stream: morganStream
    }
);

export default morganMiddleware;