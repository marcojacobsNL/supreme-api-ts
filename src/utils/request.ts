import rp from 'request-promise';
import { HeadersObject } from '../types';

/**
 * Request wrapper to be request data from URLs.
 * @constructor
 * @param {string} uri - The URL to get.
 * @param {HeadersObject} headers - The (optional) header objects to be included in the request.
 * @returns {any} - Return the JSON response from the requested endpoint
 */
export const request = async (
  uri: string,
  headers?: HeadersObject
): Promise<any> => {
  const mainHeaders = {
    Accept: 'application/json',
    'User-Agent': 'Supreme iPhone OS v53 ApplePay3Supported',
    Referer: 'https://www.supremenewyork.com/mobile',
    'X-Requested-With': 'XMLHttpRequest',
  };
  const options = {
    headers: { ...mainHeaders, ...headers },
    uri,
    json: true,
  };
  return rp(options)
    .then(response => {
      return response;
    })
    .catch((e: Error) => {
      return e;
    });
};
