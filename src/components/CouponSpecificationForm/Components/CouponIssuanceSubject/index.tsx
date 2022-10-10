import { InputField, SelectDropdown } from '@base/formControl';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import React, { useEffect, useState } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

type Props = {
  form: UseFormReturn<Schema>;
};
const fieldWidth = 210;

const data = [
  {
    issuanceParent: '제휴 프로모션',
    issuanceChild: ['결제 제휴', '프랜차이즈 제휴', '경품', '브랜드 제휴', '기타 제휴'],
  },
  {
    issuanceParent: 'Mass 프로모션',
    issuanceChild: ['Mass'],
  },
  {
    issuanceParent: 'Target 프로모션',
    issuanceChild: ['신규', 'Re-Acq', 'Retention', 'CS', 'Gift'],
  },
  {
    issuanceParent: '영업',
    issuanceChild: ['파트너', 'Sales'],
  },
];

const CouponIssuanceSubject = ({ form }: Props) => {
  const [childData, setChildData] = useState<string[]>([]);
  const { control } = form;
  const issuanceParentWatch = useWatch({
    control,
    name: 'issuance.issuanceParent',
  });

  useEffect(() => {
    const obj = data.find((item) => item.issuanceParent === issuanceParentWatch);
    if (obj) {
      setChildData(obj?.issuanceChild);
    } else {
      setChildData([]);
    }
  }, [issuanceParentWatch]);
  const issuanceParentData = data.map((item) => item.issuanceParent);
  return (
    <div>
      <SwrapSelectIssuance>
        <SelectDropdown name="issuance.issuanceParent" form={form} data={issuanceParentData} />
        <SelectDropdown name="issuance.issuanceChild" form={form} data={childData} />
        <InputField name="issuance.issuancePercent" placeholder="0 %" form={form} type="number" />
      </SwrapSelectIssuance>
    </div>
  );
};
const SwrapSelectIssuance = styled(Box)`
  display: flex;
  // align-items: center;
  & > * {
    margin-right: 10px !important;
    max-width: ${fieldWidth}px;
  }
`;

export default CouponIssuanceSubject;
