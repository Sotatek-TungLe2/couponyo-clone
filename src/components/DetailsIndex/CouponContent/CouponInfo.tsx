import {
  AccordionSummary,
  Typography,
  AccordionDetails,
  Accordion,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useState } from 'react';
import styled from '@emotion/styled';
import React from 'react';

const CouponInfoWrapper = styled(Box)``;
const CouponInfoHeader = styled(AccordionSummary)`
  background: #e0e0e0;
  min-height: 48px !important;
  & .MuiAccordionSummary-content {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.Mui-expanded {
      margin: 0;
    }
  }
`;
const CouponInfoAction = styled(Box)``;
const CouponInfo: FC = () => {
  const [expand, setExpand] = useState(true);
  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };
  return (
    <CouponInfoWrapper>
      <Typography variant="h5" mb={3}>
        Coupon number / Name of coupon details
      </Typography>
      <Accordion expanded={expand}>
        <CouponInfoHeader expandIcon={<ExpandMoreIcon onClick={toggleAcordion} />}>
          <Typography>Coupon information</Typography>
          <CouponInfoAction>
            <FormControlLabel
              control={<Switch />}
              label="Stop using"
              labelPlacement="start"
              sx={{ mr: 1 }}
            />
            <Button variant="outlined" sx={{ mr: 1 }}>
              View Details
            </Button>
          </CouponInfoAction>
        </CouponInfoHeader>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ py: 1, px: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography>Coupon subject and condition</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  10% discount (up to 10,000 won) / Minimum order amount : 3,000 won / Limit number
                  of uses: 100ea / Use in order : 10ea / Limited number of Issued : 100ea
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box sx={{ py: 1, px: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography>Coupon benefits</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>
                  All / Express(OD) / Yogi Pass / Payment Method / Seoul, Gyeonggi / Mon, Tue, Web
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box sx={{ py: 1, px: 2 }}>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography>Coupon issuance subject</Typography>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Typography>Alliance Promotion/Payment alliance/ 100%</Typography>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </CouponInfoWrapper>
  );
};

export default CouponInfo;
