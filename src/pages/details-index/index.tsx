import { Box } from '@mui/material';
import SearchSpecifications from 'components/DetailsIndex/SearchCouponDetails';
import SearchResult from 'components/DetailsIndex/SearchCouponDetails/SearchResult';
import TableCoupon from 'components/DetailsIndex/TableCoupon';
import { mockDetailsListRowsData } from 'components/DetailsIndex/utils/data';
import { selectedRowType } from 'components/DetailsIndex/utils/types';
import { columnsDetailsList, columnsIssuanceList } from 'constants/listCoupon';
import React from 'react';

const DetailsIndex = () => {
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
      <SearchSpecifications />
      <SearchResult />
      <TableCoupon
        handleClickCopy={handleClickCopy}
        handleClickDelete={handleClickDelete}
        handleClickStop={handleClickStop}
        columns={columnsDetailsList}
        rows={mockDetailsListRowsData}
      />
    </Box>
  );
};

export default DetailsIndex;
