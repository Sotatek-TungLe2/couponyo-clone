import { TextField } from '@mui/material';
import { Key } from 'react';
import { Controller } from 'react-hook-form';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import moment from 'moment';

type Props = {
  form: any;
  name: string;
  label: string;
  disabled?: boolean;
  key?: Key;
};

const DatePicker = (props: Props) => {
  const { form, name, label, disabled = false, key } = props;
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name={name}
          control={form.control}
          render={({ field: { onChange, ...rest } }) => (
            <DesktopDatePicker
              label={label}
              inputFormat="YYYY-MM-DD"
              onChange={(date: moment.Moment | null) => {
                onChange(date?.format());
              }}
              {...rest}
              renderInput={(params) => {
                return <TextField sx={{ width: '47%' }} {...params} size="small" />;
              }}
            />
          )}
        />
      </LocalizationProvider>
    </>
  );
};

export default DatePicker;
