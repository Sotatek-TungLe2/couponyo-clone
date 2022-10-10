import {
  Done,
  ExpandLess,
  ExpandMore,
  NotificationsActive,
  Settings,
  PinDrop,
  Straighten,
  NotificationImportant,
} from '@mui/icons-material';

export const MenuList: PermissionMenuList = {
  coupon: {
    path: '/coupon',
    icon: 'PinDrop',
    label: 'Creat Coupon',
    permission: true,
  },
  issueList: {
    path: '/issues',
    icon: 'NotificationsActive',
    label: '이슈 현황',
    permission: true,
  },
  deliveryList: {
    path: '/delivery',
    icon: 'PinDrop',
    label: '배달 현황',
    permission: true,
  },
  completeList: {
    path: '/order',
    icon: 'Done',
    label: '주문 현황',
    permission: true,
  },
  manage: {
    path: '/manage',
    icon: 'Settings',
    label: '관리',
    sub: {
      distance: {
        path: '/manage/distance',
        icon: 'Straighten',
        label: '거리 관리',
        permission: true,
      },
      whatsupyo: {
        path: '/manage/config',
        icon: 'NotificationImportant',
        label: '설정 관리',
        permission: true,
      },
    },
    permission: true,
  },
};

export const MuiIcons = {
  Done,
  ExpandLess,
  ExpandMore,
  NotificationsActive,
  Settings,
  PinDrop,
  Straighten,
  NotificationImportant,
};

export type IconType = keyof typeof MuiIcons;
