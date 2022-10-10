import { SelectDropdown } from '@base/formControl';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { UseFormReturn } from 'react-hook-form';
const fieldWidth = 210;
type Props = {
  form: UseFormReturn<Schema>;
};

const data = ['Regular Coupons', 'Infinite Coupons'];

const CouponIssuanceClassification = ({ form }: Props) => {
  return (
    <SwrapSelectIssuance>
      <SelectDropdown name="issuanceClassification" form={form} data={data} />
    </SwrapSelectIssuance>
  );
};
const SwrapSelectIssuance = styled(Box)`
  display: flex;
  // align-items: center;
  & > * {
    margin-right: 10px !important;
    max-width: ${fieldWidth}px;
  }
`;
export default CouponIssuanceClassification;
