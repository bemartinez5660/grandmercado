import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/root-store';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  private activationKey: string;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.activationKey = this.route.snapshot.params['key'];
  }

  ngOnInit(): void {
    this.authService.verifyEmail(this.activationKey).subscribe({
      next: (value) => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.message = error.error.message;
      },
    });
  }
}
