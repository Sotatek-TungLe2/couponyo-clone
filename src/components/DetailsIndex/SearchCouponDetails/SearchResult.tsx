import { Box, Button, Typography } from '@mui/material';
import React, { FC } from 'react';

const SearchResult: FC = () => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} sx={{ p: 1, my: 2 }}>
      <Typography>Results total: 000</Typography>
      <Button variant="contained">+ create coupon</Button>
    </Box>
  );
};

export default SearchResult;
