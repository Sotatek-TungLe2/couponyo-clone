import styled from '@emotion/styled';
import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import { FC, ReactElement } from 'react';
import { dayOptions } from '../utils/constants';

const QuickDateOptions = [
  {
    label: 'Today',
    value: dayOptions.Today,
  },
  {
    label: '-7 days',
    value: dayOptions.OneWeek,
  },
  {
    label: '-1 months',
    value: dayOptions.OneMonth,
  },
  {
    label: '-3 months',
    value: dayOptions.ThreeMonths,
  },
  {
    label: '-6 months',
    value: dayOptions.SixMonths,
  },
];

interface IQuickSetDate {
  selectedItem: dayOptions | null;
  handleQuickDate: (e: React.MouseEvent<HTMLElement>, days: dayOptions) => void;
}

const QuickButtons = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-self: flex-start;
  & .MuiToggleButton-root {
    text-transform: none;
  }
`;

const QuickSetDate: FC<IQuickSetDate> = (props): ReactElement => {
  const { selectedItem, handleQuickDate } = props;
  return (
    <QuickButtons>
      <ToggleButtonGroup
        value={selectedItem}
        exclusive
        onChange={handleQuickDate}
        aria-label="text alignment"
        size="small"
      >
        {QuickDateOptions.map((item) => (
          <ToggleButton key={item.value} value={item.value} aria-label="left aligned">
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </QuickButtons>
  );
};

export default QuickSetDate;
