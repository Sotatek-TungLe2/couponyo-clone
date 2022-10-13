import * as React from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridColDef,
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  GridSelectionModel,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { CouponDetailsTableProps, CouponIssuanceTableProps } from '@type/table';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { columnsDetailsList, columnsIssuanceList } from 'constants/listCoupon';
import { apiClient } from '@lib/apiClient';

interface TableComponentProps {
  handleClickDelete: (selectedRows: CouponDetailsTableProps[] | CouponIssuanceTableProps[]) => void;
  handleClickCopy: (selectedRows: CouponDetailsTableProps[] | CouponIssuanceTableProps[]) => void;
  handleClickStop: (selectedRows: CouponDetailsTableProps[] | CouponIssuanceTableProps[]) => void;
  handleClickDownload: (
    selectedRows: CouponDetailsTableProps[] | CouponIssuanceTableProps[]
  ) => void;
  columns: GridColDef[];
  rows: CouponDetailsTableProps[] | CouponIssuanceTableProps[];
}

const mockRows = () => {
  const result = [];
  for (let i = 0; i < 100; i++) {
    // result.push({
    //   id: i + 1,
    //   state: 'Use',
    //   nameOfCouponDetails: 'Discount 10% Express on Chicken Category(up to 3000 KRW)',
    //   couponBenefits: '10% Up to 30,000 won, Minimum 3000 won',
    //   subjectsToApplyCoupons: 'All',
    //   couponApplicationConditions: 'Except Express Yogi Pass',
    //   issuingEntity: 'OOOO',
    //   creationDate: 'YYYY-MM-DD',
    //   constructor: 'jaesung.park',
    // });
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
const rows: any[] = mockRows();

export default function TableCoupon(props: TableComponentProps) {
  const { handleClickCopy, handleClickStop } = props;
  const [pageSize, setPageSize] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<
    CouponDetailsTableProps[] | CouponIssuanceTableProps[]
  >([]);

  const handleChangleSelection = (ids: GridSelectionModel) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRowData);
  };
  const handleClickDownload = (arr: CouponDetailsTableProps[] | CouponIssuanceTableProps[]) => {
    const csvString = [[Object.keys(arr[0])], ...arr.map((item) => [Object.values(item)])]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    a.click();
  };
  const handleClickDelete = async (
    selectedRows: CouponDetailsTableProps[] | CouponIssuanceTableProps[]
  ) => {
    const a = await apiClient.delete(
      'http://localhost:3000/api/couponDetailsIndex',
      {},
      { selectedRows }
    );
    console.log(a);
  };
  return (
    <Box sx={{ height: 560, width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 1, marginBottom: 1 }}>
        <Button
          onClick={() => handleClickDelete(selectedRows)}
          variant="contained"
          disabled={!selectedRows.length}
        >
          Delete
        </Button>
        <Button
          onClick={() => handleClickCopy(selectedRows)}
          variant="outlined"
          disabled={selectedRows.length !== 1}
        >
          Copy
        </Button>
        <Button
          onClick={() => handleClickStop(selectedRows)}
          variant="outlined"
          disabled={!selectedRows.length}
        >
          Stop
        </Button>
        <Button
          onClick={() => handleClickDownload(selectedRows)}
          variant="contained"
          disabled={!selectedRows.length}
        >
          Download
        </Button>
      </Box>

      <DataGrid
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#e5e5e5',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-viewport': {
            maxHeight: 'fit-content !important',
          },
          '& .MuiDataGrid-row': {
            maxHeight: 'fit-content !important',
          },
          '& .MuiDataGrid-renderingZone': {
            maxHeight: 'fit-content !important',
          },
          '& .MuiDataGrid-cell': {
            maxHeight: 'fit-content !important',
            overflow: 'auto',
            whiteSpace: 'initial !important',
            lineHeight: '16px !important',
            display: 'flex !important',
            alignItems: 'center',
            paddingTop: '10px !important',
            paddingBottom: '10px !important',
          },
        }}
        rows={rows}
        columns={columnsIssuanceList}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20, 30, 40, 50, 100, 150]}
        pagination
        components={{
          Footer: CustomPagination,
        }}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={handleChangleSelection}
        disableColumnFilter
        disableColumnMenu
      />
    </Box>
  );
}

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);

  const handleChange = (event: SelectChangeEvent) => {
    apiRef.current.setPageSize(Number(event.target.value));
  };
  return (
    <Box sx={{ display: 'flex', gap: 2, margin: 2 }}>
      <FormControl
        sx={{ display: 'flex', gap: 1, flexDirection: 'row', alignItems: 'center' }}
        variant="standard"
      >
        Rows per page:
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize.toString()}
          label="Size"
          onChange={handleChange}
        >
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
          <MenuItem value={150}>150</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
          apiRef.current.setPage(value - 1)
        }
      />
    </Box>
  );
};
