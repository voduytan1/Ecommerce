import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    res.status(status).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors
    })
}