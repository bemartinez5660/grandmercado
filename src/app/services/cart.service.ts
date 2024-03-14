import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Cart,
  CartItem,
  CartItemInput,
  LOCAL_STORAGE_CART_KEY,
  LOCAL_STORAGE_PROVINCE,
} from '../models/cart.models';
import { Product, ShopOrders } from '../models/shop.models';
import { AppState } from '../root-store';
import { ProvinceSelectors } from '../shop-store';
import { GTMGrandmercadoService } from './gtm-grandmercado.service';
import { LocalStorageItem, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private apiUrl = environment.serverUrl;
  protected _unsubscribe = new Subject<void>();
  private _cartSubject!: BehaviorSubject<Cart>;
  private currentProvince = '2';

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private store: Store<AppState>,
    private gtmGrandmercadoService: GTMGrandmercadoService
  ) {
    const savedProvince = this.storageService.getItem(LOCAL_STORAGE_PROVINCE);
    if (savedProvince) this.currentProvince = JSON.parse(savedProvince);
    const currentCart = this.getCart(this.currentProvince);
    this._cartSubject = new BehaviorSubject(currentCart);
    this.checkCurrentCartProductsStatus(currentCart);
    this.listenProvinceSelect();
    this.listenCartUpdates();
  }

  /**
   * Check saved cart products and update
   * Emit cart
   *
   * @param cart current saved cart
   */
  private checkCurrentCartProductsStatus(cart: Cart) {
    this.calculateSaveCart(cart).subscribe({
      next: (newCart) => {
        this.emitCart(newCart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public listenCartObservable(): Observable<Cart> {
    return this._cartSubject.asObservable();
  }

  private listenProvinceSelect() {
    this.store
      .pipe(
        select(ProvinceSelectors.selectSelectedProvince),
        takeUntil(this._unsubscribe)
      )
      .subscribe((province) => {
        if (province) {
          this.currentProvince = province.id.toString();
        }
        const cartSaved = this.storageService.getItem(
          LOCAL_STORAGE_CART_KEY + this.currentProvince
        );
        if (cartSaved) {
          const cart = new Cart(this.currentProvince);
          cart.updateCart(JSON.parse(cartSaved));
          this.emitCart(cart);
        } else {
          this.emitCart(new Cart(this.currentProvince));
        }
      });
  }

  private listenCartUpdates() {
    this.storageService.setItem$
      .pipe(
        takeUntil(this._unsubscribe),
        filter(
          (item: LocalStorageItem) =>
            item.key === LOCAL_STORAGE_CART_KEY + this.currentProvince
        )
      )
      .subscribe((item: LocalStorageItem) => {
        const cartSaved = JSON.parse(item.value);
        const cart = new Cart(this.currentProvince);
        cart.updateCart(cartSaved);
        this.emitCart(cart);
      });

    this.storageService.removeItem$
      .pipe(
        takeUntil(this._unsubscribe),
        filter(
          (key: string) => key === LOCAL_STORAGE_CART_KEY + this.currentProvince
        )
      )
      .subscribe(() => {
        const cart = new Cart(this.currentProvince);
        this.emitCart(cart);
      });
  }

  private emitCart(cart: Cart): void {
    this._cartSubject.next(cart);
  }

  public addToCart(product: Product, quantity: number) {
    const cart = this.getCart(this.currentProvince);
    let cartItem = cart.items.find((item) => item.product.id === product.id);

    if (cartItem === undefined) {
      cartItem = new CartItem(product);
      cartItem.quantity = quantity;
      cart.items.push(cartItem);
    } else {
      cartItem.quantity += quantity;
    }
    this.translateService
      .get('shop.cart.add.success')
      .subscribe((message) =>
        this.toastrService.success(
          `${message}: ${cartItem?.product.name} (x${cartItem?.quantity})`
        )
      );
    this.calculateSaveCart(cart).subscribe();
    this.gtmGrandmercadoService.trackAddToCart(product, quantity);
  }

  public removeItem(cartItem: CartItem, cartProvince: string) {
    const cart = this.getCart(cartProvince);

    cart.items = cart.items.filter(
      (item) => item.product.id !== cartItem.product.id
    );

    if (!cart.items.length) {
      this.storageService.removeItem(LOCAL_STORAGE_CART_KEY + cart.province);
      return;
    }
    this.calculateSaveCart(cart).subscribe();
    this.gtmGrandmercadoService.trackRemoveFromCart(
      cartItem.product,
      cartItem.quantity
    );
  }

  public setCartItemQuantity(cartItem: CartItem, quantity: number) {
    const cart = this.getCart(this.currentProvince);

    const item = cart.items.find(
      (item) => item.product.id === cartItem.product.id
    );

    if (item) {
      item.quantity = quantity;
      this.calculateSaveCart(cart).subscribe();
    }
  }

  public calculateSaveCart(cart: Cart) {
    return this.requestCalculateCart(cart).pipe(
      tap((resp) => {
        this.saveCart(resp);
      })
    );
  }

  requestCalculateCart(cart: Cart) {
    const body = {
      items: cart.items.map((item) => CartItemInput.newCartItem(item)),
      province: cart.province,
    };
    return this.http.post(`${this.apiUrl}/orders/cart/calculate/`, body).pipe(
      map((resp: any) => {
        cart.items = resp.items;
        cart.sell_total = resp.sell_total;
        cart.sell_price = resp.sell_price;
        cart.sell_distribution = resp.sell_distribution;
        return cart;
      })
    );
  }

  private saveCart(cart: Cart): void {
    const valueToSave: LocalStorageItem = {
      key: LOCAL_STORAGE_CART_KEY + cart.province,
      value: JSON.stringify(cart),
    };
    this.storageService.setItem(valueToSave);
  }

  public validateCart(cart: Cart) {
    const items = cart.items.map((item) => CartItemInput.newCartItem(item));
    return this.http.post(`${this.apiUrl}/orders/validate/`, { items: items });
  }

  public createOrder(cart: Cart, shippingAddresseeId: number) {
    const body = {
      items: cart.items.map((item) => CartItemInput.newCartItem(item)),
      shipping_address: shippingAddresseeId,
      sender_name: '',
      sender_phone: '',
    };
    return this.http.post<ShopOrders>(`${this.apiUrl}/orders/create/`, body);
  }

  calculateOrder(cart: Cart, shippingAddresseeId: number) {
    const body = {
      items: cart.items.map((item) => CartItemInput.newCartItem(item)),
      shipping_address: shippingAddresseeId,
      sender_name: '',
      sender_phone: '',
    };

    return this.http.post(`${this.apiUrl}/orders/calculate/`, body);
  }

  private getCart(cartProvice: string): Cart {
    const cart = new Cart(cartProvice);
    const savedCart = this.storageService.getItem(
      LOCAL_STORAGE_CART_KEY + cartProvice
    );
    if (savedCart) {
      let currentCart = JSON.parse(savedCart);
      cart.updateCart(currentCart);
    }
    return cart;
  }

  public clearCart(): void {
    for (let item of this._cartSubject.value.items) {
      this.gtmGrandmercadoService.trackRemoveFromCart(
        item.product,
        item.quantity
      );
    }
    this.calculateSaveCart(new Cart(this.currentProvince)).subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
