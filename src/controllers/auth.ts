
import { Request, Response } from 'express';
import { prismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
        throw new Error('User already exists');
    }
    user = await prismaClient.user.create({
        data: {
            email,
            password: hashSync(password, 10),
            name
        }
    });
    res.json(user);
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