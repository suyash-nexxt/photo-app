import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default async function getGallery(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient({ log: ['query'] });

  try {
    const galleries = await prisma.gallery.findMany();
    res.status(200);
    res.json({ galleries });
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch galleries' });
  } finally {
    await prisma.$disconnect();
  }
}
