import { FormGroup } from '@angular/forms';
import { IFormLottery } from '@app/modules/admin/pages/add-or-edit-lottery/add-or-edit-lottery.component';

export const validEndDate = (form: FormGroup<IFormLottery>) => {
  const startDate = form.controls['startDate'].value;
  const endDate = form.controls['endDate'].value;

  if (startDate.getTime() >= endDate.getTime()) {
    return { date_invalid: true };
  }
  return null;
};
