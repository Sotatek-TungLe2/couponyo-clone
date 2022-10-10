import * as z from 'zod';
import moment from 'moment';
import { ERR_MS } from './message';

export const schema = z.object({
  couponName: z.string().trim().min(1, { message: ERR_MS.MS2 }).max(20, { message: ERR_MS.MS1 }),
  issuance: z.object({
    issuanceParent: z.string().trim().min(1, { message: ERR_MS.MS2 }),
    issuanceChild: z.string().trim().min(1, { message: ERR_MS.MS2 }),
    issuancePercent: z.number().positive({ message: ERR_MS.MS4 }).lte(100, { message: ERR_MS.MS3 }),
  }),
  issuanceClassification: z.string().trim().min(1, { message: ERR_MS.MS2 }),
  paymentAcount: z.number().positive().gte(1000000, { message: ERR_MS.MS8 }),
  couponBenefits: z.object({
    typeBenefit: z.string().trim().min(1, { message: ERR_MS.MS2 }),
    benefitValue: z.number().positive({ message: ERR_MS.MS4 }),
    maxDiscount: z.number().positive().gte(1000000, { message: ERR_MS.MS8 }),
  }),
  limitUse: z
    .object({
      isLimitUserActive: z.boolean(),
      limitUseValue: z
        .number()
        .nullable()
        .transform((value) => value ?? NaN),
    })
    .refine(
      (val) =>
        (val.isLimitUserActive && val.limitUseValue > 0) ||
        (!val.isLimitUserActive && val.limitUseValue === 0),
      {
        message: 'Limit number of uses must be greater than 0',
      }
    ),
  maximumUse: z
    .object({
      isMaximumUse: z.boolean(),
      maximumUseValue: z
        .number()
        .nullable()
        .transform((value) => value ?? NaN),
    })
    .refine(
      (val) =>
        (val.isMaximumUse && val.maximumUseValue > 0) ||
        (!val.isMaximumUse && val.maximumUseValue === 0),
      {
        message: 'Maximum number of uses must be greater than 0',
      }
    ),
  subjectsApply: z.string(),
  oderType: z.object({
    isOderTypeActive: z.boolean(),
    value: z.string(),
  }),
  yogiPass: z.object({
    isYogipassActive: z.boolean(),
    isYogipass: z.boolean(),
  }),
  useChanel: z.object({
    isUseChanelActive: z.boolean(),
    app: z.boolean(),
    web: z.boolean(),
  }),
  // useCityRegion: z.boolean(),
  useDay: z.object({
    isUseDayActive: z.boolean(),
    mon: z.boolean(),
    tue: z.boolean(),
    wed: z.boolean(),
    thu: z.boolean(),
    fri: z.boolean(),
    sat: z.boolean(),
    sun: z.boolean(),
  }),
  useDate: z.object({
    dateSelect: z.date().nullable().optional(),
    value: z.string(),
  }),
  useTime: z
    .object({
      startTime: z.date().nullable().optional(),
      endTime: z.date().nullable().optional(),
      startTimeValue: z.string(),
      endTimeValue: z.string(),
    })
    .refine(
      (date) => {
        return !(
          !!date.startTime &&
          !!date.endTime &&
          moment(date.startTime).isAfter(date.endTime)
        );
      },
      {
        message: 'EndTime must large than StartTime',
      }
    )
    .optional(),
});

export type Schema = z.infer<typeof schema>;
