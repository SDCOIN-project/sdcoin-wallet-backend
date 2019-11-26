import axios from 'axios';
import * as qs from 'qs';

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
  const query = qs.stringify(data);
  return executeRequest('get', `${url}?${query || ''}`, null, options);
}

/**
 * Post method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function post(url, data, options) {
  // if need upload file use this post
  return executeRequest('post', `${url}`, data, options);
}

/**
 * Patch method
 * @param {String}url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function patch(url, data, options) {
  return executeRequest('patch', `${url}`, data, options);
}

/**
 * Put method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function put(url, data, options) {
  return executeRequest('put', `${url}`, data, options);
}

/**
 * Delete method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export function del(url, data, options) {
  return executeRequest('delete', `${url}`, data, options);
}
