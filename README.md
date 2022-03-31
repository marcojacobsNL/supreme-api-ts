<p  align="center"><a  href="https://www.npmjs.com/package/supreme-api-ts"  target="_blank"><img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Supreme-logo-newyork.png/400px-Supreme-logo-newyork.png"  width="400"></a></p>
<p  align="center">
<a  href="https://www.npmjs.com/package/supreme-api-ts"><img  src="https://img.shields.io/npm/dt/supreme-api-ts"  alt="Total Downloads"></a>
<a  href="https://www.npmjs.com/package/supreme-api-ts"><img  src="https://img.shields.io/npm/v/supreme-api-ts"  alt="Latest Stable Version"></a>
<a  href="https://www.npmjs.com/package/supreme-api-ts"><img  src="https://img.shields.io/npm/l/supreme-api-ts"  alt="License"></a>
</p>

## About Supreme API (TypeScript)

This project is meant to be an easy-to-use wrapper around the Supreme (mobile) API.
Include this in your Supreme bot, auto-checkout software, or get information about certain Supreme products.

If you have any suggestions or questions, please add me on Discord `Fumixia#5224`

# SupremeClient

`new SupremeClient(proxy, extraHeaders)` is used to initiate a SupremeClient for your project. Through this client, you will call the endpoints.

Optionally you can provide a proxy and/or extra headers to use.
| Parameter | Type | Description |
| :--- | :--- | :---- |
| `proxy` | `string` | **Optional**. Include a proxy in the format of `http://username:password@hostname:port` to use during requests |
| `extraHeaders` | `HeadersObject` | **Optional**. Provide extra headers in an object to include during requests |

# getProducts

`client.getProducts` function is used to get all the products from the current `mobile_stock.json` endpoint in a single array.

Optionally you can provide a category parameter to only receive products from that category.
**Request**

```javascript
client.getProducts(category);
```

| Parameter  | Type              | Description                                                                            |
| :--------- | :---------------- | :------------------------------------------------------------------------------------- |
| `category` | `SupremeCategory` | **Optional**. Include a specific category to only receive products from that category. |

**Response**

```javascript
{
  "success" : boolean,
  "data" : SupremeProduct | SupremeProduct[]
}
```

**Example**

```javascript
import { SupremeClient } from 'supreme-api-ts';
const client = new SupremeClient();

try {
  const products = await client.getProducts();
  console.log(products);
} catch (e) {
  console.error(e);
}
```

# getProduct

`client.getProduct` function is used to get a single product from the current `shop/{productID}.json` endpoint.

Optionally you can provide a category parameter to only receive products from that category.
**Request**

```javascript
client.getProduct(name, category);
```

| Parameter  | Type              | Description                                                  |
| :--------- | :---------------- | :----------------------------------------------------------- |
| `name`     | `string`          | **Required**. The name of the item you wish to look for/get. |
| `category` | `SupremeCategory` | **Optional**. The name of the category you wish to look in.  |

**Response**

```javascript
{
  "success" : boolean,
  "data" : SupremeProductFull
}

```

**Example**

```javascript
import { SupremeClient } from 'supreme-api-ts';
const client = new SupremeClient();

try {
  const product = await client.getProduct('Box Logo');
  console.log(product);
} catch (e) {
  console.error(e);
}
```
