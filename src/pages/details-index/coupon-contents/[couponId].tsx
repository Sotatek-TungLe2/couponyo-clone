import { Box } from '@mui/material';
import CouponContentSearch from 'components/DetailsIndex/CouponContent/CouponContentSearch';
import CouponInfo from 'components/DetailsIndex/CouponContent/CouponInfo';
import SearchSpecifications from 'components/DetailsIndex/SearchCouponDetails';
import SearchResult from 'components/DetailsIndex/SearchCouponDetails/SearchResult';
import TableCoupon from 'components/DetailsIndex/TableCoupon';
import {
  mockCouponContentsRowsData,
  mockDetailsListRowsData,
} from 'components/DetailsIndex/utils/data';
import { selectedRowType } from 'components/DetailsIndex/utils/types';
import { columnsDetailsList, columnsIssuanceList } from 'constants/listCoupon';
import React from 'react';

const CouponContents = () => {
  const handleClickCopy = (selectedRows: selectedRowType) => {
    console.log('copy');
  };
  const handleClickDelete = (selectedRows: selectedRowType) => {
    console.log('delete');
  };
  const handleClickStop = (selectedRows: selectedRowType) => {
    console.log('stop');
  };
  return (
    <Box>
      <CouponInfo />
      <CouponContentSearch />
      <SearchResult />
      <TableCoupon
        handleClickCopy={handleClickCopy}
        handleClickDelete={handleClickDelete}
        handleClickStop={handleClickStop}
        columns={columnsIssuanceList}
        rows={mockCouponContentsRowsData}
      />
    </Box>
  );
};

export default CouponContents;
