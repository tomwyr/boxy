-- CreateEnum
CREATE TYPE "ItemRarity" AS ENUM ('common', 'rare', 'unique', 'epic', 'legendary');

-- CreateEnum
CREATE TYPE "BoxStatus" AS ENUM ('open', 'closed');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rarity" "ItemRarity" NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Box" (
    "id" TEXT NOT NULL,
    "status" "BoxStatus" NOT NULL,
    "rewardId" TEXT,

    CONSTRAINT "Box_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BoxToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Box_rewardId_key" ON "Box"("rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "_BoxToItem_AB_unique" ON "_BoxToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_BoxToItem_B_index" ON "_BoxToItem"("B");

-- AddForeignKey
ALTER TABLE "Box" ADD CONSTRAINT "Box_rewardId_fkey" FOREIGN KEY ("rewardId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToItem" ADD CONSTRAINT "_BoxToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Box"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoxToItem" ADD CONSTRAINT "_BoxToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
