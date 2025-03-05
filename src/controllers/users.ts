import { Request, Response } from "express";
import { AddressSchema, UpdateUserSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Address, User } from "@prisma/client";
import { prismaClient } from "..";
import { BadRequestException } from "../exceptions/bad-request";

export const addAddress = async (req: Request, res: Response) => {
  ////////////////////////
  const ModifiedAddressSchema = AddressSchema.omit({ userId: true });

  // Validate the request body against the modified schema
  ModifiedAddressSchema.parse(req.body);
  if (!req.user) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  const address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user.id,
    },
  });
  res.json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  /////////////////////
  try {
    await prismaClient.address.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ message: "Address deleted" });
  } catch (error) {
    throw new NotFoundException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
};

export const listAddress = async (req: Request, res: Response) => {
  /////////////////////
  const addresses = await prismaClient.address.findMany({
    where: {
      userId: req.user?.id,
    },
  });
  res.json(addresses);
};

export const updateUser = async (req: Request, res: Response) => {
  /////////////////////
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;

  if (validatedData.defaultShippingAddress === null) {
    throw new NotFoundException(
      "Default shipping address is null",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
  try {
    shippingAddress = await prismaClient.address.findFirstOrThrow({
      where: {
        id: validatedData.defaultShippingAddress,
      },
    });

  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  if (shippingAddress.userId !== req.user?.id) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.ADDRESS_DOES_NOT_BELONG
    );
  }


  if (validatedData.defaultBillingAddress === null) {
    throw new NotFoundException(
      "Default shipping address is null",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }
  try {
    billingAddress = await prismaClient.address.findFirstOrThrow({
      where: {
        id: validatedData.defaultBillingAddress,
      },
    });

  } catch (error) {
    throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
  }
  if (shippingAddress.userId !== req.user?.id) {
    throw new BadRequestException(
      "User not found",
      ErrorCode.ADDRESS_DOES_NOT_BELONG
    );
  }



  const updateData: any = {
    ...validatedData,
  };

  if (validatedData.name === null) {
    delete updateData.name;
  }

  if (validatedData.defaultShippingAddress === null) {
    delete updateData.defaultShippingAddress;
  }

  if (validatedData.defaultBillingAddress === null) {
    delete updateData.defaultBillingAddress;
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req.user?.id,
    },
    data: updateData,
  });
  res.json(updatedUser);
};
