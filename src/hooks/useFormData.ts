import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import type { StateType } from './redux-store';

const defaultData = {
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

type iData = Schema;
type TAction = '@FORM/SET_DATA' | '@FORM/SET_COPY';
type Action = { data: iDataState; type: TAction };

interface iDataState {
  data: iData;
  copyData: iData;
  isCopy: boolean;
}

const initialState: iDataState = {
  data: defaultData,
  copyData: defaultData,
  isCopy: false,
};
interface Return {
  // @typescript-eslint/no-explicit-any
  data: iData;
  isCopy: boolean;
  setData: (data: iData) => void;
  setIsCopy: (isCopy: boolean) => void;
}

export function reducer(state = initialState, action: Action): iDataState {
  switch (action.type) {
    case '@FORM/SET_DATA':
      return { ...state, data: { ...state.data, ...action.data } };
    case '@FORM/SET_COPY':
      return { ...state, isCopy: action.data.isCopy };
    default:
      return state;
  }
}

export const useFormData = (): Return => {
  const { data, isCopy } = useSelector(({ formReducer }: StateType) => formReducer, shallowEqual);
  const dispatch = useDispatch();

  const setData = useCallback((data: iData) => {
    dispatch({ data, type: '@FORM/SET_DATA' });
  }, []);

  const setIsCopy = useCallback((isCopy: boolean) => {
    dispatch({ data: { isCopy }, type: '@FORM/SET_COPY' });
  }, []);

  return {
    data,
    isCopy,
    setData,
    setIsCopy,
  };
};

export default useFormData;
