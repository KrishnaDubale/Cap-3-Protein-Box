-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membershipEnd" TIMESTAMP(3),
ADD COLUMN     "membershipPlanId" TEXT,
ADD COLUMN     "membershipStart" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "MembershipPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "benefits" TEXT[],

    CONSTRAINT "MembershipPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_membershipPlanId_fkey" FOREIGN KEY ("membershipPlanId") REFERENCES "MembershipPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
