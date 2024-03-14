import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/root-store/authentication-store/authentication.models';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

export interface Token {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private BASE_URL = environment.authServiceURL;
  private TOKEN_KEY = 'token';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) {}

  requestUser(): Observable<User> {
    const url = `${this.BASE_URL}/accounts/user/`;
    return this.http.get<User>(url);
  }

  updateUser(customer: any): Observable<User> {
    return this.http.patch<User>(`${this.BASE_URL}/accounts/user/`, customer);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/accounts/login/`;
    return this.http.post(url, { email, password });
  }
  logout() {
    this.removeToken();
  }

  signup(
    name: string,
    phone: string,
    email: string,
    password1: string,
    password2: string
  ): Observable<any> {
    const url = `${this.BASE_URL}/accounts/signup/`;
    return this.http.post(url, {
      name,
      phone,
      email,
      password1,
      password2,
    });
  }

  saveToken(access: string, refresh: string, keepLogin: boolean): void {
    const token = {
      access: access,
      refresh: refresh,
    };
    if (keepLogin) {
      this.localStorage.setItem({
        key: this.TOKEN_KEY,
        value: JSON.stringify(token),
      });
    } else {
      this.sessionStorage.setItem(this.TOKEN_KEY, JSON.stringify(token));
    }
  }
  removeToken(): void {
    this.sessionStorage.removeItem(this.TOKEN_KEY);
    this.localStorage.removeItem(this.TOKEN_KEY);
  }
  getToken(): Token | null {
    let token: string | null = this.sessionStorage.getItem(this.TOKEN_KEY);
    if (token === null) {
      token = this.localStorage.getItem(this.TOKEN_KEY);
    }
    if (token === null) {
      return null;
    }
    return JSON.parse(token) as Token;
  }

  resetPasswordRequest(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/accounts/password/reset/`, {
      email,
    });
  }

  resetPasswordConfirm(
    newPassword1: string,
    newPassword2: string,
    uidb64: string,
    token: string
  ) {
    return this.http.post(`${this.BASE_URL}/accounts/password/reset/confirm/`, {
      new_password1: newPassword1,
      new_password2: newPassword2,
      uid: uidb64,
      token,
    });
  }
  changePassword(body: { new_password1: string; new_password2: string }) {
    return this.http.post(`${this.BASE_URL}/accounts/password/change/`, {
      ...body,
    });
  }
  public verifyEmail(key: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/accounts/verify-email/`, {
      key,
    });
  }
}
