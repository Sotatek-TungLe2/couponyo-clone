import { RadioField, SwitchField } from '@base/formControl';
import styled from '@emotion/styled';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { UseFormReturn, useWatch } from 'react-hook-form';

const oderType = [
  { value: 'express', label: 'Express (OD)' },
  { value: 'delivery', label: 'Delivery (VD)' },
  { value: 'packing', label: 'Packing' },
  { value: 'preOder', label: 'Pre-order' },
];
type Props = {
  form: UseFormReturn<Schema>;
};

const Ordertype = ({ form }: Props) => {
  const { control, formState } = form;
  const isActive = useWatch({
    control,
    name: 'oderType.isOderTypeActive',
  });

  return (
    <SWRapOrderType>
      <SwitchField label="" form={form} name="oderType.isOderTypeActive" />
      <RadioField
        name="oderType.value"
        label="Order type"
        form={form}
        data={oderType}
        disabled={!isActive}
      />
    </SWRapOrderType>
  );
};

const SWRapOrderType = styled.div`
  display: flex;
`;
export default Ordertype;
