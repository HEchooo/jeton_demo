import type { RequestFunctionParams } from 'yapi-to-typescript'
import Axios from "./axios";
import Cookies from "js-cookie";
export interface RequestOptions {
 /**
 * Server to be used.
 *
 * - `prod`: Production server
 * - `dev`: Development server
 * - `mock`: Mock server
 *
 * @default prod
 */
  server?: 'production' | 'development' | 'mock' | 'test',
}

const env = process.env.BUILD_ENV;
export default function request<TResponseData>(
    payload: RequestFunctionParams,
    options: RequestOptions = {
      server: env as RequestOptions['server'],
    },
): Promise<TResponseData> {
  return new Promise<TResponseData>(async (resolve, reject) => {
    const baseUrl = options.server === 'mock'
        ? payload.mockUrl
        : options.server === 'development' ? 'https://api.valleysound.xyz'
            : options.server === 'test' ? 'https://api.valleysound.xyz'
                : 'https://api.echooo.xyz';
    const baseMark = "/tenant/echooo"
    const url = `${baseUrl}${baseMark}${payload.path}`;
    const token = Cookies.get('jeton_token') || sessionStorage.getItem('jeton_token');
    const lang = Cookies.get('lang') || sessionStorage.getItem('locale') || '';

    Axios.request({
      url: url,
      method: payload.method,
      headers: {
        "Authorization": token || '',
        "Platform": "PC-Echooo-Jeton",
        "Accept-Language": lang.includes('zh') ? 'zh_hant' : 'en_us',
        "DeviceId": window?.navigator?.userAgent || '',
        "Content-Type": 'application/json',
        "tenantId": "demo805a6d2544618232d9b4978e09fa",
        "tenantToken": "3eb9f2628bd54598bd410220050bc3e4"
      },
      data: payload.data || {}
    }).then(res => {
      const { data } = res;
      if (data.code) {
        reject(data);
      }
      resolve(data?.data);
    }).catch(e => reject(e));
  })
}
