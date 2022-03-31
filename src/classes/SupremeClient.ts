import {
  HeadersObject,
  SupremeAllProductsJSON,
  SupremeCategory,
  SupremeProduct,
} from '../types';
import {
  GetProductResponse,
  GetProductsResponse,
  SupremeProductFull,
} from '../types/responseTypes';
import SupremeUtils from './SupremeUtils';

export class SupremeClient {
  /**
   * Creates a Supreme client with a seperate got client.
   * @param {string} proxy - The optional proxy to use during requests.
   * @param {HeadersObject} extraHeaders - The optional extra headers to use during requests.
   */
  proxy: string | null;
  supremeUtils: SupremeUtils;
  constructor(proxy?: string, extraHeaders: HeadersObject = {}) {
    this.proxy = proxy ?? null;
    this.supremeUtils = new SupremeUtils(extraHeaders, this.proxy);
  }

  /**
   * Get all the Supreme products as a single array without stock and styles. Optionally only return for a specific category.
   * @constructor
   * @param {SupremeCategory | 'all'} category - The optional category of Supreme to only retrieve.
   * @returns {GetProductsResponse} - Return an array of all the products found on the Supreme website
   */
  public getProducts = async (
    category: SupremeCategory | 'all' = 'all'
  ): Promise<GetProductsResponse> => {
    try {
      const products = await this.supremeUtils.getAllProducts();
      console.log(products);
      return {
        success: true,
        data:
          category !== 'all'
            ? this.supremeUtils.getSingleCategory(products, category)
            : this.supremeUtils.flattenCategories(products),
      };
    } catch (e) {
      throw e;
    }
  };

  /**
   * Get a single Supreme product with all the styles and stock level.
   * @constructor
   * @param {string} name - The name to be searched for.
   * @returns {GetProductResponse} - Return the product.
   */
  public getProduct = async (
    name: string,
    category: SupremeCategory | 'all' = 'all'
  ): Promise<GetProductResponse> => {
    try {
      const products: SupremeAllProductsJSON = await this.supremeUtils.getAllProducts();
      const product: SupremeProduct = this.supremeUtils.findProduct(
        name,
        category,
        products
      );
      const apiProduct: SupremeProductFull = await this.supremeUtils.getSingleProduct(
        product
      );
      return {
        success: true,
        data: apiProduct,
      };
    } catch (e) {
      throw e;
    }
  };
}
