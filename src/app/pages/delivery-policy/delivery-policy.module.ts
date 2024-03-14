import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { DeliveryPolicyRoutingModule } from './delivery-policy-routing.module';
import { DeliveryPolicyComponent } from './delivery-policy.component';

@NgModule({
  declarations: [DeliveryPolicyComponent],
  imports: [CommonModule, DeliveryPolicyRoutingModule, MatTableModule],
})
export class DeliveryPolicyModule {}
