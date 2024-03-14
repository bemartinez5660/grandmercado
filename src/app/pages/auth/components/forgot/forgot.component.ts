import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'dc-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent {
  credentialsForm: FormGroup;
  submittedSucessfully = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private toastrService: ToastrService
  ) {
    this.credentialsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    const { email } = this.credentialsForm.value;
    this.authService.resetPasswordRequest(email).subscribe({
      next: (resp: any) => {
        this.toastrService.success(resp.detail);
        this.submittedSucessfully = true;
      },
      error: (error) => this.toastrService.error(error),
    });
  }
}
