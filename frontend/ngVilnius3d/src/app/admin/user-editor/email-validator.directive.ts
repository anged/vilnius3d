import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormControl } from '@angular/forms';
import { CustomEmailValidator } from './customEmailValidator';

@Directive({
  selector: '[v3dEmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {
  // using input to provide custom email provodider, in this application we using google oauth login
  @Input('v3dEmailValidator') emailProvider:string
  constructor() { }

  validate(control: FormControl): ValidationErrors {
    return CustomEmailValidator(this.emailProvider)(control);
  }

}
