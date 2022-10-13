import { CouponDetailsTableProps, CouponIssuanceTableProps } from '@type/table';

const host = 'https://jsonplaceholder.typicode.com/todos/1';

const del = async (params: CouponIssuanceTableProps | CouponDetailsTableProps) => {
  const returnData = {
    status: 0,
    data: {
      success: false,
    },
  };
  const url = host;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  if (response.ok) {
    returnData.status = response.status.valueOf();
    returnData.data = data;
  }
  return returnData;
};

export { del };
