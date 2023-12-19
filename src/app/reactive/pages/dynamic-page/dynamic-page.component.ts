import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.css']
})
export class DynamicPageComponent {
    public myForm: FormGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favoriteGames: this.formBuilder.array([
            ['Metal Gear', Validators.required],
            ['Death Stranding', Validators.required],
        ]),
    });
    public newFavorite: FormControl = new FormControl('', Validators.required)

    constructor(private formBuilder: FormBuilder) {
    }
    get favoriteGames() {
        return this.myForm.get('favoriteGames') as FormArray;
    }

    isValidField(field: string): boolean | null {
        return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
    }

    getFieldError(field: string): string | null {
        if (!this.myForm.controls[field]) return null

        const errors = this.myForm.controls[field].errors || {};

        for (const key of Object.keys(errors)) {
            switch (key) {
                case 'required':
                    return 'Este campo es requerido'
                case 'minlength':
                    return `Mínimo ${errors['minlength']['requiredLength']} caracteres.`
            }
        }

        return null;
    }

    onAddToFavorites() {
        if (this.newFavorite.invalid) return;

        // this.favoriteGames.push(new FormControl(this.newFavorite.value, Validators.required));
        this.favoriteGames.push(this.formBuilder.control(this.newFavorite.value, Validators.required));

        this.newFavorite.reset();
    }

    isValidFieldInArray(formArray: FormArray, index: number):boolean | null {
        return formArray.controls[index].errors && formArray.controls[index].touched;
    }

    onDeleteFavorite(index:number): void {
        this.favoriteGames.removeAt(index);
    }

    onSubmit() {
        if (this.myForm.invalid) {
            this.myForm.markAllAsTouched();

            return
        }

        console.log(this.myForm.value);

        (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([])
        this.myForm.reset();
    }
}
