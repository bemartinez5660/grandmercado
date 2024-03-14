import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStatusRoutingModule } from './order-status-routing.module';
import { OrderStatusComponent } from './order-status.component';
import { OrdersDetailsTableComponent } from '../../components/orders-details-table/orders-details-table.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';

@NgModule({
  declarations: [OrderStatusComponent],
  imports: [
    CommonModule,
    OrderStatusRoutingModule,
    OrdersDetailsTableComponent,
    SafeHtmlPipe,
    TranslateModule,
    RouterModule,
    FlexLayoutModule,
  ],
})
export class OrderStatusModule {}
