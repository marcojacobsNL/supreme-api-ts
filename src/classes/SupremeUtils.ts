import {
  SupremeAllProductsJSON,
  SupremeProduct,
  SupremeCategory,
  SupremeProductStyle,
  SupremeSizing,
  HeadersObject,
  Proxy,
} from '../types';
import {
  SupremeMobileResponseJSON,
  SupremeProductFull,
} from '../types/responseTypes';
import needle, { NeedleOptions, NeedleResponse } from 'needle';
import { httpsOverHttp } from 'tunnel';

const URL = 'https://www.supremenewyork.com';

const endpoints = {
  mobile_stock: `${URL}/mobile_stock.json`,
  product_stock: `${URL}/shop/{PRODUCT_ID}.json`,
};

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'User-Agent': 'Supreme iPhone OS v53 ApplePay3Supported',
  Referer: 'https://www.supremenewyork.com/mobile',
  'X-Requested-With': 'XMLHttpRequest',
};

export default class SupremeUtils {
  needleClient: any;
  proxy: string | null;
  constructor(extraHeaders: HeadersObject, proxy?: string | null) {
    this.proxy = proxy ?? null;
    needle.defaults({
      timeout: 5000,
      headers: { ...defaultHeaders, ...extraHeaders },
    });
  }

  /**
   * Get all the current Supreme products from the mobile endpoint.
   * @constructor
   * @returns {SupremeAllProductsJSON} - Return the JSON response of all the current Supreme products.
   */
  public getAllProducts = async (): Promise<SupremeAllProductsJSON> => {
    try {
      const options: NeedleOptions = {};
      if (this.proxy) {
        options.agent = httpsOverHttp({
          proxy: this.formatProxy(this.proxy),
        });
      }
      const resp: NeedleResponse = await needle(
        'get',
        endpoints.mobile_stock,
        options
      );
      const { products_and_categories }: SupremeMobileResponseJSON = resp.body;
      return products_and_categories;
    } catch (e) {
      if (e instanceof Error && e.message.includes('socket')) {
        throw new Error('Proxy not valid/working.');
      }
      throw new Error('Error fetching all products.');
    }
  };

  /**
   * Get Supreme product specific data from the mobile endpoint.
   * @constructor
   * @param {SupremeProduct} product - The product to get all the data from.
   * @returns {SupremeProductFull} - Return the JSON response for the required product.
   */
  public getSingleProduct = async (
    product: SupremeProduct
  ): Promise<SupremeProductFull> => {
    try {
      const options: NeedleOptions = {};
      if (this.proxy) {
        options.agent = httpsOverHttp({
          proxy: this.formatProxy(this.proxy),
        });
      }
      const { body }: NeedleResponse = await needle(
        'get',
        endpoints.product_stock.replace('{PRODUCT_ID}', product.id.toString()),
        options
      );
      const verifiedStyles: SupremeProductStyle[] = body.styles.map(
        (style: SupremeProductStyle) => {
          const hasStock: boolean = style.sizes.some(
            (size: SupremeSizing) => size.stock_level > 0
          );
          return {
            ...style,
            has_stock: hasStock,
          };
        }
      );
      body.styles = verifiedStyles;
      const hasStock: boolean = body.styles.some((style: SupremeProductStyle) =>
        style.sizes.some((size: SupremeSizing) => size.stock_level > 0)
      );
      return {
        ...body,
        has_stock: hasStock,
      };
    } catch (e) {
      throw new Error('There was an error fetching the product.');
    }
  };

  /**
   * Get all the products from a single category.
   * @constructor
   * @param {SupremeAllProductsJSON} data - All the current Supreme products.
   * @param {SupremeCategory} category - The desired category to get back.
   * @returns {SupremeProduct[]} - Return the array of all the Supreme products for the desired category.
   */
  public getSingleCategory = (
    data: SupremeAllProductsJSON,
    category: SupremeCategory
  ): SupremeProduct[] => {
    return data[category];
  };

  /**
   * Find a specific product in the provided JSON.
   * @constructor
   * @param {string} name - The name to search for.
   * @param {SupremeAllProductsJSON} data - All the products to look in to.
   * @returns {SupremeProduct} - Return the single Supreme product.
   */
  public findProduct = (
    name: string,
    category: SupremeCategory | 'all',
    data: SupremeAllProductsJSON
  ): SupremeProduct => {
    const products: SupremeProduct[] =
      category === 'all'
        ? this.flattenCategories(data)
        : this.getSingleCategory(data, category);
    const product: SupremeProduct | undefined = products.find(
      (product: SupremeProduct) =>
        product.name.toLowerCase().includes(name.toLowerCase()) ||
        product.name.toLowerCase() === name.toLowerCase()
    );
    if (!product) throw new Error('Name cannot be found.');
    return product;
  };

  /**
   * Flatten the default JSON response objects to be a single array of products.
   * @constructor
   * @param {any} products - All the current Supreme products.
   * @returns {SupremeProduct[]} - Return the array of all the Supreme products in a single array.
   */
  public flattenCategories = (products: any): SupremeProduct[] => {
    const allProduct: SupremeProduct[] = Object.keys(products).reduce(
      (prev, key) => {
        return prev.concat(products[key]);
      },
      []
    );
    return allProduct;
  };

  /**
   * Formats a https://username:password@hostname:port proxy to a required Proxy object.
   * @constructor
   * @params {string} proxy - The proxy to re-format.
   * @returns {Proxy} - Return the proxy object.
   */
  public formatProxy = (proxy: string): Proxy => {
    try {
      const clean: string = proxy.replace('http://', '');
      const splitted: string[] = clean.split('@');
      const left: string = splitted[0];
      const right = splitted[1];
      const rightSplit: string[] = right.split(':');
      return {
        host: rightSplit[0],
        port: parseInt(rightSplit[1]),
        proxyAuth: left,
      };
    } catch {
      throw new Error(
        'Wrong proxy format provided. Use http://username:password@hostname:port'
      );
    }
  };
}
