-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EXECUTOR');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StatusTodo" AS ENUM ('ASSIGNED', 'INITIATED', 'FINISHED_SUCCESS', 'FINISHED_ERROR', 'ON_HOLD');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(85) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "email" VARCHAR(85) NOT NULL,
    "role" "Role" NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "comment" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "StatusTodo" NOT NULL,
    "executorId" INTEGER NOT NULL,

    CONSTRAINT "Todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
