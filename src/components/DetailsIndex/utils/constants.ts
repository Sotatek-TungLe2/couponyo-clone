export enum dayOptions {
  Today = 0,
  OneWeek = 7,
  OneMonth = 30,
  ThreeMonths = 90,
  SixMonths = 180,
}

export const SearchType = ['Name of coupon details', 'Constructor'];

export const CouponConditions = [
  'All',
  'Order Type',
  'Yogi Pass',
  'Use Channel',
  'Use Area',
  'Use Day',
  'Use Date',
  'Use Time',
];

export const ApplySubject = ['All', 'Franchise(brand)', 'Category', 'Restaurant', 'Yomart'];

export const CouponBenefits = ['All', 'Precision', 'Flat Rate'];

export interface SearchParam {
  applySubjects: string;
  couponBenefit: string;
  couponCondition: string;
  couponName?: string;
  creator?: string;
  endTime: string;
  issuingEntity: string;
  startTime: string;
}
