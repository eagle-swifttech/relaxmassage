-- CreateEnum
CREATE TYPE "BranchStatus" AS ENUM ('OPEN', 'CLOSED', 'MAINTENANCE');

-- CreateTable
CREATE TABLE "Company" (
    "com_id" SERIAL NOT NULL,
    "com_name" TEXT NOT NULL,
    "com_description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("com_id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "bh_id" SERIAL NOT NULL,
    "bh_name" TEXT NOT NULL,
    "bh_address" TEXT,
    "bh_phone" TEXT,
    "bh_status" "BranchStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("bh_id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "dep_id" SERIAL NOT NULL,
    "dep_en_name" TEXT NOT NULL,
    "dep_th_name" TEXT NOT NULL,
    "dep_short_name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("dep_id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "emp_id" SERIAL NOT NULL,
    "emp_name" TEXT NOT NULL,
    "emp_email" TEXT NOT NULL,
    "emp_password" TEXT NOT NULL,
    "emp_phone" TEXT,
    "emp_bd" TIMESTAMP(3),
    "emp_gender" TEXT,
    "emp_img" TEXT,
    "position" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dep_id" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("emp_id")
);

-- CreateTable
CREATE TABLE "CategoryInventory" (
    "civt_id" SERIAL NOT NULL,
    "civt_name" TEXT NOT NULL,
    "civt_description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryInventory_pkey" PRIMARY KEY ("civt_id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "ivt_id" SERIAL NOT NULL,
    "ivt_name" TEXT NOT NULL,
    "ivt_quantity" INTEGER NOT NULL DEFAULT 0,
    "ivt_purchase_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "civt_id" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("ivt_id")
);

-- CreateTable
CREATE TABLE "CategoryInvestment" (
    "civm_id" SERIAL NOT NULL,
    "civm_name" TEXT NOT NULL,
    "civm_description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryInvestment_pkey" PRIMARY KEY ("civm_id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "ivm_id" SERIAL NOT NULL,
    "ivm_name" TEXT NOT NULL,
    "ivm_amount" DOUBLE PRECISION NOT NULL,
    "ivm_investment_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "civm_id" INTEGER NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("ivm_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_emp_email_key" ON "Employee"("emp_email");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("com_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_dep_id_fkey" FOREIGN KEY ("dep_id") REFERENCES "Departments"("dep_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("com_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("bh_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_civt_id_fkey" FOREIGN KEY ("civt_id") REFERENCES "CategoryInventory"("civt_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("com_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("bh_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_civm_id_fkey" FOREIGN KEY ("civm_id") REFERENCES "CategoryInvestment"("civm_id") ON DELETE RESTRICT ON UPDATE CASCADE;
