import {
  SupremeAllProductsJSON,
  SupremeCategory,
  SupremeProduct,
  SupremeProductStyle,
  SupremeSizing,
} from '../types';
import {
  SupremeMobileResponseJSON,
  SupremeProductResponseCompleteJSON,
  SupremeProductResponseJSON,
} from '../types/responseTypes';
import { request } from './request';

const URL = 'https://www.supremenewyork.com';

const endpoints = {
  mobile_stock: `${URL}/mobile_stock.json`,
  product_stock: `${URL}/shop/{PRODUCT_ID}.json`,
};

/**
 * Get all the current Supreme products from the mobile endpoint.
 * @constructor
 * @returns {SupremeAllProductsJSON} - Return the JSON response of all the current Supreme products.
 */
export const getAllProducts = async (): Promise<SupremeAllProductsJSON> => {
  try {
    const response: SupremeMobileResponseJSON = await request(
      endpoints.mobile_stock
    );
    return response.products_and_categories;
  } catch (e) {
    throw new Error('Error fetching all products.');
  }
};

/**
 * Get Supreme product specific data from the mobile endpoint.
 * @constructor
 * @param {SupremeProduct} product - The product to get all the data from.
 * @returns {SupremeProductResponseCompleteJSON} - Return the JSON response for the required product.
 */
export const getSingleProduct = async (
  product: SupremeProduct
): Promise<SupremeProductResponseCompleteJSON> => {
  try {
    const response: SupremeProductResponseJSON = await request(
      endpoints.product_stock.replace('{PRODUCT_ID}', product.id.toString())
    );
    const verifiedStyles: SupremeProductStyle[] = response.styles.map(
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
    response.styles = verifiedStyles;
    const hasStock: boolean = response.styles.some(
      (style: SupremeProductStyle) =>
        style.sizes.some((size: SupremeSizing) => size.stock_level > 0)
    );
    return {
      ...response,
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
export const getSingleCategory = (
  data: SupremeAllProductsJSON,
  category: SupremeCategory
): SupremeProduct[] => {
  return data[category];
};

/**
 * Flatten the default JSON response objects to be a single array of products.
 * @constructor
 * @param {any} products - All the current Supreme products.
 * @returns {SupremeProduct[]} - Return the array of all the Supreme products in a single array.
 */
export const flattenCategories = (products: any): SupremeProduct[] => {
  const allProduct: SupremeProduct[] = Object.keys(products).reduce(
    (prev, key) => {
      return prev.concat(products[key]);
    },
    []
  );
  return allProduct;
};

/**
 * Find a specific product in the provided JSON.
 * @constructor
 * @param {string} name - The name to search for.
 * @param {SupremeAllProductsJSON} data - All the products to look in to.
 * @returns {SupremeProduct} - Return the single Supreme product.
 */
export const findProduct = (
  name: string,
  data: SupremeAllProductsJSON
): SupremeProduct => {
  const allProduct = flattenCategories(data);
  const product: SupremeProduct | undefined = allProduct.find(
    (product: SupremeProduct) =>
      product.name.toLowerCase().includes(name.toLowerCase()) ||
      product.name.toLowerCase() === name.toLowerCase()
  );
  if (!product) throw new Error('Name cannot be found in available products.');
  return product;
};
