import { CouponDetailsTableProps, CouponIssuanceTableProps } from '@type/table';
import { del } from './couponDetailsIndexClient';

const deleteCouponDetails = async (
  selectedRows: CouponDetailsTableProps[] | CouponIssuanceTableProps[]
) => {
  const result = Promise.all(selectedRows.map((element) => del(element))).then((values) => {
    console.log(values);
    return values;
  });
  return result;
};

export { deleteCouponDetails };
