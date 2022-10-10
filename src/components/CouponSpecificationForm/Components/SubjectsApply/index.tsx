import { RadioField } from '@base/formControl';
import styled from '@emotion/styled';
import { Schema } from 'components/CouponSpecificationForm/utils/schema';
import { UseFormReturn } from 'react-hook-form';

const subjectAll = [
  { value: 'subjectAll', label: 'All', checked: false },
  { value: 'subjectFranchise', label: 'Franchise (brand)', checked: true },
  { value: 'subjectCategory', label: 'Category', checked: true },
  { value: 'subjectRestaurant', label: 'Restaurant', checked: true },
  { value: 'subjectYomart', label: 'Yomart', checked: true },
];
type Props = {
  form: UseFormReturn<Schema>;
};

const SubjectsApply = ({ form }: Props) => {
  return (
    <SWRapOrderType>
      <RadioField name="subjectsApply" label="subjectsApply" form={form} data={subjectAll} />
    </SWRapOrderType>
  );
};

const SWRapOrderType = styled.div`
  display: flex;
`;
export default SubjectsApply;
