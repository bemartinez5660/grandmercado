import { Injectable } from '@angular/core';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { Cart, CartItem } from '../models/cart.models';
import {
  Category,
  Departament,
  Product,
  ProductList,
  ShopOrderItem,
  ShopOrders,
} from '../models/shop.models';

import { EventTypes, Item } from '../models/gtm.models';

@Injectable({
  providedIn: 'root',
})
export class GTMGrandmercadoService {
  constructor(private gtmService: GoogleTagManagerService) {}

  trackProductView(product: Product) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.VIEW_ITEM,

      ecommerce: {
        currency: 'USD',
        value: product.sell_price,
        items: [this.productToItemOffList(product)],
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackAddToCart(product: Product, quantity: number) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.ADD_TO_CART,
      ecommerce: {
        currency: 'USD',
        value: product.sell_price,
        items: [{ ...this.productToItemOffList(product), quantity }],
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackRemoveFromCart(product: Product, quantity: number) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.REMOVE_FROM_CART,
      ecommerce: {
        currency: 'USD',
        value: product.sell_price,
        items: [{ ...this.productToItemOffList(product), quantity }],
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackViewCart(cart: Cart) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.VIEW_CART,
      ecommerce: {
        currency: 'USD',
        value: cart.sell_total,
        items: cart.items.map((item, index) => this.itemToGTMItem(item, index)),
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackBeginCheckout(cart: Cart) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.BEGIN_CHECKOUT,
      ecommerce: {
        currency: 'USD',
        value: cart.sell_total,
        items: cart.items.map((item, index) => this.itemToGTMItem(item, index)),
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackAddPaymentInfo(order: ShopOrders, payment_type: string) {
    this.clearEcommerce();

    let items = order.orders.flatMap((order) => {
      return order.items.map((item, index) => this.itemToGTMItem(item, index));
    });

    const tag = {
      event: EventTypes.ADD_PAYMENT_INFO,
      ecommerce: {
        currency: 'USD',
        value: order.sell_total,
        payment_type: payment_type,
        items: items,
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackPurchase(order: ShopOrders) {
    this.clearEcommerce();

    let items = order.orders.flatMap((order) => {
      return order.items.map((item, index) => this.itemToGTMItem(item, index));
    });
    const tag = {
      event: EventTypes.PURCHASE,
      ecommerce: {
        currency: 'USD',
        value: order.sell_total,
        transaction_id: order.order_code,
        shipping: order.sell_distribution,
        items: items,
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackViewItemList(
    products: ProductList,
    q: string,
    taxonomy: Departament | Category | undefined
  ) {
    this.clearEcommerce();
    let item_list_id = taxonomy?.id || 'all';
    let item_list_name = taxonomy?.name || 'all';
    if (q.length) {
      item_list_name += `:${q}`;
    }
    const tag = {
      event: EventTypes.VIEW_ITEM_LIST,
      ecommerce: {
        item_list_id: item_list_id,
        item_list_name: item_list_name,
        items: products.results.map((product, index) =>
          this.productToItem(product, index, item_list_name)
        ),
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackViewItemListFromCategorySlides(products: Product[], taxonomy: string) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.VIEW_ITEM_LIST,
      ecommerce: {
        item_list_id: taxonomy,
        item_list_name: taxonomy,
        items: products.map((product, index) =>
          this.productToItem(product, index, taxonomy)
        ),
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackSelectItem(
    product: Product,
    q: string,
    taxonomy: Departament | Category | undefined
  ) {
    this.clearEcommerce();
    let item_list_id = taxonomy?.id || 'all';
    let item_list_name = taxonomy?.name || 'all';
    if (q.length) {
      item_list_name += `:${q}`;
    }
    const tag = {
      event: EventTypes.SELECT_ITEM,
      ecommerce: {
        item_list_id: item_list_id,
        item_list_name: item_list_name,
        items: [this.productToItem(product, 0, item_list_name)],
      },
    };

    this.gtmService.pushTag(tag);
  }

  trackSelectItemFromCategorySlide(product: Product, taxonomy: string) {
    this.clearEcommerce();

    const tag = {
      event: EventTypes.SELECT_ITEM,
      ecommerce: {
        item_list_id: taxonomy,
        item_list_name: taxonomy,
        items: [this.productToItem(product, 0, taxonomy)],
      },
    };

    this.gtmService.pushTag(tag);
  }

  productToItem(product: Product, index: number, taxonomy: string): Item {
    return {
      item_id: product.id.toString(),
      item_name: product.name,
      affiliation: product.provider?.name,
      currency: 'USD',
      price: product?.sell_price,
      index: index || 0,
      quantity: 1,
      item_category: taxonomy,
    };
  }

  productToItemOffList(product: Product): Item {
    return {
      item_id: product.id.toString(),
      item_name: product.name,
      affiliation: product.provider?.name,
      currency: 'USD',
      price: product?.sell_price,
      quantity: 1,
    };
  }

  itemToGTMItem(
    item: CartItem | ShopOrderItem,
    index: number | null,
    category = '',
    departament = ''
  ): Item {
    const product = item.product;
    return {
      item_id: product.id.toString(),
      item_name: product.name,
      affiliation: product.provider?.name,
      currency: 'USD',
      price: product?.sell_price,
      index: index || 0,
      quantity: item.quantity,

      item_category: category,
      item_category2: departament, // The second category of the item.
    };
  }

  private clearEcommerce() {
    this.gtmService.pushTag({ ecommerce: null });
  }
}
