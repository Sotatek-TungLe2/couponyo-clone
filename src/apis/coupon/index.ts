import { apiClient } from '@lib/apiClient';
import { Sample } from '@type/model/sample';
import type { NextApiRequest, NextApiResponse } from 'next';
const SAMPLE_API_BASE_URL = '/v1/samples' as const;

export const get = async (id: number): Promise<ApiResponse<Sample>> => {
  return await apiClient.get<Sample>(`${SAMPLE_API_BASE_URL}/${id}`);
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pid } = req.query;
  res.end(`Post: ${pid}`);
}
