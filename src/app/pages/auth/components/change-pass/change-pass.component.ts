import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent {
  formPassword: FormGroup;
  submittedSucessfully = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.formPassword = this.fb.group(
      {
        new_password1: ['', [Validators.required]],
        new_password2: ['', [Validators.required]],
      },
      { validators: this.checkPasswordsEquality }
    );
  }

  checkPasswordsEquality: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('new_password1')?.value;
    let confirmPass = group.get('new_password2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  onSubmit(): void {
    this.authService.changePassword(this.formPassword.value).subscribe({
      next: (resp: any) => {
        this.authService.logout();
        this.toastrService.success(resp.detail);
        this.router.navigate(['/auth/login']);
      },
      error: (error) => this.toastrService.error(error.detail),
    });
  }
}
