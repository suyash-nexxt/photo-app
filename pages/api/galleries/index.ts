import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) => {
  async function main() {
    const galleries = await prisma.gallery.findMany({
      orderBy: [{ name: 'asc' }],
    });

    return res.status(200).json(galleries);
  }

  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
