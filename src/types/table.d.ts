export interface CouponDetailsTableProps {
  id: number;
  state: string;
  nameOfCouponDetails: string;
  couponBenefits: string;
  subjectsToApplyCoupons: string;
  couponApplicationConditions: string;
  issuingEntity: string;
  creationDate: string;
  constructor: string;
}

export interface CouponIssuanceTableProps {
  id: number;
  state: string;
  couponName: string;
  couponIssuanceMethod: string;
  issuedNumber: number;
  numberOfUsers: number;
  result: string;
  expirationDate: string;
  couponIssuancePeriod: string;
  issuer: string;
}
