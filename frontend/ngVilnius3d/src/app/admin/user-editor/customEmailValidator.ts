import { ValidatorFn, FormControl } from '@angular/forms';

export function CustomEmailValidator(emailProvider: string): ValidatorFn {
    return (control: FormControl) => {
        const regex = new RegExp( "^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@(" + emailProvider + ")?(\\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$");
        if (regex.test(control.value)) {
            return null;
        } else {
            // Invalid
            return {
                'email': true
            };

        }

    };
}