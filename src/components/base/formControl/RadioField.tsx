import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';

type TRadioObj = {
  value: any;
  label: string;
  checked?: boolean;
};
type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
  data: TRadioObj[];
};

const RadioField = (props: Props) => {
  const { form, name, label, disabled = false, data } = props;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <SRadioGroup aria-label={label} defaultValue={field.value}>
          {data.map((item, index) => (
            <FormControlLabel
              key={index}
              control={<Radio {...field} value={item.value} disabled={disabled || item.checked} />}
              label={item.label}
            />
          ))}
        </SRadioGroup>
      )}
    />
  );
};

const SRadioGroup = styled(RadioGroup)`
  flex-direction: row;
`;
export default RadioField;
