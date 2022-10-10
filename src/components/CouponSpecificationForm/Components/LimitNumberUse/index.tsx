import { InputField, SwitchField } from '@base/formControl';
import styled from '@emotion/styled';
import { Box, FormHelperText } from '@mui/material';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { ChangeEvent, useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';
const fieldWidth = 210;
type Props = {
  form: UseFormReturn<Schema>;
};

const LimitNumberUse = ({ form }: Props) => {
  const { control, formState } = form;
  const { errors } = formState;
  const isActive = useWatch({
    control,
    name: 'limitUse.isLimitUserActive',
  });

  const onChange = (item: ChangeEvent<HTMLInputElement>) => {
    if (item.target.value) {
      form.setValue('limitUse.limitUseValue', 1);
    }
  };
  return (
    <SWrapField>
      <SwitchField
        label="Per memberId"
        form={form}
        name="limitUse.isLimitUserActive"
        onChange={onChange}
      />
      <InputField
        name="limitUse.limitUseValue"
        placeholder="Can be used "
        form={form}
        disabled={!isActive}
        type="number"
      />
      {!!errors.limitUse && (
        <FormHelperText error={!!errors.limitUse} style={{ margin: '4px 14px 0 14px' }}>
          {errors.limitUse.message}
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
export default LimitNumberUse;
