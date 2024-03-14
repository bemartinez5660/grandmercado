import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[paymentHost]',
})
export class PaymentHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
