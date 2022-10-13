import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
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
import { CouponDetailsTableProps, CouponIssuanceTableProps } from '@type/table';

type selectedRowType = (CouponDetailsTableProps | CouponIssuanceTableProps)[];

interface TableComponentProps {
  handleClickDelete: (selectedRows: selectedRowType) => void;
  handleClickCopy: (selectedRows: selectedRowType) => void;
  handleClickStop: (selectedRows: selectedRowType) => void;
  handleClickDownload: (selectedRows: selectedRowType) => void;
  columns: GridColDef[];
  rows: selectedRowType;
}

export default function TableCoupon(props: TableComponentProps) {
  const { handleClickCopy, handleClickStop, handleClickDelete, columns, rows } = props;
  const [pageSize, setPageSize] = useState<number>(20);
  const [selectedRows, setSelectedRows] = useState<selectedRowType>([]);

  const handleChangleSelection = (ids: GridSelectionModel) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = rows.filter((row) => selectedIDs.has(row.id));
    setSelectedRows(selectedRowData);
  };
  const handleClickDownload = (arr: selectedRowType) => {
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
        columns={columns}
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
