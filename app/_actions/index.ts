"use server";

import prisma from "@/lib/db";

export async function deleteTables() {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
  await prisma.enhancement.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.verificationToken.deleteMany();
}

export async function checkRemaining(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user?.remaining < 1) {
    throw new Error(
      "Sorry, You reached the maximum number of enhancements today!"
    );
  }
}

export async function repixAnalysis() {
  const users = await prisma.user.count();
  const enhanceed = await prisma.enhancement.count();

  return { users: users || null, enhanceed: enhanceed || null };
}
