import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  label?: string;
  name: string;
  disabled?: boolean;
  data: string[];
};

const SelectDropdown = (props: Props) => {
  const { form, name, disabled = false, label, data = [] } = props;
  const { errors } = form.formState;
  const arrayName = name.split('.');
  const errorFields =
    arrayName.length > 1 ? !!errors[arrayName[0]]?.[arrayName[1]] : !!errors[arrayName[0]];
  const errorMessage =
    arrayName.length > 1
      ? errors[arrayName[0]]?.[arrayName[1]]?.message
      : errors[arrayName[0]]?.message;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth>
          <InputLabel size="small">{label}</InputLabel>
          <Select
            disabled={disabled}
            {...field}
            size="small"
            displayEmpty
            label={label}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {!label && (
              <MenuItem disabled value="">
                <em>Please choose</em>
              </MenuItem>
            )}
            {!!data &&
              data.length > 0 &&
              data.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default SelectDropdown;
