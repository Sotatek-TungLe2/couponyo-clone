import styled from '@emotion/styled';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Button, Chip, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import type { Moment } from 'moment';

import { Key, useState } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
type Props = {
  form: UseFormReturn<Schema>;
  name: string;
  label: string;
  disabled?: boolean;
  key?: Key;
};

const UseDate = (props: Props) => {
  const { form, name, label, disabled = false, key } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dateData = JSON.parse(form.watch('useDate.value')) || [];

  const handleChange = (event: Moment | null) => {
    if (dateData.length > 30 || event === null) return;
    const date = event.format('MM/DD');
    const data = [...dateData, date] as string[];
    if (dateData.includes(date)) {
      return;
    }

    form.setValue('useDate.value', JSON.stringify(data));
  };

  const handleDelete = (data: string) => {
    const filterData = dateData.filter((item: string) => item !== data);
    form.setValue('useDate.value', JSON.stringify(filterData));
  };

  return (
    <SWrapContainer>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Controller
          name="useDate.dateSelect"
          control={form.control}
          render={({ field: { onChange, value, ...rest } }) => (
            <DesktopDatePicker
              open={isOpen}
              label={label}
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={(time: Moment | null) => {
                onChange(time);
                handleChange(time);
              }}
              {...rest}
              renderInput={(params) => {
                return (
                  <SWrapper>
                    <TextField {...params} size="small" style={{ visibility: 'hidden' }} />
                    <SButton
                      variant="outlined"
                      color="primary"
                      onClick={() => setIsOpen((isOpen) => !isOpen)}
                      startIcon={<CalendarTodayIcon />}
                    >
                      Choose use days
                    </SButton>
                  </SWrapper>
                );
              }}
            />
          )}
        />
      </LocalizationProvider>
      {!!dateData && dateData.length > 0 && (
        <SWrapChip>
          {dateData.map((item: string) => (
            <Chip key={item} label={item} onDelete={() => handleDelete(item)} />
          ))}
        </SWrapChip>
      )}
      <Controller
        name="useDate.value"
        control={form.control}
        render={({ field }) => {
          return <input {...field} hidden />;
        }}
      />
    </SWrapContainer>
  );
};

const SWrapper = styled.div`
  position: relative;
  width: 200px;
`;
const SButton = styled(Button)`
  position: absolute;
  left: 0;
  bottom: 0;
`;
const SWrapContainer = styled.div`
  display: flex;
  align-items: center;
`;
const SWrapChip = styled.div`
  flex: 1;
  & > .MuiChip-root {
    margin: 5px;
  }
`;
export default UseDate;
