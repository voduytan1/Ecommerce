import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found"
import { ErrorCode } from "../exceptions/root"
import { Request, Response } from "express";

export const createProduct = async (req: Request, res: Response) => {
    const product = await prismaClient.product.create({
        data:{
            ...req.body,
            tags: req.body.tags.join(",") //change from the array list into 'tag1,tag2' format
        }
    });
    res.json(product);
}

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const product = req.body;
        if(product.tags)
        {
            product.tags = product.tags.join(",");
        }
        const updateProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id // '+' operator convert string to number
            },
            data: product
        });
        res.json(updateProduct);
    }catch(error){
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try{
        const deleteProduct = await prismaClient.product.delete({
            where: {
                id: +req.params.id // '+' operator convert string to number
            },
        });
        res.json(deleteProduct);
    }catch(error){
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const listProduct = async (req: Request, res: Response) => {
    const skip = +(req.query.skip as string ?? 0);
    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({
        skip: skip,
        take: 5,
    });
    res.json({count, data:products});
}

export const getProductById = async (req: Request, res: Response) => {
    try{
        const product = await prismaClient.product.findUnique({
            where: {
                id: +req.params.id // '+' operator convert string to number
            }
        });
        res.json(product);
    }catch(error){
        console.log(error)
        throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const searchProduct = async (req: Request, res: Response) => {
    const product = await prismaClient.product.findMany({
        where: {
            name: {
                search: req.query.q?.toString()
            },
            description: {
                search: req.query.q?.toString()
            },
            tags: {
                search: req.query.q?.toString()
            }
        }
    });
    res.json(product);
}