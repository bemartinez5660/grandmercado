import { Category, Product } from './shop.models';

export interface Banner {
  link: string;
  image_large: string;
  image_medium: string;
  image_small: string;
}

export interface CategoryHomePage extends CategoryFeature {
  category: CategoryFeature;
  image_large: string;
  image_medium: string;
  image_small: string;
  title: string;
  order: number;
}

export interface CategoryFeature extends Category {
  products: Product[];
}

export interface HomePage {
  banners: Banner[];
  categories: CategoryHomePage[];
}

export interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
}
