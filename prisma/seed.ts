import { PrismaClient } from '@prisma/client';
const faker = require('faker');

const prisma = new PrismaClient();

const galleries = Array.from(Array(10).keys()).map((i) => ({
  name: faker.lorem.words(4),
  description: faker.lorem.sentence(),
}));

async function main() {
  await prisma.gallery.createMany({
    data: galleries,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
