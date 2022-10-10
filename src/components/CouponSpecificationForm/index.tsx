import { FormControl, InputField, RadioField } from '@base/formControl';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
  CouponBenefits,
  CouponIssuanceClassification,
  CouponIssuanceSubject,
  LimitNumberUse,
  MaximumUse,
  Ordertype,
  UseChanel,
  UseDate,
  UseDay,
  UseTime,
  Yogipass,
} from './Components';

import HeadSubTitle from '@base/Typography/HeadSubTitle';
import HeadTitle from '@base/Typography/HeadTitle';
import { StateType } from '@hooks';
import useFormData from '@hooks/useFormData';
import PreviewCreateModal from 'components/CouponSpecificationForm/Components/PreviewModal';
import { schema, Schema } from './utils/schema';

const fieldWidth = 210;

const subjectAll = [
  { value: 'subjectAll', label: 'All', checked: true },
  { value: 'subjectFranchise', label: 'Franchise (brand)', checked: false },
  { value: 'subjectCategory', label: 'Category', checked: false },
  { value: 'subjectRestaurant', label: 'Restaurant', checked: false },
  { value: 'subjectYomart', label: 'Yomart', checked: false },
];

type Props = {
  couponData: Schema;
  isEdit?: boolean;
};
const CouponForm = ({ couponData, isEdit }: Props) => {
  const { setData } = useFormData();
  const [formResult, setFormResult] = useState<Schema>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const store = useSelector((state: StateType) => state.formReducer);

  const form = useForm<Schema>({
    defaultValues: couponData,
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
    setData(form.getValues());
    form.reset();

    handleClosePreivew();
  };
  const handleSubmit: SubmitHandler<Schema> = (values: Schema) => {
    setFormResult(values);
    handleClickOpenPreview();
    // console.log('[ Result Submit] =', values);
  };
  const handleClickCopy = () => {
    router.push({
      pathname: '/delivery/',
    });
  };

  useEffect(() => {
    return () => {
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
                inputProps={{ style: { width: '100%' } }}
              />
            </FormControl>
            <FormControl id="issuance" label="Coupon issuance subject">
              <CouponIssuanceSubject form={form} />
            </FormControl>
            <FormControl id="classification" label="Coupon issuance classification">
              <CouponIssuanceClassification form={form} />
            </FormControl>
          </Box>

          <Box>
            <HeadSubTitle>Coupon benefits</HeadSubTitle>
            <FormControl
              id="cpBenefits"
              label="Coupon benefits
"
            >
              <CouponBenefits form={form} />
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
              <Ordertype form={form} />
            </FormControl>
            <FormControl id="yogiPass" label="Yogi Pass">
              <Yogipass form={form} />
            </FormControl>
            <FormControl id="useChanel" label="Use channel">
              <UseChanel form={form} />
            </FormControl>
            {/* <FormControl id="useCityRegion" label="Use City/Region">
              <SwitchField label="" form={form} name="useCityRegion" />
            </FormControl> */}
            <FormControl id="useDay" label="Use Day">
              <UseDay form={form} />
            </FormControl>
            <FormControl id="useDate" label="Use Date">
              <UseDate name="useDate" label="Use Date" form={form} />
            </FormControl>
            <FormControl id="useTime" label="Use Time">
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
            <Button variant="outlined">Cancel</Button>
          </SWrapButton>
        </form>
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
`;
export default CouponForm;
