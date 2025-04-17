// ดึงข้อมูลสาขาที่ระบุโดย id
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    if (req.method === 'GET') {
      try {
        const branch = await prisma.branch.findUnique({
          where: {
            id: Number(id),
          },
        });
        if (!branch) {
          res.status(404).json({ error: 'Branch not found' });
        } else {
          res.status(200).json(branch);
        }
      } catch (error) {
        res.status(500).json({ error: 'Error fetching branch' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  
  // แก้ไขข้อมูลสาขา
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    if (req.method === 'PUT') {
      const { name, address, bh_status } = req.body;
  
      try {
        const updatedBranch = await prisma.branch.update({
          where: {
            id: Number(id),
          },
          data: {
            name,
            address,
            bh_status,
          },
        });
        res.status(200).json(updatedBranch);
      } catch (error) {
        res.status(500).json({ error: 'Error updating branch' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  
  // ลบข้อมูลสาขา
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    if (req.method === 'DELETE') {
      try {
        const deletedBranch = await prisma.branch.delete({
          where: {
            id: Number(id),
          },
        });
        res.status(200).json(deletedBranch);
      } catch (error) {
        res.status(500).json({ error: 'Error deleting branch' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  