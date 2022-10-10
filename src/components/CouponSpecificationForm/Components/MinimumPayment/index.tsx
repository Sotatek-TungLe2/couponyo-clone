import { InputField } from '@base/formControl';
import styled from '@emotion/styled';
import { Box, InputAdornment } from '@mui/material';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { UseFormReturn } from 'react-hook-form';
const fieldWidth = 210;
type Props = {
  form: UseFormReturn<Schema>;
};

const MinimumPayment = ({ form }: Props) => {
  return (
    <SWrapField>
      <InputField
        name="paymentAcount"
        placeholder="Please enter"
        form={form}
        type="number"
        inputProps={{ endAdornment: <InputAdornment position="end">won</InputAdornment> }}
      />
    </SWrapField>
  );
};
const SWrapField = styled(Box)`
  display: flex;
  // align-items: center;
  & > * {
    margin-right: 10px !important;
    max-width: ${fieldWidth}px;
  }
`;
export default MinimumPayment;
