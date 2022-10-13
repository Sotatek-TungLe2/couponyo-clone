import { deleteCouponDetails } from 'bff/client/couponDetailsIndex/couponDetailsIndexData';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ResponseProps {
  success: boolean;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'DELETE':
      const { selectedRows } = req.body;
      const result = await deleteCouponDetails(selectedRows);
      res.status(200).json(result);
  }
}
