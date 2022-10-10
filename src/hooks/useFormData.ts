import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { StateType } from './redux-store';

type iData = Schema;
type Action = { data: iData; type: '@FORM/SET_DATA' };

interface Return {
  // @typescript-eslint/no-explicit-any
  data: any;
  setData: (data: iData) => void;
}

interface iDataState {
  data: iData;
}

const initialState: iDataState = {
  data: {
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
      value: '["10/8","20/9"]',
    },
    useTime: {
      startTime: null,
      endTime: null,
      startTimeValue: '',
      endTimeValue: '',
    },
  },
};

export function reducer(state = initialState, action: Action): iDataState {
  switch (action.type) {
    case '@FORM/SET_DATA':
      return { data: { ...state.data, ...action.data } };
    default:
      return state;
  }
}

export const useFormData = (): Return => {
  const { data } = useSelector(({ commonReducer }: StateType) => commonReducer, shallowEqual);
  const dispatch = useDispatch();

  const setData = useCallback((data: iData) => {
    dispatch({ data, type: '@FORM/SET_DATA' });
  }, []);

  return {
    data,
    setData,
  };
};

export default useFormData;
