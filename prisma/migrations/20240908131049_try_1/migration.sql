-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('GASOLINE', 'DIESEL', 'ELECTRIC');

-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('AUTOMATIC', 'MANUAL', 'ROBOTIC');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "year" INTEGER NOT NULL,
    "engine" "EngineType" NOT NULL,
    "transmission" "TransmissionType",
    "range" INTEGER,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_brand_model_year_key" ON "Car"("brand", "model", "year");
