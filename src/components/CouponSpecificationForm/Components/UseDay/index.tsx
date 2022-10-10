import { CheckboxField, SwitchField } from '@base/formControl';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Tday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
const days: Tday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

type Props = {
  form: UseFormReturn<Schema>;
};

const UseDay = ({ form }: Props) => {
  // const { control } = form;
  // const isActive = useWatch({
  //   control,
  //   name: 'useDay.isUseDayActive',
  //   defaultValue: false,
  // });

  const daysWatch = days.map((item) => form.watch(`useDay.${item}`));

  useEffect(() => {
    if (daysWatch.every((element) => element === true)) {
      form.setValue('useDay.isUseDayActive', false);
    } else {
      form.setValue('useDay.isUseDayActive', true);
    }
  }, [daysWatch, form]);

  // useEffect(() => {
  //   if (isActive) days.forEach((item: Tday) => form.setValue(`useDay.${item}`, !isActive));
  // }, [isActive, form]);
  return (
    <>
      <SwitchField label="Max Person" form={form} name="useDay.isUseDayActive" />
      {days.map((item, index) => (
        <span key={index}>
          <CheckboxField name={`useDay.${item}`} label={item} form={form} />
        </span>
      ))}
    </>
  );
};

export default UseDay;
