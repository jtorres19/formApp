import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/service/validators.service";
import {EmailValidatorService} from "../../../shared/validators/email-validator.service";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
    public myForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
        // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidatorService()]],
        email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidatorService.validate]],
        username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPass: ['', [Validators.required]],
    }, {
        validators: [this.validatorsService.fieldsAreEquals('password', 'confirmPass')]
    });

    constructor(private formBuilder: FormBuilder, private validatorsService: ValidatorsService, private emailValidatorService: EmailValidatorService) {}

    onSubmit() {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();

            return;
        }

        console.log(this.myForm.value);
    }

    isValidField(field: string): boolean | null {
        return this.validatorsService.isValidField(this.myForm, field);
    }
}
