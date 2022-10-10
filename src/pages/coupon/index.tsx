import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import CouponForm from 'components/CouponSpecificationForm';
import { StateType } from '@hooks';

const CreateCouponPage: FC = () => {
  const router = useRouter();
  const { copy } = router.query;
  const store = useSelector((state: StateType) => state.formReducer);

  const { data } = store;

  return <CouponForm couponData={data} />;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

export default CreateCouponPage;
