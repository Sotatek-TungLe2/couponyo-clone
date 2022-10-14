import { FC } from 'react';
import { InputField, SelectDropdown } from '@base/formControl';
import HeadTitle from '@base/Typography/HeadTitle';
import styled from '@emotion/styled';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from '../SearchCouponDetails/DatePicker';

type SearchInput = {
  couponName: string;
  searchTerm: string;
  startTime: moment.Moment;
  endTime: moment.Moment;
  issuePeriod: string;
  issueMethod: string;
};

const SearchWrapper = styled(Box)`
  display: flex;
  backgroundcolor: #f5f5f5;
  justify-content: space-between;
`;

const WrapButton = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-self: flex-start;
`;

export const schema = z.object({
  couponName: z.string(),
  searchTerm: z.string().trim().min(2).max(20),
  startTime: z.any(),
  endTime: z.any(),
  issuePeriod: z.string(),
  issueMethod: z.string(),
});
const CouponContentSearch: FC = () => {
  const defaultData = {
    couponName: '',
    searchTerm: '',
    startTime: moment(),
    endTime: moment(),
    issuePeriod: 'All',
    issueMethod: 'All',
  };
  const form = useForm<SearchInput>({
    defaultValues: defaultData,
    // resolver: zodResolver(schema),
  });
  const onSubmit = (data: SearchInput) => {
    console.log('data', data);
  };

  const handleInitializeInput = () => {
    form.reset({
      couponName: '',
      searchTerm: '',
      startTime: moment(),
      endTime: moment(),
      issuePeriod: 'All',
      issueMethod: 'All',
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <SearchWrapper sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5' }}>
        <Grid container flexBasis="80%" spacing={2}>
          <Grid item xs={12} sm={2}>
            <SelectDropdown
              label="Name of coupon details"
              name="couponName"
              form={form}
              data={['all', 'name1', 'name2', 'name3']}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputField
              name="searchTerm"
              placeholder="Please enter your search term"
              form={form}
              isFullWidth={true}
            />
          </Grid>
          <Grid item xs={6} sm={1}>
            <SelectDropdown
              label="Issue Period"
              name="issuePeriod"
              form={form}
              data={['All', 'name1', 'name2', 'name3']}
            />
          </Grid>
          <Grid item xs={12} sm={5} justifyContent="stretch">
            <DatePicker name="startTime" form={form} label="Start Time" />
            {' _ '}
            <DatePicker name="endTime" form={form} label="End Time" />
          </Grid>
          <Grid item xs={6} sm={2}>
            <SelectDropdown
              label="Coupon issuance method"
              name="issueMethod"
              form={form}
              data={['All', 'name1', 'name2', 'name3']}
            />
          </Grid>
        </Grid>
        <WrapButton>
          <Button variant="contained" type="submit">
            Search
          </Button>
          <Button variant="text" sx={{ ml: 3 }} onClick={handleInitializeInput}>
            Initilization
          </Button>
        </WrapButton>
      </SearchWrapper>
    </form>
  );
};

export default CouponContentSearch;
