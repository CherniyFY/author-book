import { FormGroup } from "@angular/forms";

export function passwordValidator(formGroup: FormGroup) {
  return formGroup.controls.password.value ===
    formGroup.controls.password_confirm.value
    ? null
    : { areEqual: false };
}
