import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  data: Schema;
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
};

export default function PreviewCreateModal({ data, open, onClose, onAgree, ...props }: Props) {
  const {
    couponName,
    issuance,
    couponBenefits,
    paymentAcount,
    limitUse,
    maximumUse,
    subjectsApply,
    oderType,
    yogiPass,
    useChanel,
    useDay,
    useDate,
    useTime,
  } = data;

  const mappingData: {
    title: string;
    content: string;
  }[] = [
    {
      title: 'Coupon Specification Name',
      content: couponName,
    },
    {
      title: 'Coupon issuer',
      content: `${issuance.issuanceParent}/${issuance.issuanceChild}/${issuance.issuancePercent}`,
    },
    {
      title: 'Coupon benefits',
      content: `${couponBenefits.typeBenefit}/${couponBenefits.benefitValue}/${couponBenefits.maxDiscount}`,
    },
    {
      title: 'Minimum payment amount',
      content: `${paymentAcount} won`,
    },
    {
      title: 'Limit number of uses',
      content:
        limitUse.isLimitUserActive && limitUse.limitUseValue
          ? limitUse.limitUseValue.toString()
          : 'OFF',
    },
    {
      title: 'Maximum number of uses',
      content:
        maximumUse.isMaximumUse && maximumUse.maximumUseValue
          ? maximumUse.maximumUseValue?.toString()
          : 'OFF',
    },
    {
      title: 'Subjects to apply coupons',
      content: subjectsApply,
    },
    {
      title: 'Order type',
      content: oderType.isOderTypeActive ? oderType.value : 'OFF',
    },
    {
      title: 'Yogi Pass',
      content: yogiPass.isYogipassActive ? 'Active' : 'OFF',
    },
    {
      title: 'Use Chanel',
      content: (() => {
        if (useChanel.isUseChanelActive) {
          const web = useChanel.web ? 'Active' : 'Inactive';
          const app = useChanel.app ? 'Active' : 'Inactive';
          return `App: ${app}/ Web: ${web}`;
        } else {
          return 'OFF';
        }
      })(),
    },
    {
      title: 'Use Day',
      content: (() => {
        if (useDay.isUseDayActive) {
          const mon = useDay.mon ? 'Mon/' : '';
          const tue = useDay.tue ? 'Tue/' : '';
          const wed = useDay.wed ? 'Wed/' : '';
          const thu = useDay.thu ? 'Thu/' : '';
          const fri = useDay.fri ? 'Fri/' : '';
          const sat = useDay.sat ? 'Sat/' : '';
          const sun = useDay.sun ? 'sun/' : '';
          return `${mon}${tue}${wed}${thu}${fri}${sat}${sun}`;
        } else {
          return 'OFF';
        }
      })(),
    },
  ];

  const renderItem = (title: string, conetent: string, index: number) => (
    <ListItem key={index}>
      <Typography variant="subtitle1" gutterBottom>
        {title}:
      </Typography>
      <Typography variant="body1" gutterBottom style={{ marginLeft: 5, fontWeight: 700 }}>
        {conetent}
      </Typography>
    </ListItem>
  );

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth={true}
        open={open}
        {...props}
        aria-describedby="alert-dialog-slide-description"
      >
        <SDialogTitle>{'쿠폰명세를 생성하시겠습니까?'}</SDialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
              {mappingData &&
                mappingData.map((item, index) => renderItem(item.title, item.content, index))}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const SDialogTitle = styled(DialogTitle)`
  background-color: ${theme.palette.secondary.main};
  color: ${theme.palette.secondary.contrastText};
`;
