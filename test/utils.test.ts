import SupremeUtils from '../src/classes/SupremeUtils';
import {
  FlatSupremeAllProductsJSONMock,
  ProxyMock,
  SupremeAllProductsJSONMock,
  SupremeMockCategory,
  SupremeMockProduct,
} from './supremeMockData';

describe('Utils tests', () => {
  const utils = new SupremeUtils({}, null);
  test('get single category', () => {
    expect(
      utils.getSingleCategory(SupremeAllProductsJSONMock, 'Accessories')
    ).toEqual(SupremeMockCategory);
  });
  test('flatten category', () => {
    expect(utils.flattenCategories(SupremeAllProductsJSONMock)).toEqual(
      FlatSupremeAllProductsJSONMock
    );
  });
  test('find valid product', () => {
    expect(
      utils.findProduct('Rescue Goggles', 'all', SupremeAllProductsJSONMock)
    ).toEqual(SupremeMockProduct);
  });
  test('find invalid product', () => {
    expect(() =>
      utils.findProduct('Invalid', 'all', SupremeAllProductsJSONMock)
    ).toThrowError('Name cannot be found.');
  });
  test('format a valid proxy', () => {
    expect(utils.formatProxy('http://username:password@hostname:123')).toEqual(
      ProxyMock
    );
  });
  test('format a invalid proxy', () => {
    expect(() =>
      utils.formatProxy('http://username112312312password:hostname:123')
    ).toThrowError();
  });
});
