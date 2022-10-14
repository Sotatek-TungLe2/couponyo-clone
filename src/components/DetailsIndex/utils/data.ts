const mockCouponContentsRows = () => {
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push({
      id: i + 1,
      state: 'Use',
      couponName: 'September Specific member surprise benefits',
      couponIssuanceMethod: 'Keyword (yogiyo)',
      issuedNumber: 'OOOO',
      numberOfUsers: 'OOOO',
      result: 'Success',
      expirationDate: 'YYYY-MM-DD HH:MM',
      couponIssuancePeriod: 'YYYY-MM-DD HH:MM',
      issuer: 'jaesung.park',
    });
  }
  return result;
};
const mockDetailsListRows = () => {
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push({
      id: i + 1,
      state: 'Use',
      nameOfCouponDetails: 'Discount 10% Express on Chicken Category(up to 3000 KRW)',
      couponBenefits: '10% Up to 30,000 won, Minimum 3000 won',
      subjectsToApplyCoupons: 'All',
      couponApplicationConditions: 'Except Express Yogi Pass',
      issuingEntity: 'OOOO',
      creationDate: 'YYYY-MM-DD',
      constructor: 'jaesung.park',
    });
  }
  return result;
};

export const mockCouponContentsRowsData: any[] = mockCouponContentsRows();
export const mockDetailsListRowsData: any[] = mockDetailsListRows();
