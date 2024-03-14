import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent,
    data: {
      title: 'Políticas de Privacidad',
      description: 'Descripción de las políticas de privacidad de la tienda',
      ogTitle: 'Descripción de las políticas de privacidad de la tienda',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivacyPolicyRoutingModule {}
