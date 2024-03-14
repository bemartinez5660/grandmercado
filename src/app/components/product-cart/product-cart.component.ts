import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from '../../models/cart.models';
@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, TranslateModule],
})
export class ProductCartComponent implements OnInit {
  @Input() cartItem!: CartItem;
  @Input() cartProvince!: string;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  decrementItemQunatity() {
    if (this.cartItem.quantity > 1) {
      this.cartItem.quantity--;
      this.cartService.setCartItemQuantity(
        this.cartItem,
        this.cartItem.quantity
      );
    }
  }

  incrementItemQuantity() {
    this.cartItem.quantity++;
    this.cartService.setCartItemQuantity(this.cartItem, this.cartItem.quantity);
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeItem(cartItem, this.cartProvince);
  }
}
