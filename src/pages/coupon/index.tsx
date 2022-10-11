import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import CouponForm from 'components/CouponSpecificationForm';
import { StateType } from '@hooks';

const CreateCouponPage: FC = () => {
  const router = useRouter();
  const { data: dataFormQuery } = router.query;
  const dataCopy = dataFormQuery ? JSON.parse((dataFormQuery as string) || '') : {};
  return <CouponForm couponData={dataCopy} />;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

export default CreateCouponPage;
