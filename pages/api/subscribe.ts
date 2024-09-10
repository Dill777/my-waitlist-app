import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Проверка, если email существует
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Invalid email' });
    }

    try {
      // Сохранение email в базе данных
      const newUser = await prisma.user.create({
        data: {
          email: email,
        },
      });

      console.log(`New user created: ${newUser}`);

      return res.status(200).json({ message: 'Successful! We will send you detailed information closer to the launch.' });
    } catch (error) {
      return res.status(500).json({ message: 'Error saving data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
