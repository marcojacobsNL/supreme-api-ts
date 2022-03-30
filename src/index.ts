import {
  SupremeAllProductsJSON,
  SupremeCategory,
  SupremeProduct,
} from './types';
import {
  GetProductResponse,
  GetProductsResponse,
  SupremeProductFull,
} from './types/responseTypes';
import {
  findProduct,
  flattenCategories,
  getAllProducts,
  getSingleCategory,
  getSingleProduct,
} from './utils/utils';

/**
 * Get all the Supreme products as a single array without stock and styles. Optionally only return for a specific category.
 * @constructor
 * @param {SupremeCategory | 'all'} category - The optional category of Supreme to only retrieve.
 * @returns {GetProductsResponse} - Return an array of all the products found on the Supreme website
 */
export const getProducts = async (
  category: SupremeCategory | 'all' = 'all'
): Promise<GetProductsResponse> => {
  try {
    const products: SupremeAllProductsJSON = await getAllProducts();
    return {
      success: true,
      data:
        category !== 'all'
          ? getSingleCategory(products, category)
          : flattenCategories(products),
    };
  } catch {
    throw new Error('Failed fetching all the products.');
  }
};

/**
 * Get a single Supreme product with all the styles and stock level.
 * @constructor
 * @param {string} name - The name to be searched for.
 * @returns {GetProductResponse} - Return the product.
 */
export const getProduct = async (name: string): Promise<GetProductResponse> => {
  try {
    const products: SupremeAllProductsJSON = await getAllProducts();
    const product: SupremeProduct = findProduct(name, products);
    const apiProduct: SupremeProductFull = await getSingleProduct(product);
    return {
      success: true,
      data: apiProduct,
    };
  } catch (e) {
    throw e;
  }
};
