export interface HeadersObject {
  [name: string]: string;
}

export interface Proxy {
  host: string;
  port: number;
  proxyAuth: string;
}

export type SupremeEndpoint = 'mobile_stock' | 'product_stock';

export type SupremeCategory =
  | 'Accessories'
  | 'Jackets'
  | 'Tops/Sweaters'
  | 'Bags'
  | 'Hats'
  | 'Skate'
  | 'Pants'
  | 'T-Shirts'
  | 'Shirts'
  | 'Sweatshirts'
  | 'new';

export interface SupremeProduct {
  name: string;
  id: Number;
  image_url: string;
  image_url_hi: string;
  price: Number;
  sale_price: Number;
  new_item: boolean;
  position: Number;
  category_name: SupremeCategory;
  price_euro: Number;
  sale_price_euro: Number;
}

export type SupremeAllProductsJSON = Record<SupremeCategory, SupremeProduct[]>;

export interface SupremeSizing {
  name: string;
  id: Number;
  stock_level: Number;
}

export interface SupremeProductStyle {
  id: Number;
  name: string;
  chk: string;
  tag: null | string | Number;
  currency: string;
  description: string;
  image_url: string;
  image_url_hi: string;
  swatch_url: string;
  swatch_url_hi: string;
  mobile_zoomed_url: string;
  mobile_zoomed_url_hi: string;
  bigger_zoomed_url: string;
  special_purchasable_qty: null | string | Number;
  sizes: SupremeSizing[];
  has_stock?: boolean;
}
