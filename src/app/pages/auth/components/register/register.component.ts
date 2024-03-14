import { signupRequest } from './../../../../root-store/authentication-store/authentication.actions';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Country } from 'src/app/services/models';
import { AppService } from 'src/app/services/app.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/root-store';

@Component({
  selector: 'dc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  countries: Country[] = [];
  registerForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private appService: AppService,
    private store: Store<AppState>
  ) {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required]],
        phone: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password1: [null, [Validators.required, Validators.minLength(8)]],
        password2: [null, [Validators.required, Validators.minLength(8)]],
      },

      { validators: this.checkPasswordsEquality }
    );
  }

  ngOnInit() {
    // this.appService
    //   .getCountries()
    //   .pipe(take(1))
    //   .subscribe((countries) => {
    //     this.countries = countries;
    //   });
  }

  checkPasswordsEquality: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password1')?.value;
    let confirmPass = group.get('password2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  onSubmit() {
    const data = this.registerForm.value;
    console.log(data);
    this.store.dispatch(signupRequest(data));
  }
}
