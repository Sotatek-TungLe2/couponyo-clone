import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as z from 'zod';
import {
  CouponIssuanceSubject,
  LimitNumberUse,
  MaximumUse,
  UseDay,
  UseDate,
  UseTime,
} from '../components/CreateCouponSpecifications';
import {
  CheckboxField,
  FormControl,
  InputField,
  RadioField,
  SelectDropdown,
  SwitchField,
} from '../components/base/formControl';

import { StateType } from '../hooks';
import useFormData from '../hooks/useFormData';
import HeadTitle from '@base/Typography/HeadTitle';
import HeadSubTitle from '@base/Typography/HeadSubTitle';

const fieldWidth = 210;

const subjectAll = [
  { value: 'subjectAll', label: 'All', checked: true },
  { value: 'subjectFranchise', label: 'Franchise (brand)', checked: false },
  { value: 'subjectCategory', label: 'Category', checked: false },
  { value: 'subjectRestaurant', label: 'Restaurant', checked: false },
  { value: 'subjectYomart', label: 'Yomart', checked: false },
];
const oderType = [
  { value: 'express', label: 'Express (OD)' },
  { value: 'delivery', label: 'Delivery (VD)' },
  { value: 'packing', label: 'Packing' },
  { value: 'preOder', label: 'Pre-order' },
];

export const schema = z.object({
  name: z.string().trim().min(1).max(20),
  issuance: z.object({
    issuanceParent: z.string().trim().min(1),
    issuanceChild: z.string().trim().min(1),
    issuancePercent: z.number().positive().lte(100),
  }),
  paymentAcount: z.number().positive(),
  couponBenefits: z.object({
    typeBenefit: z.string().trim().min(1),
    benefitValue: z.number().positive(),
    maxDiscount: z.number().positive(),
  }),
  limitUse: z.object({
    isLimitUserActive: z.boolean(),
    limitUseValue: z.number().positive(),
  }),
  // .refine((val) => val.isLimitUserActive === true && val.limitUseValue > 0, {
  //   message: 'Limit number of uses must be greater than 0',
  // }),
  maximumUse: z.object({
    isMaximumUse: z.boolean(),
    maximumUseValue: z.number().positive().optional(),
  }),
  // .refine((val) => val?.isMaximumUse === true && val.maximumUseValue && val.maximumUseValue < 0, {
  //   message: 'Maximum number of uses must be greater than 0',
  // }),
  subjectsApply: z.string(),
  oderType: z.string(),
  yogiPass: z.boolean(),
  useChanel: z.boolean(),
  useCityRegion: z.boolean(),
  useDay: z.object({
    isUseDayActive: z.boolean(),
    mon: z.boolean(),
    tue: z.boolean(),
    wed: z.boolean(),
    thu: z.boolean(),
    fri: z.boolean(),
    sat: z.boolean(),
    sun: z.boolean(),
  }),
  useDate: z.string(),
  useTime: z.object({
    startTime: z.date().nullable(),
    endTime: z.date().nullable(),
  }),
});

export type Schema = z.infer<typeof schema>;

const SSRPage: FC = () => {
  const { setData } = useFormData();
  const router = useRouter();
  const { copy } = router.query;
  const store = useSelector((state: StateType) => state.formReducer);
  const { data } = store;
  const defaultData = {
    name: '',
    issuance: {
      issuanceParent: '',
      issuanceChild: '',
      issuancePercent: 0,
    },
    couponBenefits: {
      typeBenefit: '',
      benefitValue: 0,
      maxDiscount: 0,
    },
    paymentAcount: 0,
    limitUse: {
      isLimitUserActive: false,
      limitUseValue: 0,
    },
    maximumUse: {
      isMaximumUse: false,
      maximumUseValue: 0,
    },
    subjectsApply: 'subjectAll',
    oderType: 'express',
    yogiPass: false,
    useChanel: false,
    useCityRegion: false,
    useDay: {
      isUseDayActive: false,
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      sun: true,
    },
    // useDate: '',
    useTime: {
      startTime: undefined,
      endTime: undefined,
    },
  };

  const form = useForm<Schema>({
    defaultValues: copy ? data : defaultData,
    shouldUnregister: false,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (copy) {
      form.setValue('name', data.name);
      form.setValue('issuance', data.issuance);
      form.setValue('limitUse', data.limitUse);
      form.setValue('maximumUse', data.maximumUse);
      form.setValue('couponBenefits', data.couponBenefits);
      form.setValue('oderType', data.oderType);
      form.setValue('paymentAcount', data.paymentAcount);
      form.setValue('subjectsApply', data.subjectsApply);
      form.setValue('useChanel', data.useChanel);
      form.setValue('useCityRegion', data.useCityRegion);
      form.setValue('useDay', data.useDay);
      form.setValue('yogiPass', data.yogiPass);
    }
  }, [copy, form, data]);

  const handleSubmit: SubmitHandler<Schema> = (values: Schema) => {
    console.log('[ Result Submit] =', values);
    setData(values);
    form.reset();
  };
  const handleClickCopy = () => {
    form.reset();
    router.push({
      pathname: '/create-coupon-specifications',
      query: { copy: true },
    });
  };

  useEffect(() => {
    return form.reset();
  }, []);

  console.log(form.formState.errors);
  return (
    <>
      <Box height="100%">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <HeadTitle>Create new coupon details</HeadTitle>
          <Box>
            <HeadSubTitle>Basic Information</HeadSubTitle>
            <FormControl id="name" label="Name of coupon details">
              <InputField name="name" placeholder="Please enter" form={form} />
            </FormControl>
            <FormControl id="issuance" label="Coupon issuance subject">
              <CouponIssuanceSubject form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Coupon benefits</HeadSubTitle>
            <FormControl id="cpBenefits" label="Coupon benefits">
              <SwrapSelectIssuance>
                <SelectDropdown
                  name="couponBenefits.typeBenefit"
                  form={form}
                  data={['정율 ', '정액']}
                />
                <InputField
                  name="couponBenefits.benefitValue"
                  placeholder="0 %"
                  form={form}
                  type="number"
                />
                <InputField
                  name="couponBenefits.maxDiscount"
                  placeholder="Maximum discount"
                  form={form}
                  type="number"
                />
              </SwrapSelectIssuance>
            </FormControl>
            <FormControl id="paymentAcount" label="Minimum payment amount">
              <InputField
                name="paymentAcount"
                placeholder="Please enter"
                form={form}
                type="number"
                inputProps={{ endAdornment: <InputAdornment position="end">won</InputAdornment> }}
              />
            </FormControl>
            <FormControl id="limitUse" label="Limit number of uses">
              <LimitNumberUse form={form} />
            </FormControl>
            <FormControl id="maximumUse" label="Maximum number of uses">
              <MaximumUse form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Subjects to apply coupons</HeadSubTitle>
            <FormControl id="subjectsApply" label="Subjects to apply coupons">
              <RadioField
                name="subjectsApply"
                label="subjectsApply"
                form={form}
                data={subjectAll}
              />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Conditions for using coupons</HeadSubTitle>
            <FormControl id="oderType" label="Order type">
              <RadioField name="oderType" label="Order type" form={form} data={oderType} />
            </FormControl>
            <FormControl id="yogiPass" label="Yogi Pass">
              <CheckboxField
                name="yogiPass"
                label="Available for copy during Yogi Pass"
                form={form}
              />
            </FormControl>
            <FormControl id="useChanel" label="Use channel">
              <SwitchField label="" form={form} name="useChanel" />
            </FormControl>
            <FormControl id="useCityRegion" label="Use City/Region">
              <SwitchField label="" form={form} name="useCityRegion" />
            </FormControl>
            <FormControl id="useDay" label="Use Day">
              <UseDay form={form} />
            </FormControl>
            <FormControl id="useDate" label="Use Date">
              <UseDate name="useDate" label="Use Date" form={form} />
            </FormControl>
            <FormControl id="useTime" label="Use Time">
              <UseTime name="useTime" label="Use Time" form={form} />
            </FormControl>
          </Box>

          <SWrapButton>
            <Button variant="contained" onClick={handleClickCopy}>
              Copy
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined">Cancel</Button>
          </SWrapButton>
        </form>
      </Box>
    </>
  );
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

const SwrapSelectIssuance = styled(Box)`
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px !important;
    max-width: ${fieldWidth}px;
  }
`;
const SWrapButton = styled(SwrapSelectIssuance)`
  justify-content: flex-end;
`;
export default SSRPage;
