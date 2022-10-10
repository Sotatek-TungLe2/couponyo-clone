import { FormControlLabel, Switch } from '@mui/material';
import { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
  onChange?: (item: ChangeEvent<HTMLInputElement>) => void;
};

const SwitchField = (props: Props) => {
  const { form, name, label, disabled = false, onChange } = props;

  const handleChange = (item: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(item);
  };
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Switch
          {...field}
          checked={field.value}
          onChange={(item: ChangeEvent<HTMLInputElement>) => {
            handleChange(item);
            field.onChange(item);
          }}
        />
        // <FormControlLabel
        //   control={<Switch {...field} checked={field.value} name={name} />}
        //   label={label}
        //   id={`input-${name}`}
        //   name={name}
        //   disabled={disabled}
        // />
      )}
    />
  );
};

export default SwitchField;
