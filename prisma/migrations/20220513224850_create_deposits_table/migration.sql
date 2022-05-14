-- CreateTable
CREATE TABLE "deposits" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);
