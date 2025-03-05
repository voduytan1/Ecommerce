/*
  Warnings:

  - You are about to drop the column `pincode` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `pincode`,
    ADD COLUMN `pinCode` VARCHAR(191) NOT NULL DEFAULT '000000';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `defaultBillingAddress` INTEGER NULL,
    ADD COLUMN `defaultShippingAddress` INTEGER NULL;
