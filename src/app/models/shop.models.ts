export interface Departament {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  icon?: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  categories: Category[];
}

export interface DepartmentSlide {
  id: number;
  selected: boolean;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  icon?: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  icon?: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  departament: number;
}

export interface CategorySlide {
  id: number;
  name: string;
  title: string;
  subtitle: string;
  selected: boolean;
  description: string;
  slug: string;
  icon?: string;
  image_large: string;
  image_medium: string;
  image_small: string;
  departament: number;
}

export interface ProductInput {
  id: number;
  provider: number;
  name: string;
  description: string;
  sell_price: number;
  image: string;
  creation_date: Date;
  modification_date: Date;
  delivery_time: number;
}

export interface Product {
  id: number;
  provider: ShopProvider | undefined;
  name: string;
  description: string;
  sell_price: number;
  image: string;
  creation_date: Date;
  modification_date: Date;
  delivery_time: number;
}

export interface ProductListInput {
  count: number;
  next: string; //"http://api.example.org/accounts/?page=4",
  previous: string; //"http://api.example.org/accounts/?page=2",
  results: ProductInput[];
  pages: number;
}

export interface ProductList {
  count: number;
  next: string; //"http://api.example.org/accounts/?page=4",
  previous: string; //"http://api.example.org/accounts/?page=2",
  results: Product[];
  pages: number;
}

export interface CollectionInput {
  id: number;
  name: string;
  title: string;
  description: string;
  slug: string;
  products: ProductInput[];
}
export interface Collection {
  id: number;
  name: string;
  title: string;
  description: string;
  slug: string;
  products: Product[];
}

export interface ProductSearchParams {
  q: string;
  departament: number | undefined;
  category: number | undefined;
  page: number;
}

export interface ShopProvider {
  id: number;
  name: string;
  province_availability: ProvinceAvailability[];
}

export interface ProvinceAvailability {
  province: number;
  net_price: string;
  delivery_time: number;
}

export interface Province {
  id: number;
  name: string;
}

export interface ShopOrders {
  agency: number;
  id: number;
  order_code: string;
  orders: ShopOrder[];
  province: number;
  receiver_address: string;
  receiver_name: string;
  receiver_personal_id: string;
  receiver_phone: string;
  sell_distribution: number;
  sell_price: number;
  sell_total: number;
  sender_name: string;
  sender_phone: string;
  status: string;
  user: number;
  isExpanded?: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ShopOrder {
  creation_date: string;
  id: number;
  items: ShopOrderItem[];
  modification_date: string;
  order_code: string;
  order_status: string;
  provider: number;
  sell_total: string;
}

export interface ShopOrderItem {
  product: Product;
  quantity: number;
  sell_price: string;
}
export interface OrderList {
  count: number;
  pages: number;
  next: string; //"http://api.example.org/accounts/?page=4",
  previous: string; //"http://api.example.org/accounts/?page=2",
  results: ShopOrders[];
}

export const ORDER_STATUS_ICONS: { [key: string]: string } = {
  requested:
    "<span class='iconify requested' data-icon='uil:truck-loading'></span>",
  waiting_for_payment:
    "<span class='iconify' data-icon='fluent:credit-card-clock-32-regular'></span>",
  payment_needs_approval:
    "<span class='iconify waiting_for_payment' data-icon='uil:truck-loading'></span>",
  delivering: "<span class='iconify delivering' data-icon='uil:truck'></span>",
  delivered:
    "<span class='iconify delivered' data-icon='iconoir:check-circled-outline'></span>",
  problem:
    "<span class='iconify problem' data-icon='material-symbols:cancel-outline-rounded'></span>",
  cancelled:
    "<span class='iconify problem' data-icon='material-symbols:cancel-outline-rounded'></span>",
};
export interface Subscriptions {
  id?: number;
  newsletters: boolean;
  promotions: boolean;
  reminders: boolean;
  updates: boolean;
}

export interface ShippingAddressee {
  id: number;
  name: string;
  address: string;
  city: string;
  province: number;
  phone: string;
  personal_id: string;
  isExpanded?: boolean;
}
