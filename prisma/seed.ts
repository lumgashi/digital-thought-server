// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  // const post1 = await prisma.autoId.upsert({
  //   where: { id: '653284e4b0f31076af229e6b' },
  //   update: {},
  //   create: {
  //     autoId: 1,
  //     userAutoId: 2,
  //     bidAutoId: 1,
  //   },
  // });
  // const post2 = await prisma.autoId.upsert({
  //   where: { id: '653284edc800e7bcf79b13f2' },
  //   update: {},
  //   create: {
  //     autoId: 2,
  //     userAutoId: 3,
  //     bidAutoId: 2,
  //   },
  // });
  //  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
