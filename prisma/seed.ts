import { Gallery, PrismaClient } from '@prisma/client';
const faker = require('faker');

const prisma = new PrismaClient();

const galleryData = Array.from(Array(10).keys()).map((i) => ({
  name: faker.lorem.words(4),
  description: faker.lorem.sentence(),
}));

const createGallery = async (g: any) => {
  // Generate random dummy photo data.
  const photoData = Array.from(Array(10).keys()).map((i) => {
    // Generate random dimensions, with a minimum width and height of 300.
    const width = (Math.floor(Math.random() * 12) + 3) * 100;
    const height = (Math.floor(Math.random() * 12) + 3) * 100;
    return {
      caption: faker.lorem.sentence(),
      url: `https://source.unsplash.com/random/${width}x${height}?sig=incrementingIdentifier`,
      cloudinaryPublicId: faker.random.alphaNumeric(),
      width,
      height,
    };
  });

  const galleryDataWithPhotos = {
    // Insert the gallery.
    ...g,
    // Insert 10 photos.
    photos: {
      create: photoData,
    },
  };

  await prisma.gallery.create({ data: galleryDataWithPhotos });
};

async function main() {
  await Promise.all(galleryData.map((g) => createGallery(g)));
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
