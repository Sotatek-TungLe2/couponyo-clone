import { FormHelperText, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { Key } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
type Props = {
  form: UseFormReturn<Schema>;
  label: string;
  disabled?: boolean;
  key?: Key;
};

const UseTime = (props: Props) => {
  const { form, label, disabled = false, key } = props;
  const { errors } = form.formState;

  const handleChangeStartTime = (time: Date | null | undefined) => {
    if (!!time) {
      const timeformat = moment(time).format('hh:mm');
      form.setValue('useTime.startTimeValue', timeformat);
    }
  };

  const handleChangeEndTime = (time: Date | null | undefined) => {
    if (!!time) {
      const timeformat = moment(time).format('hh:mm');
      form.setValue('useTime.endTimeValue', timeformat);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name="useTime.startTime"
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <TimePicker
              label={`${label} start`}
              value={value}
              onChange={(time) => {
                handleChangeStartTime(time);
                onChange(time ? new Date(time) : null);
              }}
              ampm={false}
              {...rest}
              ampmInClock={true}
              renderInput={(params) => {
                return <TextField {...params} size="small" />;
              }}
            />
          )}
        />
      </LocalizationProvider>
      <span> - </span>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name="useTime.endTime"
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <TimePicker
              label={`${label} end`}
              value={value}
              onChange={(time) => {
                handleChangeEndTime(time);
                onChange(time ? new Date(time) : null);
              }}
              ampm={false}
              {...rest}
              renderInput={(params) => {
                return <TextField {...params} size="small" />;
              }}
            />
          )}
        />
      </LocalizationProvider>
      {!!errors.useTime && (
        <FormHelperText error={!!errors.useTime} style={{ margin: '4px 14px 0 14px' }}>
          {errors.useTime.message}
        </FormHelperText>
      )}

      <Controller
        name="useTime.startTimeValue"
        control={form.control}
        render={({ field }) => {
          return <input {...field} hidden />;
        }}
      />
      <Controller
        name="useTime.endTimeValue"
        control={form.control}
        render={({ field }) => {
          return <input {...field} hidden />;
        }}
      />
    </>
  );
};

export default UseTime;
