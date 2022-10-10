import { InputField, SwitchField } from '@base/formControl';
import { FormHelperText } from '@mui/material';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { ChangeEvent } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

type Props = {
  form: UseFormReturn<Schema>;
};

const MaximumUse = ({ form }: Props) => {
  const { control, formState } = form;
  const { errors } = formState;
  const isActive = useWatch({
    control,
    name: 'maximumUse.isMaximumUse',
  });

  const onChange = (item: ChangeEvent<HTMLInputElement>) => {
    if (item.target.value) {
      form.setValue('maximumUse.maximumUseValue', 0);
    }
  };

  return (
    <>
      <SwitchField
        label="Max Person"
        form={form}
        name="maximumUse.isMaximumUse"
        onChange={onChange}
      />
      <InputField
        name="maximumUse.maximumUseValue"
        placeholder="Can be used "
        form={form}
        type="number"
        disabled={!isActive}
      />
      {!!errors.maximumUse && (
        <FormHelperText error={!!errors.maximumUse} style={{ margin: '4px 14px 0 14px' }}>
          {errors.maximumUse.message}
        </FormHelperText>
      )}
    </>
  );
};

export default MaximumUse;
