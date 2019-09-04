import { AbstractControl, ValidatorFn } from '@angular/forms';

const allowedtypes = ['png', 'jpg']

export function fileValidator(imageUrl: string): ValidatorFn {
    return (control : AbstractControl) => {
        const file = control.value;
        console.log("FILE", file)
        
        if (file) {
            const dotArr = file.name.split('.');
            const fileType = dotArr[dotArr.length - 1].toLowerCase();
            if (allowedtypes.includes(fileType)) {
                return null
            }

            // Invalid
            return {
                'fileValidator': true
            };
        }

        console.log('%c VALIDATOR', 'color: green; font-size: 20px', imageUrl)
        // The trick here is to pass value - image url -
        //  so if url is found and controler value is empty we can make controller valid to submit format
        //  as photo is has been already set previously 
        if (imageUrl) {
            return null;
        }

        // Invalid
        return  {
            'fileValidator': true
        };
    };
}