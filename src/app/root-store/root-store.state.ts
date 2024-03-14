import { RouterState } from '@ngrx/router-store';
import { AuthenticationState } from './authentication-store';

export interface State {
  auth: AuthenticationState;
  router: RouterState;
}
