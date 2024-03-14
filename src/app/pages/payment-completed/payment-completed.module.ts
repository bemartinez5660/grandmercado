import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentCompletedComponent } from './payment-completed.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { SvgComponent } from 'src/app/components/svg/svg.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentCompletedRoutingModule } from './payment-completed-routing.module';

@NgModule({
  declarations: [PaymentCompletedComponent],
  imports: [
    CommonModule,
    PaymentCompletedRoutingModule,
    TranslateModule,
    RouterModule,
    FlexLayoutModule,
    SvgComponent,
  ],
})
export class PaymentCompleteModule {}
