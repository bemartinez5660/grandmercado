import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
  formPassword: FormGroup;
  private sub: any;
  uidb64!: string;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {
    this.sub = this.route.params.subscribe((params) => {
      this.uidb64 = params['uid'];
      this.token = params['token'];
    });

    this.formPassword = this.fb.group(
      {
        newPassword1: ['', [Validators.required]],
        newPassword2: ['', [Validators.required]],
        uidb64: [this.uidb64 ? this.uidb64 : '', [Validators.required]],
        token: [this.token ? this.token : '', [Validators.required]],
      },
      { validators: this.checkPasswordsEquality }
    );
  }

  checkPasswordsEquality: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword1')?.value;
    let confirmPass = group.get('newPassword2')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  onSubmit(): void {
    const { newPassword1, newPassword2, uidb64, token } =
      this.formPassword.value;
    this.authService
      .resetPasswordConfirm(newPassword1, newPassword2, uidb64, token)
      .subscribe({
        next: (resp: any) => {
          this.toastrService.success(resp.detail);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => this.toastrService.error(error.detail),
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
