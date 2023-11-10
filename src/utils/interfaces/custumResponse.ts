/**
 * * Interface for custom response.
 * @readonly
 * @interface
 * @param {string} status
 * @param {boolean} success
 * @param {string} errors
 * @param {Object} data
 * @param {boolean} tokeb_expired
 */

export interface ICustomResponse {
  status: number;
  success: boolean;
  errors?: string | object;
  data?: object | any;
  token_expired?: boolean;
}
