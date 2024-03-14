import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DEFAULT_CURRENCY_CODE,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from 'src/app/models/shop.models';
import { DeliveryTimePipe } from 'src/app/pipes/delivery-time.pipe';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    RouterModule,
    MatButtonModule,
    DeliveryTimePipe,
  ],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() select = new EventEmitter<Product>();
  quantity = 1;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  increment() {
    this.quantity++;
  }

  decrement() {
    this.quantity--;
  }

  onSelect() {
    this.select.emit(this.product);
  }

  onAddToCart(product: Product, quantity: number) {
    this.cartService.addToCart(product, quantity);
  }
}
