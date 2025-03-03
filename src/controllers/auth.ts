
import { Request, Response, NextFunction } from 'express';
import { prismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret';
import { BadRequestException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/root';
import { UnprocessableEntity } from '../exceptions/validation';
import { SignUpSchema } from '../schema/users';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;
        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) {
            next(new BadRequestException('User already exists!', ErrorCode.USER_ALREADY_EXISTS));

        }
        user = await prismaClient.user.create({
            data: {
                email,
                password: hashSync(password, 10),
                name
            }
        });
        res.json(user);
    } catch (error: any) {
        next(new UnprocessableEntity('Unprocessable Entity', error?.issues, ErrorCode.UNPROCESSABLE_ENTITY));
    }
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    if (!compareSync(password, user.password)) {
        throw new Error('Incorrect password');
    }

    const token = jwt.sign({
        id: user.id,

    }, JWT_SECRET);
    res.json({ user, token });
}