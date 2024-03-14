import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { VerificationPageComponent } from './components/verification-page/verification-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { IsAuthenticatedGuard } from 'src/app/guards/is-authenticated.guard';
import { ChangePassComponent } from './components/change-pass/change-pass.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
      description: 'Inicia sesión y comienza tus compras con envíos a Cuba',
      ogTitle: 'Inicia sesión y comienza tus compras con envíos a Cuba',
    },
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Regístrate',
      description: 'Regístrate y obtén acceso a todos nuestros productos',
      ogTitle: 'Regístrate y obtén acceso a todos nuestros productos',
    },
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'verify',
    component: VerificationPageComponent,
    title: 'auth.verify.title',
    data: {
      title: 'Verificación',
      description: 'Verifica tu cuenta',
      ogTitle: 'Verifica tu cuenta',
    },
  },
  {
    path: 'verify-email/:key',
    component: VerifyEmailComponent,
    data: {
      title: 'Verificación de email',
      description: 'Verifica tu email',
      ogTitle: 'Verifica tu email',
    },
  },
  {
    path: 'forgot',
    component: ForgotComponent,
    data: {
      title: 'Olvidé mi contraseña',
      description: '¿Olvidaste tu contraseña?',
      ogTitle: '¿Olvidaste tu contraseña?',
    },
  },
  {
    path: 'change-password',
    component: ChangePassComponent,
    data: {
      title: 'Cambiar contraseña',
      description: 'Cambiar mi contraseña',
      ogTitle: 'Cambiar mi contraseña',
    },
  },
  {
    path: 'reset-password/:uid/:token',
    component: ResetPasswordComponent,
    data: {
      title: 'Cambiar contraseña',
      description: '¿Deseas cambiar tu contraseña?',
      ogTitle: '¿Deseas cambiar tu contraseña?',
    },
  },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
