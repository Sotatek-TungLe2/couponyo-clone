import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import CouponForm from 'components/CouponSpecificationForm';
import { StateType } from '@hooks';
import useFormData from '@hooks/useFormData';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';

const CouponDetail: FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const store = useSelector((state: StateType) => state.formReducer);

  const { setData } = useFormData();

  const localData = localStorage.getItem('couponDetail');
  const data: Schema = localData ? JSON.parse(localData) : null;

  console.log('data', data);

  useEffect(() => {
    if (data) setData(data);
  }, []);

  return <>{data && <CouponForm couponData={data} isEdit />}</>;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

export default CouponDetail;
