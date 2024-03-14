import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import {
  AppState,
  AuthenticationActions,
  AuthenticationSelectors,
} from 'src/app/root-store';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  currentUser$ = this.store.pipe(select(AuthenticationSelectors.selectUser));
  userDataForm = this.fb.group({
    name: [],
    email: [],
    phone: [],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store<AppState>,
    private authService: AuthenticationService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDataForm.get('email')?.disable();
  }

  onSubmit() {
    this.authService.updateUser(this.userDataForm.value).subscribe({
      next: () => {
        this.toastrService.success('User updated successfully');
        this.store.dispatch(AuthenticationActions.updateUser());
        this.router.navigate(['profile/my-orders']);
      },
      error: (resp) => {
        this.toastrService.error(resp.error.detail);
      },
    });
  }
}
