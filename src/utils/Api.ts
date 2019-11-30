import axios from 'axios';
import * as qs from 'qs';
import { BadRequestException } from '@nestjs/common';

const DEFAULT_OPTIONS = { withCredentials: true };

/**
 * Execute all requests
 * @param {String} method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
const executeRequest = async (method, url, data, options = DEFAULT_OPTIONS) => {
  const params = [
    url,
    ...data ? [data] : [],
    options,
  ];

  try {
    const { data: result } = await axios[method](...params);
    return result;
  } catch (e) {
    const { response } = e;
    throw new BadRequestException(response ? response.data || response.statusText : e.message, response ? response.status : 500);
  }
};

/**
 * Get method
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise<any>}
 */
export const get = async (url, data: { [key: string]: any } = {}, options = DEFAULT_OPTIONS) => {
  const query = qs.stringify(data);
  return executeRequest('get', `${url}?${query || ''}`, null, options);
};
