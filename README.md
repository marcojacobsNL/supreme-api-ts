<p align="center"><a href="https://www.npmjs.com/package/supreme-api-ts" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Supreme-logo-newyork.png/400px-Supreme-logo-newyork.png" width="400"></a></p>
<p align="center">
<a href="https://www.npmjs.com/package/supreme-api-ts"><img src="https://img.shields.io/npm/dt/supreme-api-ts" alt="Total Downloads"></a>
<a href="https://www.npmjs.com/package/supreme-api-ts"><img src="https://img.shields.io/npm/v/supreme-api-ts" alt="Latest Stable Version"></a>
<a href="https://www.npmjs.com/package/supreme-api-ts"><img src="https://img.shields.io/npm/l/supreme-api-ts" alt="License"></a>
</p>

## About Supreme API (TypeScript)

This project is meant to be an easy to use wrapper around the Supreme (mobile) API.
Include this in your Supreme bot, auto-checkout software, or get information about certain Supreme products.

If you have any suggestions or questions, please add me on Discord `Fumixia#5224`

# getProducts

`getProducts` function is used to get all the products from the current `mobile_stock.json` endpoint in a single array.
Optionally you can provide a category parameter to only receive products from that category.

**Request**

```javascript
getProducts(category);
```

| Parameter  | Type              | Description                                                                          |
| :--------- | :---------------- | :----------------------------------------------------------------------------------- |
| `category` | `SupremeCategory` | **Optional**. Include specific category to only receive products from that category. |

**Response**

```javascript
{
"success" : boolean,
"data" : SupremeProduct | SupremeProduct[]
}
```

**Example**

    import { getProducts } from 'supreme-api-ts';

    try {
        const items = await getProducts();
        console.log(items);
    } catch (e) {
        console.error(e);
    }

# getProduct

`getProduct` function is used to get a single product from the current `shop/{productID}.json` endpoint.
Optionally you can provide a category parameter to only receive products from that category.

**Request**

```javascript
getProduct(name);
```

| Parameter | Type     | Description                                                  |
| :-------- | :------- | :----------------------------------------------------------- |
| `name`    | `string` | **Required**. The name of the item you wish to look for/get. |

**Response**

```javascript
{
"success" : boolean,
"data" : SupremeProductResponseCompleteJSON
}
```

**Example**

    import { getProduct } from 'supreme-api-ts';

    try {
        const item = await getProduct('Box Logo');
        console.log(item);
    } catch (e) {
        console.error(e);
    }
