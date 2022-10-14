import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Link from 'next/link';

export const columnsIssuanceList: GridColDef[] = [
  {
    field: 'detailedIssuedContent',
    headerName: 'Detail issued content',
    width: 180,
    renderCell: (params: GridRenderCellParams) => <Button variant="contained">Download</Button>,
    sortable: false,
  },
  {
    field: 'recall',
    headerName: 'Recall',
    width: 90,
    renderCell: () => <Button variant="contained">Recall</Button>,
    sortable: false,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 90,
    sortable: false,
  },
  {
    field: 'couponName',
    headerName: 'Coupon name',
    width: 220,
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {params.value}
      </Typography>
    ),
    sortable: false,
  },
  {
    field: 'couponIssuanceMethod',
    headerName: 'Coupon issuance method',
    width: 210,
    sortable: false,
  },
  {
    field: 'issuedNumber',
    headerName: 'Issued number',
    width: 120,
    sortable: false,
  },
  {
    field: 'numberOfUsers',
    headerName: 'Number of users',
    width: 120,
    sortable: false,
  },
  {
    field: 'result',
    headerName: 'Result',
    width: 110,
    sortable: false,
  },
  {
    field: 'expirationDate',
    headerName: 'Expiration date',
    width: 150,
    sortable: false,
  },
  {
    field: 'couponIssuancePeriod',
    headerName: 'Coupon issuance period',
    width: 180,
    sortable: false,
  },
  {
    field: 'issuer',
    headerName: 'Issuer',
    width: 110,
    flex: 1,
    sortable: false,
  },
];

export const columnsDetailsList: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'issued',
    headerName: 'Issued',
    width: 100,
    renderCell: () => <Button variant="contained">Issue</Button>,
    sortable: false,
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 120,
    renderCell: () => (
      <Link href={`/details-index/coupon-contents/1`}>
        <Button variant="contained">Content</Button>
      </Link>
    ),
    sortable: false,
  },
  {
    field: 'state',
    headerName: 'State',
    width: 80,
    sortable: false,
  },
  {
    field: 'nameOfCouponDetails',
    headerName: 'Name of CouponDetails',
    width: 220,
    renderCell: (params: GridRenderCellParams) => (
      <Typography
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {params.value}
      </Typography>
    ),
    sortable: false,
  },
  {
    field: 'couponBenefits',
    headerName: 'Coupon benefits',
    width: 210,
    sortable: false,
  },
  {
    field: 'subjectsToApplyCoupons',
    headerName: 'Subject to apply coupons',
    width: 190,
    sortable: false,
  },
  {
    field: 'couponApplicationConditions',
    headerName: 'Coupon application conditions',
    width: 210,
    sortable: false,
  },
  {
    field: 'issuingEntity',
    headerName: 'Issuing entity',
    width: 110,
    sortable: false,
  },
  {
    field: 'creationDate',
    headerName: 'Creation date',
    width: 110,
    sortable: false,
  },
  {
    field: 'constructor',
    headerName: 'Constructor',
    width: 110,
    flex: 1,
    sortable: false,
  },
];
