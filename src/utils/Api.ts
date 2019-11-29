import axios from 'axios';
import * as qs from 'qs';

import { ConfigService } from '../config/config.service';
const configService = new ConfigService();

const DEFAULT_OPTIONS = { withCredentials: true };

/**
 * Execute all requests
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
function executeRequest(method, url, data, options = DEFAULT_OPTIONS) {
  const params = [
    url,
    ...data ? [data] : [],
    options,
  ];

  return new Promise((resolve, reject) => {
    axios[method](...params).then((response) => {
      resolve(response.data);
    }).catch(({ response }) => {
      reject(response);
    });
  });
}

/**
 * Get method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function get(url, data, options) {
  data.token = configService.get().CRYPTO_TOKEN;
  const query = qs.stringify(data);
  return executeRequest('get', `${url}?${query || ''}`, null, options);
}
