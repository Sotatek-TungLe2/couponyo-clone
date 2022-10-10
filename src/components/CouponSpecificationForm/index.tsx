import { FormControl, InputField } from '@base/formControl';
import styled from '@emotion/styled';
import { DevTool } from '@hookform/devtools';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  CouponBenefits,
  CouponIssuanceClassification,
  CouponIssuanceSubject,
  LimitNumberUse,
  MaximumUse,
  MinimumPayment,
  Ordertype,
  SubjectsApply,
  UseChanel,
  UseDate,
  UseDay,
  UseTime,
  Yogipass,
} from './Components';

import HeadSubTitle from '@base/Typography/HeadSubTitle';
import HeadTitle from '@base/Typography/HeadTitle';
import useFormData from '@hooks/useFormData';
import PreviewCreateModal from 'components/CouponSpecificationForm/Components/PreviewModal';
import { schema, Schema } from './utils/schema';

const fieldWidth = 210;

type Props = {
  couponData: Schema;
  isEdit?: boolean;
};
const defaultData: Schema = {
  couponName: '',
  issuance: {
    issuanceParent: '',
    issuanceChild: '',
    issuancePercent: 0,
  },
  issuanceClassification: '',
  couponBenefits: {
    typeBenefit: '',
    benefitValue: 0,
    maxDiscount: 0,
  },
  paymentAcount: 0,
  limitUse: {
    isLimitUserActive: false,
    limitUseValue: 1,
  },
  maximumUse: {
    isMaximumUse: false,
    maximumUseValue: 0,
  },
  subjectsApply: 'subjectAll',
  oderType: { isOderTypeActive: false, value: 'express' },
  yogiPass: {
    isYogipassActive: false,
    isYogipass: false,
  },
  useChanel: {
    isUseChanelActive: false,
    app: true,
    web: true,
  },
  // useCityRegion: false,
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
  useDate: {
    dateSelect: undefined || null,
    value: '',
  },
  useTime: {
    startTime: null,
    endTime: null,
    startTimeValue: '',
    endTimeValue: '',
  },
};
const CouponForm = ({ couponData, isEdit }: Props) => {
  const { isCopy, data, setData, setIsCopy } = useFormData();
  const [formResult, setFormResult] = useState<Schema>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const iniData = isCopy ? data : defaultData;

  const form = useForm<Schema>({
    defaultValues: isEdit ? couponData : iniData,
    shouldUnregister: false,
    resolver: zodResolver(schema),
  });

  const handleClickOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreivew = () => {
    setOpen(false);
  };

  const handleConfirmData = () => {
    localStorage.setItem('couponDetail', JSON.stringify(form.getValues()));
    form.reset();
    handleClosePreivew();
  };
  const handleSubmit: SubmitHandler<Schema> = (values: Schema) => {
    setFormResult(values);
    handleClickOpenPreview();
    // console.log('[ Result Submit] =', values);
  };
  const handleCancel = () => {
    setIsCopy(false);
    form.reset();
  };
  const handleClickCopy = () => {
    setIsCopy(true);
    router.push({
      pathname: '/coupon/',
    });
  };

  useEffect(() => {
    return () => {
      setIsCopy(false);
      form.reset();
    };
  }, []);

  console.log(form.formState.errors);
  return (
    <>
      <Box height="100%">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <HeadTitle>Create new coupon details</HeadTitle>
          <Box>
            <HeadSubTitle>Basic Information</HeadSubTitle>
            <FormControl id="couponName" label="Name of coupon details">
              <InputField
                name="couponName"
                placeholder="Please enter"
                form={form}
                inputProps={{ fullWidth: true }}
              />
            </FormControl>
            <FormControl
              id="issuance"
              label="Coupon issuance subject"
              guildText="Enter the purpose and rate of issuer."
            >
              <CouponIssuanceSubject form={form} />
            </FormControl>
            <FormControl
              id="classification"
              label="Coupon issuance classification"
              guildText="Set up general coupons and unlimited coupons."
            >
              <CouponIssuanceClassification form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Coupon benefits</HeadSubTitle>
            <FormControl
              id="cpBenefits"
              label="Coupon benefits"
              guildText="Check that the discount rate or discount amount has been entered correctly."
            >
              <CouponBenefits form={form} />
            </FormControl>
            <FormControl
              id="paymentAcount"
              label="Minimum payment amount"
              guildText="You can enter up to KRW 1,000,000. If there is no input, the default is 0 won."
            >
              <MinimumPayment form={form} />
            </FormControl>
            <FormControl
              id="limitUse"
              label="Limit number of uses"
              guildText="  If OFF, the default value is 1."
            >
              <LimitNumberUse form={form} />
            </FormControl>
            <FormControl
              id="maximumUse"
              label="Maximum number of uses"
              guildText="If OFF, the default is set to unlimited
"
            >
              <MaximumUse form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Subjects to apply coupons</HeadSubTitle>
            <FormControl
              id="subjectsApply"
              label="Subjects to apply coupons"
              guildText=" Ea Possible to use"
            >
              <SubjectsApply form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Conditions for using coupons</HeadSubTitle>
            <FormControl
              id="oderType"
              label="Order type"
              guildText="Coupon will be applied to the selected order type"
            >
              <Ordertype form={form} />
            </FormControl>
            <FormControl
              id="yogiPass"
              label="Yogi Pass"
              guildText="Coupons apply to Yogi Pass subscribers"
            >
              <Yogipass form={form} />
            </FormControl>
            <FormControl
              id="useChanel"
              label="Use channel"
              guildText="There is no channel condition settings "
            >
              <UseChanel form={form} />
            </FormControl>
            {/* <FormControl id="useCityRegion" label="Use City/Region">
              <SwitchField label="" form={form} name="useCityRegion" />
            </FormControl> */}
            <FormControl
              id="useDay"
              label="Use Day"
              guildText="Coupon will be applied on the selected day of the week "
            >
              <UseDay form={form} />
            </FormControl>
            <FormControl
              id="useDate"
              label="Use Date"
              guildText="Coupon will be applied to the date you set "
            >
              <UseDate form={form} />
            </FormControl>
            <FormControl
              id="useTime"
              label="Use Time"
              guildText="Coupons will be applied from {12:00} to {13:00} as setting "
            >
              <UseTime label="Use Time" form={form} />
            </FormControl>
          </Box>

          <SWrapButton>
            {isEdit && (
              <Button variant="contained" onClick={handleClickCopy}>
                Copy
              </Button>
            )}

            <Button variant="contained" type="submit">
              {isEdit ? 'Update' : 'Save'}
            </Button>
            <Button variant="contained" onClick={handleCancel} color="neutral">
              Cancel
            </Button>
          </SWrapButton>
        </form>
        <DevTool control={form.control} /> {/* set up the dev tool */}
      </Box>
      {formResult && (
        <PreviewCreateModal
          data={formResult}
          open={open}
          onClose={handleClosePreivew}
          onAgree={handleConfirmData}
          aria-describedby="alert-dialog-slide-description"
        />
      )}
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
  position: fixed;
  bottom: 50px;
  right: 50px;
`;
export default CouponForm;
