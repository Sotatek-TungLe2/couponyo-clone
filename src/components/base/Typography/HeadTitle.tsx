import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { theme } from '@styles/theme';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function HeadTitle({ children }: Props) {
  const SHeadTitle = styled(Typography)`
    font-size: 20px;
    font-weight: 500;
    padding: 10px;
    background-color: ${theme.palette.grey[300]};
    margin: 0;
  `;
  return (
    <SHeadTitle variant="h2" gutterBottom>
      {children}
    </SHeadTitle>
  );
}
