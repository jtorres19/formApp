import {Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {delay, Observable, of} from "rxjs";

@Injectable({providedIn: "root"})
export class EmailValidatorService implements AsyncValidator {
    /*validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const email = control.value;

        console.log({email});

        return of({emailTaken: true})
    };*/

    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const email = control.value;

        const httpCallObservable = new Observable<ValidationErrors | null>((subscriber) => {
            console.log({email});

            if (email === 'juan@google.cl') {
                subscriber.next({emailTaken: true});
                subscriber.complete();
            }

            subscriber.next(null)
            subscriber.complete();
        }).pipe(
            delay(3000)
        );

        return httpCallObservable;
    }
}
