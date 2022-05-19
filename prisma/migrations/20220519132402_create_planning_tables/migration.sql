-- CreateTable
CREATE TABLE "planningbycategory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "roof" INTEGER NOT NULL,
    "outlay" INTEGER NOT NULL,

    CONSTRAINT "planningbycategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthlyPlanning" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "roof" INTEGER NOT NULL,
    "outlay" INTEGER NOT NULL,

    CONSTRAINT "monthlyPlanning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planningbycategory" ADD CONSTRAINT "planningbycategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planningbycategory" ADD CONSTRAINT "planningbycategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthlyPlanning" ADD CONSTRAINT "monthlyPlanning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
