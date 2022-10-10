import { CheckboxField, SwitchField } from '@base/formControl';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { ChangeEvent, useEffect } from 'react';
import { UseFormReturn, useWatch } from 'react-hook-form';

type Chanel = 'app' | 'web';
const chanels: Chanel[] = ['app', 'web'];

type Props = {
  form: UseFormReturn<Schema>;
};

const UseChanel = ({ form }: Props) => {
  const { control } = form;

  const onChange = (item: ChangeEvent<HTMLInputElement>) => {
    console.log(item.target.value);

    if (item.target.value) {
      console.log('here 1231');

      // for (let i = 0; i < chanels.length; i++) {
      //   form.setValue(`useChanel.${chanels[i]}`, true);
      // }
      // chanels.forEach((item: Chanel) => {
      //   console.log(`useChanel.${item}`);

      //   form.setValue(`useChanel.${item}`, true);
      // });
    }
  };
  const chanelsWatch = chanels.map((item) => form.watch(`useChanel.${item}`));

  if (chanelsWatch.every((element) => element === true)) {
    form.setValue('useChanel.isUseChanelActive', false);
  } else {
    form.setValue('useChanel.isUseChanelActive', true);
  }

  // useEffect(() => {
  //   if (isActive) days.forEach((item: Tday) => form.setValue(`useDay.${item}`, !isActive));
  // }, [isActive, form]);
  return (
    <>
      <SwitchField label="" form={form} name="useChanel.isUseChanelActive" onChange={onChange} />
      {chanels.map((item, index) => (
        <span key={index}>
          <CheckboxField name={`useChanel.${item}`} label={item} form={form} />
        </span>
      ))}
    </>
  );
};

export default UseChanel;
