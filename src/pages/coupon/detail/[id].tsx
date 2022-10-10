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

  const { setData } = useFormData();

  const localData = localStorage.getItem('couponDetail');
  const data: Schema = localData ? JSON.parse(localData) : null;
  const transData: Schema = {
    ...data,
    useTime: {
      ...data.useTime,
      endTime: data.useTime?.endTime ? new Date(data.useTime?.endTime) : null,
      startTime: data.useTime?.startTime ? new Date(data.useTime?.startTime) : null,
    },
  };

  useEffect(() => {
    if (transData) setData(transData);
  }, []);

  return <>{transData && <CouponForm couponData={transData} isEdit />}</>;
};

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {},
  };
};

export default CouponDetail;
