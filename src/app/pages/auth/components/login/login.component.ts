import { loginRequest } from './../../../../root-store/authentication-store/authentication.actions';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/root-store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { URLs } from 'src/app/app.constants';

@Component({
  selector: 'dc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  registerUrl = '/' + URLs.register;

  credentialsForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      keepLogin: [false],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const data = this.credentialsForm.value;
    this.store.dispatch(
      loginRequest({
        email: data.email,
        password: data.password,
        keepLogin: data.keepLogin,
      })
    );
  }
}
