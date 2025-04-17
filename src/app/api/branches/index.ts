import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const branches = await prisma.branch.findMany();
      res.status(200).json(branches);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Error fetching branches' });
    }
  } else if (req.method === 'POST') {
    const { name, address, bh_status } = req.body;

    try {
      const newBranch = await prisma.branch.create({
        data: {
          name,
          address,
          bh_status,
        },
      });
      res.status(201).json(newBranch);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: 'Error creating branch' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
