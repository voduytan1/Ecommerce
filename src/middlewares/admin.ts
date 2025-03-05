import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import { prismaClient } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
    if(user.role == 'ADMIN'){
        next();
    }else{
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
}

export default adminMiddleware;