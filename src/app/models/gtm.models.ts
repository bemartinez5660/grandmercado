export enum EventTypes {
  VIEW_ITEM = 'view_item',
  VIEW_ITEM_LIST = 'view_item_list',
  SELECT_ITEM = 'select_item',
  ADD_TO_CART = 'add_to_cart',
  ADD_PAYMENT_INFO = 'add_payment_info',
  REMOVE_FROM_CART = 'remove_from_cart',
  VIEW_CART = 'view_cart',
  BEGIN_CHECKOUT = 'begin_checkout',
  PURCHASE = 'purchase',
}

export interface Item {
  item_id: string; // The ID of the item
  item_name: string; // The name of the item
  // A product affiliation to designate a supplying company
  //  or brick and mortar store location.
  affiliation?: string;
  coupon?: string; // The coupon name/code associated with the item
  // The currency, in 3-letter ISO 4217 format.
  // If set, event-level currency is ignored.
  // Multiple currencies per event is not supported. Each item should set the same currency.
  currency?: string;
  discount?: number; // The discount amount associated with the item
  index?: number; // The index/position of the item in the list
  item_brand?: string; // The brand of the item
  // The category of the item.
  // If used as part of a category hierarchy or taxonomy then this will be the first category.
  item_category?: string;
  item_category2?: string; // The second category of the item.
  item_category3?: string; // The third category of the item.
  item_category4?: string; // The fourth category of the item.
  item_category5?: string; // The fifth category of the item.
  item_list_id?: string; // The ID of the list in which the item was presented to the user.
  item_list_name?: string; // The name of the list in which the item was presented to the user.
  item_variant?: string; // The item variant or unique code or description for additional item details/options.
  // The location associated with the item.
  // It's recommended to use the Google Place ID
  // that corresponds to the associated item.
  // A custom location ID can also be used.
  location_id?: string;
  price?: number; // The monetary price of the item, in units of the specified currency parameter.
  quantity?: number; // Item quantity
}

export interface ItemList {
  item_list_id?: string;
  item_list_name?: string;
  items: Item[];
}
