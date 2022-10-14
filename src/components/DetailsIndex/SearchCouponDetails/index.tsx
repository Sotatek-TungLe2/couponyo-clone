import { FC, useEffect, useState } from 'react';
import { InputField, SelectDropdown } from '@base/formControl';
import HeadTitle from '@base/Typography/HeadTitle';
import styled from '@emotion/styled';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import moment, { Moment } from 'moment';
import DatePicker from './DatePicker';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import QuickSetDate from './QuickSetDate';
import {
  ApplySubject,
  CouponBenefits,
  CouponConditions,
  dayOptions,
  SearchParam,
  SearchType,
} from '../utils/constants';
import axios from 'axios';

const DefaultOptionIndex = 0;

export type SearchInput = {
  searchType: string;
  searchTerm: string;
  startTime: string;
  endTime: string;
  issuingEntity: string;
  couponBenefit: string;
  applySubjects: string;
  couponCondition: string;
};

const SearchWrapper = styled(Box)`
  display: flex;
  backgroundcolor: #f5f5f5;
  justify-content: space-between;
`;

const WrapButton = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
  & .MuiToggleButton-root {
    text-transform: none;
  }
`;

export const schema = z.object({
  searchType: z.string(),
  searchTerm: z.string().trim().max(20),
  startTime: z.any(),
  endTime: z.any(),
  issuingEntity: z.string(),
  couponBenefit: z.string(),
  applySubjects: z.string(),
  couponCondition: z.string(),
});

const SearchSpecifications: FC = () => {
  const [quickDate, setQuickDate] = useState<dayOptions | null>(dayOptions.Today);

  const defaultData = {
    searchType: SearchType[DefaultOptionIndex],
    searchTerm: '',
    startTime: moment().format(),
    endTime: moment().format(),
    issuingEntity: 'All',
    couponBenefit: CouponBenefits[DefaultOptionIndex],
    applySubjects: ApplySubject[DefaultOptionIndex],
    couponCondition: CouponConditions[DefaultOptionIndex],
  };

  const form = useForm<SearchInput>({
    defaultValues: defaultData,
    resolver: zodResolver(schema),
  });

  const { startTime, endTime } = form.watch();

  const onSearchSubmit = (data: SearchInput) => {
    console.log('data', data);
    handleSearch();
  };

  const handleInitializeInput = () => {
    form.reset({
      searchType: SearchType[DefaultOptionIndex],
      searchTerm: '',
      startTime: moment().format(),
      endTime: moment().format(),
      issuingEntity: 'All',
      couponBenefit: CouponBenefits[DefaultOptionIndex],
      applySubjects: ApplySubject[DefaultOptionIndex],
      couponCondition: CouponConditions[DefaultOptionIndex],
    });
  };

  const handleSetQuickDate = (event: React.MouseEvent<HTMLElement>, days: dayOptions) => {
    setQuickDate(days);
    form.setValue('endTime', moment().format());
    form.setValue('startTime', moment().subtract(days, 'days').format());
  };

  const handleSearch = async () => {
    try {
      const searchType = form.getValues('searchType');
      const searchTerm = form.getValues('searchTerm');
      console.log('searchTerm: ', searchTerm);
      let modifySearchInputs: SearchParam;
      form.unregister('searchType');
      form.unregister('searchTerm');
      const values = form.getValues();
      // Check search type by name or constructor
      if (searchType === SearchType[0]) {
        modifySearchInputs = {
          ...values,
          couponName: searchTerm,
        };
      } else {
        modifySearchInputs = {
          ...values,
          creator: searchTerm,
        };
      }
      console.log('modifySearchInputs: ', modifySearchInputs);
      const listParams = Object.keys(modifySearchInputs)
        .filter(
          (key) =>
            !!modifySearchInputs[key as keyof SearchParam] &&
            modifySearchInputs[key as keyof SearchParam] !== 'All'
        )
        .map((key) => `${key}=${modifySearchInputs[key as keyof SearchParam]}`);
      console.log('listParams: ', listParams);
      const searchResult = await axios.get(
        listParams.length ? `/api/detail-index?${listParams.join('&')}` : `/api/detail-index`
      );
      console.log('searchResult: ', searchResult);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    if (moment().isSame(moment(endTime).format(), 'day')) {
      const timeDif = moment(endTime).diff(moment(startTime), 'days');
      switch (timeDif) {
        case dayOptions.Today:
          setQuickDate(dayOptions.Today);
          return;
        case dayOptions.OneWeek:
          setQuickDate(dayOptions.OneWeek);
          return;
        case dayOptions.OneMonth:
          setQuickDate(dayOptions.OneMonth);
          return;
        case dayOptions.ThreeMonths:
          setQuickDate(dayOptions.ThreeMonths);
          return;
        case dayOptions.SixMonths:
          setQuickDate(dayOptions.SixMonths);
          return;
        default:
          setQuickDate(null);
      }
    } else {
      setQuickDate(null);
    }
  }, [startTime, endTime]);

  console.log(
    'test moment',
    moment('2022-10-5T08:52:45+07:00').isBetween(
      moment('2022-10-06T14:20:17 07:00'),
      moment('2022-10-13T14:20:17 07:00')
    )
  );

  return (
    <form onSubmit={form.handleSubmit(onSearchSubmit)}>
      <HeadTitle>Coupont Index</HeadTitle>
      <SearchWrapper sx={{ mt: 1, p: 2, bgcolor: '#f5f5f5' }}>
        <Grid container flexBasis="80%" spacing={2}>
          <Grid item xs={12} sm={4}>
            <SelectDropdown label="Search Type" name="searchType" form={form} data={SearchType} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <InputField
              name="searchTerm"
              placeholder="Please enter your search term"
              form={form}
              isFullWidth={true}
            />
          </Grid>
          <Grid item xs={12} sm={5} justifyContent="stretch">
            <DatePicker name="startTime" form={form} label="Start Time" />
            {' _ '}
            <DatePicker name="endTime" form={form} label="End Time" />
          </Grid>
          <Grid item xs={12} sm={7}>
            <QuickSetDate selectedItem={quickDate} handleQuickDate={handleSetQuickDate} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <SelectDropdown
              label="Issuing entity"
              name="issuingEntity"
              form={form}
              data={['All', 'name1', 'name2', 'name3']}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <SelectDropdown
              label="Coupon benefits"
              name="couponBenefit"
              form={form}
              data={CouponBenefits}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <SelectDropdown
              label="Subjects to apply coupons"
              name="applySubjects"
              form={form}
              data={ApplySubject}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <SelectDropdown
              label="Coupon application conditions"
              name="couponCondition"
              form={form}
              data={CouponConditions}
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

export default SearchSpecifications;
