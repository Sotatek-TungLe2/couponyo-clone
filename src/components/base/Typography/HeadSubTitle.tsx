import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { theme } from '@styles/theme';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function HeadSubTitle({ children }: Props) {
  const SHeadTitle = styled(Typography)`
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    background-color: ${theme.palette.grey[200]};
    margin: 0;
  `;
  return (
    <SHeadTitle variant="h3" gutterBottom>
      {children}
    </SHeadTitle>
  );
}
