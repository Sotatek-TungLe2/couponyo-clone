import { CheckboxField, SwitchField } from '@base/formControl';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { UseFormReturn, useWatch } from 'react-hook-form';

type Props = {
  form: UseFormReturn<Schema>;
};

const Yogipass = ({ form }: Props) => {
  const { control } = form;
  const isActive = useWatch({
    control,
    name: 'yogiPass.isYogipassActive',
  });
  return (
    <>
      <SwitchField label="" form={form} name="yogiPass.isYogipassActive" />
      <CheckboxField
        name="yogiPass.isYogipass"
        label="Available for copy during Yogi Pass"
        form={form}
        disabled={!isActive}
      />
    </>
  );
};

export default Yogipass;
