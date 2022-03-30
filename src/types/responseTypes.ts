import { SupremeAllProductsJSON, SupremeProduct, SupremeProductStyle } from '.';

export interface GetProductsResponse {
  success: boolean;
  data?: SupremeProduct | SupremeProduct[];
}

export interface GetProductResponse {
  success: boolean;
  data?: SupremeProductResponseCompleteJSON;
}

export interface SupremeMobileResponseJSON {
  products_and_categories: SupremeAllProductsJSON;
}

export interface SupremeProductResponseJSON {
  styles: SupremeProductStyle[];
  description: string;
  can_add_styles: boolean;
  can_buy_multiple: boolean;
  ino: string;
  cod_blocked: boolean;
  canada_blocked: boolean;
  purchasable_qty: number;
  new_item: boolean;
  apparel: boolean;
  handling: Number;
  no_free_shipping: boolean;
  can_buy_multiple_with_limit: Number;
  tag: null | string | Number;
  item_no: string;
  non_eu_blocked: boolean;
  russia_blocked: boolean;
}

export interface SupremeProductResponseCompleteJSON
  extends SupremeProductResponseJSON {
  has_stock: boolean;
}
