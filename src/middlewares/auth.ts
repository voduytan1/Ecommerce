import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secret";
import { prismaClient } from "..";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    //1. extract the token from the request header
    const token = req.headers.authorization;
    //2. if the token is not present, throw an error of unauthorized
    if (!token) {
        return next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
    try {
        //3. if the token is present, verify the token and extract the payload
        const payload: { userId: number } = jwt.verify(token as string, JWT_SECRET) as any;
        //4. to get the user from the payload
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            return next(new UnauthorizedException('User not found', ErrorCode.UNAUTHORIZED));
        }
        //5. to attach the user to the request object
        req.user = user as any;
        next();
    } catch (error) {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
    }
}

export default authMiddleware;