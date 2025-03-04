import { Request, Response, NextFunction } from 'express';
import { HttpException } from './exceptions/root';
import { InternalException } from './exceptions/internal-exception';

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error: any) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                exception = new InternalException("Something went wrong", 3001, error);
            }
            next(exception);
        }
    }
}