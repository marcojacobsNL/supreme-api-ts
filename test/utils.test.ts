import {
  findProduct,
  flattenCategories,
  getSingleCategory,
} from '../src/utils/utils';
import {
  FlatSupremeAllProductsJSONMock,
  SupremeAllProductsJSONMock,
  SupremeMockCategory,
  SupremeMockProduct,
} from './supremeMockData';

describe('Utils tests', () => {
  test('get single category', () => {
    expect(
      getSingleCategory(SupremeAllProductsJSONMock, 'Accessories')
    ).toEqual(SupremeMockCategory);
  });
  test('flatten category', () => {
    expect(flattenCategories(SupremeAllProductsJSONMock)).toEqual(
      FlatSupremeAllProductsJSONMock
    );
  });
  test('find valid product', () => {
    expect(findProduct('Rescue Goggles', SupremeAllProductsJSONMock)).toEqual(
      SupremeMockProduct
    );
  });
  test('find invalid product', () => {
    expect(() =>
      findProduct('Invalid', SupremeAllProductsJSONMock)
    ).toThrowError('Name cannot be found in available products.');
  });
});
