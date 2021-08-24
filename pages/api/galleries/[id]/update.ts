import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH') {
    console.log(`------------not PATCH, returning 400 `);
    return res.status(400).end();
  }

  const id: number = parseInt(req.query.id as string);
  const { name, description } = req.body;

  async function main() {
    const gallery = await prisma.gallery.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return res.status(200).json(gallery);
  }

  return main()
    .catch((e) => {
      console.log(`-----------error updating gallery: `, e);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
};
