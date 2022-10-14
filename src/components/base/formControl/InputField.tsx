import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

type Props = {
  form: any;
  name: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  inputProps?: any;
  isFullWidth?: boolean;
};

const InputField = (props: Props) => {
  const {
    form,
    name,
    placeholder,
    isFullWidth,
    disabled = false,
    type = 'text',
    inputProps,
  } = props;
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
        <TextField
          fullWidth={isFullWidth}
          {...field}
          onChange={
            type === 'number'
              ? (event) => field.onChange(+event.target.value)
              : (event) => field.onChange(event.target.value)
          }
          value={type === 'number' ? Number(field.value) : field.value}
          id={`input-${name}`}
          name={name}
          disabled={disabled}
          error={errorFields}
          helperText={errorMessage && errorMessage}
          size="small"
          placeholder={placeholder}
          type={type}
          InputProps={{ ...inputProps }}
        />
      )}
    />
  );
};

export default InputField;
