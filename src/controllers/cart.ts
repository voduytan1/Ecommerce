import { Request, Response } from 'express';
import { ChangeQuantitySchema, CreateCartSchema } from '../schema/cart';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { Product } from '@prisma/client';
import { prismaClient } from '..';
import logger from '../middlewares/logger';
import { log } from 'console';


export const addItemToCart = async (req: Request, res: Response) => {
    const validatedData = CreateCartSchema.parse(req.body);
    let product:Product;
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId
            }
        });
    }catch(error){
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
    const cart = await prismaClient.cartItem.create({
        data: {
            userId: req.user!.id,
            productId: product.id,
            quantity: validatedData.quantity
        }
    });
    logger.info(`Product ${product.name} added to cart`);
    res.json(cart);
};

export const deleteItemFromCart = async (req: Request, res: Response) => {
    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    });
    logger.info(`Item deleted from cart`);
    res.json({message: "Item deleted from cart"});
};

export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body);
    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validatedData.quantity
        }
    });
    logger.info(`product ${req.params.id} change quantity into ${validatedData.quantity}`);
    res.json(updatedCart);

};

export const getCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user!.id
        },
        include: {
            product: true
        }
    });
    logger.info(`Cart fetched`);
    res.json(cart);
};