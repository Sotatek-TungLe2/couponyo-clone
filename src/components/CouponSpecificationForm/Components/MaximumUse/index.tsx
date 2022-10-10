import { InputField, SwitchField } from '@base/formControl';
import styled from '@emotion/styled';
import { Box, FormHelperText } from '@mui/material';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { ChangeEvent } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
const fieldWidth = 210;
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
    <SWrapField>
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
export default MaximumUse;
