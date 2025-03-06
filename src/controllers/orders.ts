import { Request, Response } from 'express';
import { prismaClient } from '..';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { OrderEventStatus } from '@prisma/client';

export const createOrder = async (req: Request, res: Response) => {
    return await prismaClient.$transaction(async (tx) => {
        const cartItems = await tx.cartItem.findMany({
            where: {
                userId: req.user!.id
            }, include: {
                product: true
            }
        });
        
        if(cartItems.length === 0){
            return res.status(400).json({ message: "Cart is empty" });
        }
        
        const price = cartItems.reduce((prev, current)=>{
            return prev + (+current.product.price * current.quantity);
        }, 0);
        
        if (req.user!.defaultShippingAddress === null) {
            return res.status(400).json({ message: "Default shipping address is not set" });
        }
        
        const address = await tx.address.findFirst({
            where: {
                id: req.user!.defaultShippingAddress
            }
        });
        
        if (!address) {
            return res.status(400).json({ message: "Shipping address not found" });
        }
        
        const order = await tx.order.create({
            data: {
                userId: req.user!.id,
                netAmount: price,
                address: address.formattedAdress,
                products: { // Changed from 'products' to match your schema
                    create: cartItems.map((cart) => {
                        return {
                            productId: cart.productId,
                            quantity: cart.quantity
                        }
                    })
                }
            }
        });

        const orderEvent = await tx.orderEvent.create({
            data: {
                orderId: order.id,
            }
        });
        await tx.cartItem.deleteMany({
            where: {
                userId: req.user!.id
            }
        });
        return res.json(order);
    });
};

export const listOrder = async (req: Request, res: Response) => {
    const orders = await prismaClient.order.findMany({
        where: {
            userId: req.user!.id
        }
    });
    res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
    try{
        const order = await prismaClient.order.update({
            where: {
                id: +req.params.id
            },
            data:{
                status: OrderEventStatus.CANCELLED
            }
        });
        await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: OrderEventStatus.CANCELLED
            }
        });
        res.json(order);
    }catch{
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try{
        const order = await prismaClient.order.findFirstOrThrow({
            where: {
                id: +req.params.id
            },
            include: {
                products: true,
                events: true
                
            }
        });
        res.json(order);
    }catch{
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};

export const listAllOrders = async (req: Request, res: Response) => {
    // Define the type with optional status property
    let whereClause: { status?: OrderEventStatus } = {};
    
    const status = req.params.status;
    if (status && Object.values(OrderEventStatus).includes(status as OrderEventStatus)) {
        whereClause = {
            status: status as OrderEventStatus
        };
    }
    
    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip: +((req.query.skip as string) ?? 0),
        take: 5
    });
    
    res.json(orders);
}  

export const changeStatus = async (req: Request, res: Response) => {
    try{
        const order = await prismaClient.order.update({
            where: {
                id: +req.params.id
            },
            data:{
                status: req.body.status
            }
        });
        await prismaClient.orderEvent.create({
            data: {
                orderId: order.id,
                status: req.body.status
            }
        });
        res.json(order);
    }catch(error)
    {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND,error);
    }
}

export const listUserOrders = async (req: Request, res: Response) => {

    let whereClause: { userId: number; status?: OrderEventStatus } = {
        userId: +req.params.id
    };
    
    const status = req.params.status;
    if (status && Object.values(OrderEventStatus).includes(status as OrderEventStatus)) {
        whereClause = {
            ...whereClause,
            status: status as OrderEventStatus
        }
    }
    
    const orders = await prismaClient.order.findMany({
        where: whereClause,
        skip: +((req.query.skip as string) ?? 0),
        take: 5
    });
    
    res.json(orders);
}