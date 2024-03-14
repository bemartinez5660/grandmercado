import { Product } from './shop.models';

export const LOCAL_STORAGE_CART_KEY = 'locker-cart-';
export const LOCAL_STORAGE_PROVINCE = 'province-selected';
export class Cart {
  public province: string;
  public items: CartItem[] = [];
  public sell_total: number = 0;
  public sell_price: number = 0;
  public sell_distribution: number = 0;
  constructor(province: string) {
    this.province = province;
  }

  public updateCart(cart: Cart) {
    this.province = cart.province;
    this.items = cart.items.map((ele) =>
      new CartItem(ele.product).updateCartItem(ele)
    );
    this.sell_price = cart.sell_price;
    this.sell_distribution = cart.sell_distribution;
    this.sell_total = cart.sell_total;
  }
}

export class CartItem {
  public quantity = 1;
  constructor(public product: Product) {
    this.product = product;
  }

  public updateCartItem(cartItem: CartItem): CartItem {
    this.product = cartItem.product;
    this.quantity = cartItem.quantity;
    return this;
  }
}

export class CartItemInput {
  constructor(public product: number, public quantity: number) {}
  public static newCartItem(item: CartItem): CartItemInput {
    return new CartItemInput(item.product.id, item.quantity);
  }
}
