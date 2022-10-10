import { InputField, SelectDropdown } from '@base/formControl';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<Schema>;
};
const fieldWidth = 210;

const data = ['정율 ', '정액'];

const CouponBenefits = ({ form }: Props) => {
  return (
    <div>
      <SwrapSelectIssuance>
        <SelectDropdown name="couponBenefits.typeBenefit" form={form} data={data} />
        <InputField
          name="couponBenefits.benefitValue"
          placeholder="0 %"
          form={form}
          type="number"
        />
        <InputField
          name="couponBenefits.maxDiscount"
          placeholder="Maximum discount"
          form={form}
          type="number"
        />
      </SwrapSelectIssuance>
    </div>
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

export default CouponBenefits;
