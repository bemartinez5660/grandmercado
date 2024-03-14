import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { GTMGrandmercadoService } from 'src/app/services/gtm-grandmercado.service';
import { ProductCartComponent } from '../product-cart/product-cart.component';

@Component({
  selector: 'app-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    TranslateModule,
    ProductCartComponent,
  ],
})
export class CartMenuComponent implements OnInit, OnDestroy {
  private _unsubscribe = new Subject<void>();
  cart$ = this.cartService
    .listenCartObservable()
    .pipe(takeUntil(this._unsubscribe));

  constructor(
    private cartService: CartService,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {}

  ngOnInit(): void {
    this.cart$.pipe(take(1)).subscribe((cart) => {
      this.gtmGrandmercadoService.trackViewCart(cart);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
