import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  label: string;
  id?: string;
  guildText?: string;
};

function FormControl({ children, label, id = label, guildText }: Props) {
  return (
    <SWrapControl>
      <SLabel htmlFor={id}>{label}</SLabel>
      <SWrapFields>{children}</SWrapFields>
      {!!guildText && (
        <Typography variant="caption" display="block" gutterBottom>
          {guildText}
        </Typography>
      )}
    </SWrapControl>
  );
}
const SWrapControl = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
`;
const SLabel = styled.label`
  font-weight: 500;
  margin-right: 5px;
  flex: 0 0 20%;
`;
const SWrapFields = styled.div`
  flex: 1;
`;
export default FormControl;
