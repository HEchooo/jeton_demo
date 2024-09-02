/* prettier-ignore-start */
/* tslint:disable */
/* eslint-disable */

/* 该文件由 yapi-to-typescript 自动生成，请勿直接修改！！！ */

// @ts-ignore
// prettier-ignore
import { QueryStringArrayFormat, Method, RequestBodyType, ResponseBodyType, FileData, prepare } from 'yapi-to-typescript'
// @ts-ignore
// prettier-ignore
import type { RequestConfig, RequestFunctionRestArgs } from 'yapi-to-typescript'
// @ts-ignore
import request from './request'

type UserRequestRestArgs = RequestFunctionRestArgs<typeof request>

// Request: 目前 React Hooks 功能有用到
export type Request<
  TRequestData,
  TRequestConfig extends RequestConfig,
  TRequestResult,
> = (TRequestConfig['requestDataOptional'] extends true
  ? (requestData?: TRequestData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult
  : (requestData: TRequestData, ...args: RequestFunctionRestArgs<typeof request>) => TRequestResult) & {
  requestConfig: TRequestConfig
}


const mockUrl_0_2_0_2 = 'https://docs.valleysound.xyz/mock/57' as any
const devUrl_0_2_0_2 = 'https://test-api.valleysound.xyz' as any
const prodUrl_0_2_0_2 = 'https://api.echooo.xyz' as any
const dataKey_0_2_0_2 = 'data' as any

/**
 * 接口 [nft token↗](https://docs.valleysound.xyz/project/57/interface/api/558) 的 **请求类型**
 *
 * @分类 [NFT↗](https://docs.valleysound.xyz/project/57/interface/api/cat_245)
 * @请求头 `GET /service-token/token/nft`
 * @更新时间 `2023-06-01 17:51:05`
 */
export interface ServiceTokenTokenNftRequest {
  wallet: string
  chainId: string
}

/**
 * 接口 [nft token↗](https://docs.valleysound.xyz/project/57/interface/api/558) 的 **返回类型**
 *
 * @分类 [NFT↗](https://docs.valleysound.xyz/project/57/interface/api/cat_245)
 * @请求头 `GET /service-token/token/nft`
 * @更新时间 `2023-06-01 17:51:05`
 */
export type ServiceTokenTokenNftResponse = {
  imageUrl: string
  name: string
  tokenId: string
  tokenIcon: string
  tokenAmount: string
  tokenAmountCurrency: string
  decimals: string
  address: string
  tokenType: string
}[]

/**
 * 接口 [nft token↗](https://docs.valleysound.xyz/project/57/interface/api/558) 的 **请求配置的类型**
 *
 * @分类 [NFT↗](https://docs.valleysound.xyz/project/57/interface/api/cat_245)
 * @请求头 `GET /service-token/token/nft`
 * @更新时间 `2023-06-01 17:51:05`
 */
type ServiceTokenTokenNftRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/57',
    'https://test-api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-token/token/nft',
    'data',
    string,
    'wallet' | 'chainId',
    false
  >
>

/**
 * 接口 [nft token↗](https://docs.valleysound.xyz/project/57/interface/api/558) 的 **请求配置**
 *
 * @分类 [NFT↗](https://docs.valleysound.xyz/project/57/interface/api/cat_245)
 * @请求头 `GET /service-token/token/nft`
 * @更新时间 `2023-06-01 17:51:05`
 */
const serviceTokenTokenNftRequestConfig: ServiceTokenTokenNftRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_2_0_2,
  devUrl: devUrl_0_2_0_2,
  prodUrl: prodUrl_0_2_0_2,
  path: '/service-token/token/nft',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_2_0_2,
  paramNames: [],
  queryNames: ['wallet', 'chainId'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceTokenTokenNft',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [nft token↗](https://docs.valleysound.xyz/project/57/interface/api/558) 的 **请求函数**
 *
 * @分类 [NFT↗](https://docs.valleysound.xyz/project/57/interface/api/cat_245)
 * @请求头 `GET /service-token/token/nft`
 * @更新时间 `2023-06-01 17:51:05`
 */
export const serviceTokenTokenNft = /*#__PURE__*/ (
  requestData: ServiceTokenTokenNftRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceTokenTokenNftResponse>(prepare(serviceTokenTokenNftRequestConfig, requestData), ...args)
}

serviceTokenTokenNft.requestConfig = serviceTokenTokenNftRequestConfig


const mockUrl_0_6_0_0 = 'https://docs.valleysound.xyz/mock/314' as any
const devUrl_0_6_0_0 = '' as any
const prodUrl_0_6_0_0 = 'https://api.echooo.xyz' as any
const dataKey_0_6_0_0 = 'data' as any

/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
export interface ServiceSwapCrossChainListRequest {}

/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **返回类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
export type ServiceSwapCrossChainListResponse = {
  /**
   * 跨链桥协议
   */
  protocol: string
  /**
   * 源链ID
   */
  srcChainId: string
  /**
   * 目标链ID
   */
  destChainId: string
  /**
   * 源链代币地址
   */
  srcTokenAddress: string
  /**
   * 目标链代币地址
   */
  destTokenAddress: string
}[]

/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **请求配置的类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
type ServiceSwapCrossChainListRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/crossChain/list',
    'data',
    string,
    string,
    true
  >
>

/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **请求配置**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
const serviceSwapCrossChainListRequestConfig: ServiceSwapCrossChainListRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_0,
  devUrl: devUrl_0_6_0_0,
  prodUrl: prodUrl_0_6_0_0,
  path: '/service-swap/crossChain/list',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapCrossChainList',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **请求函数**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
export const serviceSwapCrossChainList = /*#__PURE__*/ (
  requestData?: ServiceSwapCrossChainListRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapCrossChainListResponse>(
    prepare(serviceSwapCrossChainListRequestConfig, requestData),
    ...args,
  )
}

serviceSwapCrossChainList.requestConfig = serviceSwapCrossChainListRequestConfig

const mockUrl_0_6_0_1 = 'https://docs.valleysound.xyz/mock/314' as any
const devUrl_0_6_0_1 = '' as any
const prodUrl_0_6_0_1 = 'https://api.echooo.xyz' as any
const dataKey_0_6_0_1 = 'data' as any

/**
 * 接口 [token列表↗](https://docs.valleysound.xyz/project/314/interface/api/1774) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/tokenList`
 * @更新时间 `2024-02-26 16:47:44`
 */
export interface ServiceSwapSwapTokenListRequest {
  /**
   * 链id
   */
  chainId: string
  /**
   * 钱包地址
   */
  wallet: string
  /**
   * 当前页
   */
  current: string
  /**
   * 分页大小
   */
  size: string
  /**
   * 排除的token地址
   */
  excludeToken: string
}

/**
 * 接口 [token列表↗](https://docs.valleysound.xyz/project/314/interface/api/1774) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/tokenList`
 * @更新时间 `2024-02-26 16:47:44`
 */
export interface ServiceSwapSwapTokenListResponse {
  /**
   * data
   */
  records: {
    id: number
    isPermit: boolean
    coingeckoId: string
    symbol: string
    chainId: number
    name: string
    icon: string
    /**
     * 余额
     */
    balance: string
  }[]
  /**
   * total
   */
  total: number
  /**
   * 分页大小
   */
  size: string
  /**
   * 当前页
   */
  current: string
  /**
   * 总页数
   */
  pages: string
}

/**
 * 接口 [token列表↗](https://docs.valleysound.xyz/project/314/interface/api/1774) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/tokenList`
 * @更新时间 `2024-02-26 16:47:44`
 */
type ServiceSwapSwapTokenListRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/swap/tokenList',
    'data',
    string,
    'chainId' | 'wallet' | 'current' | 'size' | 'excludeToken',
    false
  >
>

/**
 * 接口 [token列表↗](https://docs.valleysound.xyz/project/314/interface/api/1774) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/tokenList`
 * @更新时间 `2024-02-26 16:47:44`
 */
const serviceSwapSwapTokenListRequestConfig: ServiceSwapSwapTokenListRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_1,
  devUrl: devUrl_0_6_0_1,
  prodUrl: prodUrl_0_6_0_1,
  path: '/service-swap/swap/tokenList',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_1,
  paramNames: [],
  queryNames: ['chainId', 'wallet', 'current', 'size', 'excludeToken'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapSwapTokenList',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [token列表↗](https://docs.valleysound.xyz/project/314/interface/api/1774) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/tokenList`
 * @更新时间 `2024-02-26 16:47:44`
 */
export const serviceSwapSwapTokenList = /*#__PURE__*/ (
  requestData: ServiceSwapSwapTokenListRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapSwapTokenListResponse>(prepare(serviceSwapSwapTokenListRequestConfig, requestData), ...args)
}

serviceSwapSwapTokenList.requestConfig = serviceSwapSwapTokenListRequestConfig

/**
 * 接口 [验证交易对↗](https://docs.valleysound.xyz/project/314/interface/api/1781) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/verifyPath`
 * @更新时间 `2023-03-07 18:43:45`
 */
export interface ServiceSwapSwapVerifyPathRequest {
  from: string
  to: string
  chainId: string
}

/**
 * 接口 [验证交易对↗](https://docs.valleysound.xyz/project/314/interface/api/1781) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/verifyPath`
 * @更新时间 `2023-03-07 18:43:45`
 */
export interface ServiceSwapSwapVerifyPathResponse {
  /**
   * false路径不可用 true路径可用
   */
  isValidPath: boolean
}

/**
 * 接口 [验证交易对↗](https://docs.valleysound.xyz/project/314/interface/api/1781) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/verifyPath`
 * @更新时间 `2023-03-07 18:43:45`
 */
type ServiceSwapSwapVerifyPathRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/swap/verifyPath',
    'data',
    string,
    'from' | 'to' | 'chainId',
    false
  >
>

/**
 * 接口 [验证交易对↗](https://docs.valleysound.xyz/project/314/interface/api/1781) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/verifyPath`
 * @更新时间 `2023-03-07 18:43:45`
 */
const serviceSwapSwapVerifyPathRequestConfig: ServiceSwapSwapVerifyPathRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_1,
  devUrl: devUrl_0_6_0_1,
  prodUrl: prodUrl_0_6_0_1,
  path: '/service-swap/swap/verifyPath',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_1,
  paramNames: [],
  queryNames: ['from', 'to', 'chainId'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapSwapVerifyPath',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [验证交易对↗](https://docs.valleysound.xyz/project/314/interface/api/1781) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/verifyPath`
 * @更新时间 `2023-03-07 18:43:45`
 */
export const serviceSwapSwapVerifyPath = /*#__PURE__*/ (
  requestData: ServiceSwapSwapVerifyPathRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapSwapVerifyPathResponse>(
    prepare(serviceSwapSwapVerifyPathRequestConfig, requestData),
    ...args,
  )
}

serviceSwapSwapVerifyPath.requestConfig = serviceSwapSwapVerifyPathRequestConfig

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
export interface ServiceSwapCrossChainPriceRequest {
  /**
   * 源链ID
   */
  srcChainId: string
  /**
   * 目标链ID
   */
  destChainId: string
  /**
   * 源代币地址
   */
  srcTokenAddress: string
  /**
   * 目标代币地址
   */
  destTokenAddress: string
  /**
   * 源链支付代币金额
   */
  srcTokenAmount: string
  /**
   * 源链钱包地址
   */
  srcWalletAddress: string
  /**
   * 目标链钱包地址
   */
  destWalletAddress: string
}

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **返回类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
export interface ServiceSwapCrossChainPriceResponse {
  /**
   * 跨链授权合约地址
   */
  allowanceTarget: string
  /**
   * 跨链主合约地址
   */
  contractAddress: string
  /**
   * 源代币是否支持permit
   */
  srcTokenIsPermit: boolean
  /**
   * 编码信息
   */
  quoteResult: string
  /**
   * 跨链桥列表
   */
  bridgeList: {
    /**
     * 待编码数据（专门传给编码接口用的）
     */
    waitEncodeData: string
    /**
     * 源链ID
     */
    srcChainId: number
    /**
     * 目标链ID
     */
    destChainId: number
    /**
     * 源链支付的代币数量
     */
    srcTokenAmount: string
    /**
     * 目标链预估收到的数量
     */
    destTokenAmount: string
    /**
     * 目标链代币
     */
    srcToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 目标链代币
     */
    destToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 跨链桥名称
     */
    bridgeName: string
    /**
     * 跨链桥图标
     */
    bridgeIcon: string
    /**
     * 预计最快到账时间
     */
    estimatedTransferTimeMin: string
    /**
     * 预计最晚到账时间
     */
    estimatedTransferTimeMax: string
    /**
     * 目标链代币
     */
    bridgeFeeToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 跨链费
     */
    bridgeFeeTokenAmount: string
    /**
     * 目标链代币
     */
    destGasFeeToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 目标链GasFee
     */
    destGasFeeTokenAmount: string
    /**
     * 目标链代币
     */
    jetonFeeToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 服务费
     */
    jetonFeeTokenAmount: string
    /**
     * 最小金额,如果输入的金额小于这个值，客户端/服务端做好判断，不要提交编码
     */
    depositMin: string
    /**
     * 最大金额，如果输入的金额大于这个值，客户端/服务端做好判断，不要提交编码
     */
    depositMax: string
    /**
     * 是否最快桥
     */
    isFastestBridge: string
    /**
     * 是否最便宜桥
     */
    isCheapestBridge: string
    /**
     * 快了多久
     */
    fasterTime: string
    /**
     * 便宜了多少
     */
    cheaperUsd: string
    /**
     * 是否支持gasLess
     */
    supportGasLess: boolean
  }[]
}

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **请求配置的类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
type ServiceSwapCrossChainPriceRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/crossChain/price',
    'data',
    string,
    | 'srcChainId'
    | 'destChainId'
    | 'srcTokenAddress'
    | 'destTokenAddress'
    | 'srcTokenAmount'
    | 'srcWalletAddress'
    | 'destWalletAddress',
    false
  >
>

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **请求配置**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
const serviceSwapCrossChainPriceRequestConfig: ServiceSwapCrossChainPriceRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_0,
  devUrl: devUrl_0_6_0_0,
  prodUrl: prodUrl_0_6_0_0,
  path: '/service-swap/crossChain/price',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_0,
  paramNames: [],
  queryNames: [
    'srcChainId',
    'destChainId',
    'srcTokenAddress',
    'destTokenAddress',
    'srcTokenAmount',
    'srcWalletAddress',
    'destWalletAddress',
  ],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapCrossChainPrice',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **请求函数**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
export const serviceSwapCrossChainPrice = /*#__PURE__*/ (
  requestData: ServiceSwapCrossChainPriceRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapCrossChainPriceResponse>(
    prepare(serviceSwapCrossChainPriceRequestConfig, requestData),
    ...args,
  )
}

serviceSwapCrossChainPrice.requestConfig = serviceSwapCrossChainPriceRequestConfig

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
export interface ServiceSwapCrossChainEncodeWithFeeRequest {
  /**
   * 质押赎回返回数据
   */
  quoteResult: string
  /**
   * 钱包
   */
  wallet: string
  chainId: string
  permitData?: {
    permit: string
    token: string
  }
  /**
   * 跨链桥名字
   */
  bridgeName: string
  /**
   * 收款地址
   */
  beneficiary: string
}

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **返回类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
export interface ServiceSwapCrossChainEncodeWithFeeResponse {
  data: string
  to: string
  value: string
  from: string
  gasLimitData: {
    gasLimit: string
    swapGasLimit: string
    /**
     * op链的l1的gasFee
     */
    opL1GasFee: string
  }
  gasPriceData: {
    /**
     * 快
     */
    fast: {
      /**
       * 单位 秒
       */
      confirmationTime: string
      /**
       * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      minCost: string
      /**
       * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      maxCost: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      minGas: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      maxGas: string
      /**
       * gas price 单位wei 该字段代表Legacy交易的gasPrice
       */
      minGasPrice: string
      /**
       * gas price 单位wei 该字段已废弃，不会用到
       */
      maxGasPrice: string
      /**
       * wei
       */
      maxPriorityFeePerGas: string
      /**
       * wei
       */
      maxFeePerGas: string
    }
    /**
     * 慢
     */
    slow: {
      /**
       * 单位 秒
       */
      confirmationTime: string
      /**
       * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      minCost: string
      /**
       * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      maxCost: string
      /**
       * 花费gas 单位eth  该字段已废弃，由客户端根据PRD规则计算
       */
      minGas: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      maxGas: string
      /**
       * gas price 单位wei 该字段代表Legacy交易的gasPrice
       */
      minGasPrice: string
      /**
       * gas price 单位wei 该字段已废弃，不会用到
       */
      maxGasPrice: string
      maxPriorityFeePerGas: string
      maxFeePerGas: string
    }
    /**
     * 标准
     */
    propose: {
      /**
       * 单位 秒
       */
      confirmationTime: string
      /**
       * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      minCost: string
      /**
       * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      maxCost: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      minGas: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      maxGas: string
      /**
       * gas price 单位wei 该字段代表Legacy交易的gasPrice
       */
      minGasPrice: string
      /**
       * gas price 单位wei 该字段已废弃，不会用到
       */
      maxGasPrice: string
      maxPriorityFeePerGas: string
      maxFeePerGas: string
    }
    /**
     * 基础费用
     */
    suggestBaseFee: string
    /**
     * gaslimit
     */
    gasLimit: string
    /**
     * 汇率 eth兑美元汇率
     */
    exchangeRate: string
    /**
     * 转账全部剩余比例
     */
    transferAllRemainRate: number
  }
}

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **请求配置的类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
type ServiceSwapCrossChainEncodeWithFeeRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/crossChain/encodeWithFee',
    'data',
    string,
    string,
    false
  >
>

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **请求配置**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
const serviceSwapCrossChainEncodeWithFeeRequestConfig: ServiceSwapCrossChainEncodeWithFeeRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_0,
  devUrl: devUrl_0_6_0_0,
  prodUrl: prodUrl_0_6_0_0,
  path: '/service-swap/crossChain/encodeWithFee',
  method: Method.POST,
  requestHeaders: {},
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapCrossChainEncodeWithFee',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **请求函数**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
export const serviceSwapCrossChainEncodeWithFee = /*#__PURE__*/ (
  requestData: ServiceSwapCrossChainEncodeWithFeeRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapCrossChainEncodeWithFeeResponse>(
    prepare(serviceSwapCrossChainEncodeWithFeeRequestConfig, requestData),
    ...args,
  )
}

serviceSwapCrossChainEncodeWithFee.requestConfig = serviceSwapCrossChainEncodeWithFeeRequestConfig

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
export interface ServiceSwapCrossChainPriceRequest {
  /**
   * 源链ID
   */
  srcChainId: string
  /**
   * 目标链ID
   */
  destChainId: string
  /**
   * 源代币地址
   */
  srcTokenAddress: string
  /**
   * 目标代币地址
   */
  destTokenAddress: string
  /**
   * 源链支付代币金额
   */
  srcTokenAmount: string
  /**
   * 源链钱包地址
   */
  srcWalletAddress: string
  /**
   * 目标链钱包地址
   */
  destWalletAddress: string
}

/**
 * 接口 [跨链桥报价↗](https://docs.valleysound.xyz/project/314/interface/api/4137) 的 **返回类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/price`
 * @更新时间 `2024-03-07 15:50:18`
 */
export interface ServiceSwapCrossChainPriceResponse {
  /**
   * 跨链授权合约地址
   */
  allowanceTarget: string
  /**
   * 跨链主合约地址
   */
  contractAddress: string
  /**
   * 源代币是否支持permit
   */
  srcTokenIsPermit: boolean
  /**
   * 编码信息
   */
  quoteResult: string
  /**
   * 跨链桥列表
   */
  bridgeList: {
    /**
     * 待编码数据（专门传给编码接口用的）
     */
    waitEncodeData: string
    /**
     * 源链ID
     */
    srcChainId: number
    /**
     * 目标链ID
     */
    destChainId: number
    /**
     * 源链支付的代币数量
     */
    srcTokenAmount: string
    /**
     * 目标链预估收到的数量
     */
    destTokenAmount: string
    /**
     * 目标链代币
     */
    srcToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 目标链代币
     */
    destToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 跨链桥名称
     */
    bridgeName: string
    /**
     * 跨链桥图标
     */
    bridgeIcon: string
    /**
     * 预计最快到账时间
     */
    estimatedTransferTimeMin: string
    /**
     * 预计最晚到账时间
     */
    estimatedTransferTimeMax: string
    /**
     * 目标链代币
     */
    bridgeFeeToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 跨链费
     */
    bridgeFeeTokenAmount: string
    /**
     * 目标链代币
     */
    destGasFeeToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 目标链GasFee
     */
    destGasFeeTokenAmount: string
    /**
     * 目标链代币
     */
    jetonFeeToken: {
      chainId: number
      address: string
      coingeckoId: string
      symbol: string
      decimal: string
      icon: string
      price: number
    }
    /**
     * 服务费
     */
    jetonFeeTokenAmount: string
    /**
     * 最小金额,如果输入的金额小于这个值，客户端/服务端做好判断，不要提交编码
     */
    depositMin: string
    /**
     * 最大金额，如果输入的金额大于这个值，客户端/服务端做好判断，不要提交编码
     */
    depositMax: string
    /**
     * 是否最快桥
     */
    isFastestBridge: string
    /**
     * 是否最便宜桥
     */
    isCheapestBridge: string
    /**
     * 快了多久
     */
    fasterTime: string
    /**
     * 便宜了多少
     */
    cheaperUsd: string
    /**
     * 是否支持gasLess
     */
    supportGasLess: boolean
  }[]
}




const mockUrl_0_2_0_1 = 'https://docs.valleysound.xyz/mock/57' as any
const devUrl_0_2_0_1 = 'https://test-api.valleysound.xyz' as any
const prodUrl_0_2_0_1 = 'https://api.echooo.xyz' as any
const dataKey_0_2_0_1 = 'data' as any

/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
export interface ServiceTokenTokenFeeTokenRequest {
  /**
   * 钱包地址
   */
  wallet: string
  chainId: string
  /**
   * 自定义token地址
   */
  customTokenAddress?: string
}

/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
export type ServiceTokenTokenFeeTokenResponse = {
  id: number
  coingeckoId: string
  symbol: string
  chainId: number
  address: string
  name: string
  balance: string
  decimals: string
  logo: string
  high: string
  low: string
  price24hChangePercent: number
  price: string
  totalAmount: string
  isAdded: boolean
  addedTime: number
  lastUpdatedTime: number
  gmtCreate: null
  gmtUpdate: null
  isPermit: boolean
  payMasterAllowance: string
}[]

/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
type ServiceTokenTokenFeeTokenRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/57',
    'https://test-api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-token/token/feeToken',
    'data',
    string,
    'wallet' | 'chainId' | 'customTokenAddress',
    false
  >
>

/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
const serviceTokenTokenFeeTokenRequestConfig: ServiceTokenTokenFeeTokenRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_2_0_1,
  devUrl: devUrl_0_2_0_1,
  prodUrl: prodUrl_0_2_0_1,
  path: '/service-token/token/feeToken',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_2_0_1,
  paramNames: [],
  queryNames: ['wallet', 'chainId', 'customTokenAddress'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceTokenTokenFeeToken',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
export const serviceTokenTokenFeeToken = /*#__PURE__*/ (
  requestData: ServiceTokenTokenFeeTokenRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceTokenTokenFeeTokenResponse>(
    prepare(serviceTokenTokenFeeTokenRequestConfig, requestData),
    ...args,
  )
}

serviceTokenTokenFeeToken.requestConfig = serviceTokenTokenFeeTokenRequestConfig


/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export interface ServiceSwapSwapEncodeWithFeeRequest {
  /**
   * 0x50CC9451543258d3975F653D019Fa51dcE3C9F64
   */
  wallet: string
  /**
   * {\"bestroute\":[{\"swaps\":[{\"srcDecimals\":6,\"destToken\":\"0x6B175474E89094C44Da98b954EedeAC495271d0F\",\"srcToken\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"destDecimals\":18,\"swapExchanges\":[{\"destAmount\":\"31289050871662499981\",\"data\":{\"path\":[\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"0x6B175474E89094C44Da98b954EedeAC495271d0F\"],\"router\":\"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D\",\"pools\":[{\"address\":\"123\",\"fee\":30,\"direction\":true}]},\"srcAmount\":\"31462757\",\"exchange\":\"UniswapV2\",\"percent\":100}]}],\"percent\":100}],\"blocknumber\":1,\"contractaddress\":\"0x6732128F9cc0c4344b2d4DC6285BCd516b7E59E6\",\"contractmethod\":\"singleHopSell\",\"destamount\":\"31289050871662499981\",\"destdecimals\":18,\"desttoken\":\"0x6B175474E89094C44Da98b954EedeAC495271d0F\",\"destusd\":\"0\",\"feeData\":\"1342341120030\",\"gascost\":\"0\",\"gascostusd\":\"0\",\"hmac\":\"\",\"network\":1,\"others\":[],\"partnerfee\":0,\"side\":\"SELL\",\"slippage\":100,\"srcamount\":\"31462757\",\"srcdecimals\":6,\"srctoken\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"srcusd\":\"0\",\"tokentransferproxy\":\"0xF6a8aD553b265405526030c2102fda2bDcdDC177\"}
   */
  priceRoute: string
  beneficiary: string
  chainId: number
  permitData: {
    permit: string
  }
}

/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export interface ServiceSwapSwapEncodeWithFeeResponse {
  from?: string
  data?: string
  to?: string
  value?: string
  gasLimitData?: {
    gasLimit?: string
    swapGasLimit?: string
    opL1GasFee?: null
  }
  gasPriceData?: {
    fast?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    propose?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    slow?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    exchangeRate?: string
    suggestBaseFee?: string
    gasLimit?: string
    transferAllRemainRate?: number
  }
}

/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
type ServiceSwapSwapEncodeWithFeeRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/swap/encodeWithFee',
    'data',
    string,
    string,
    false
  >
>

/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
const serviceSwapSwapEncodeWithFeeRequestConfig: ServiceSwapSwapEncodeWithFeeRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_1,
  devUrl: devUrl_0_6_0_1,
  prodUrl: prodUrl_0_6_0_1,
  path: '/service-swap/swap/encodeWithFee',
  method: Method.POST,
  requestHeaders: {},
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_1,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapSwapEncodeWithFee',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export const serviceSwapSwapEncodeWithFee = /*#__PURE__*/ (
  requestData: ServiceSwapSwapEncodeWithFeeRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapSwapEncodeWithFeeResponse>(
    prepare(serviceSwapSwapEncodeWithFeeRequestConfig, requestData),
    ...args,
  )
}

serviceSwapSwapEncodeWithFee.requestConfig = serviceSwapSwapEncodeWithFeeRequestConfig

/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
export interface ServiceSwapSwapQuoteRequest {
  /**
   * 兑出代币
   */
  from: string
  /**
   * 兑入代币
   */
  to: string
  /**
   * 输入金额（用户在哪个框输入就传那个，会影响下面type的值）
   */
  amountQuoteIn: string
  /**
   * 滑点
   */
  slippage: string
  /**
   * 链id
   */
  chainId: string
  /**
   * 如果用户是在上面的框输入（卖出）type=0 如果是下面的框（买入） type=1
   */
  type: string
  /**
   * 是否使用回响币，true或false，不传为false
   */
  useEchoCoin?: string
  /**
   * 优惠券id
   */
  couponId?: string
}

/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
export interface ServiceSwapSwapQuoteResponse {
  /**
   * 源地址
   */
  srcAddress: string
  /**
   * 目标地址
   */
  dstAddress: string
  /**
   * 单位 万分之一
   */
  fees: string
  /**
   * (兼容老版本，保留)VIP手续费折扣，1到100，80表示8折，默认100，不打折
   */
  discountRatio: number
  /**
   * 最小金额
   */
  minReturnAmount: string
  /**
   * 源数量
   */
  srcAmount: string
  /**
   * 目标数量
   */
  dstAmount: string
  referrer: string
  /**
   * 兑换价格
   */
  currentPrice: string
  /**
   * 价格影响幅度，0.01
   */
  spreadRate: number
  priceRoute: string
  /**
   * 830版本增加，最终折扣:1到100，80表示8折，默认100，不打折
   */
  finalDiscountRatio: number
  /**
   * 830版本增加,回响币抵扣个数
   */
  echoCoinFeeCount: number
  /**
   * 回响币抵扣金额  两位小数 1.32
   */
  echoCoinFeeAmount: number
  /**
   * 回响币抵扣，折算折扣比例
   */
  echoCoinDiscountRatio: number
  /**
   * 830版本增加  VIP折扣比例
   */
  vipDiscountRatio: number
  /**
   * 830版本增加 VIP折扣金额 两位小数 比如1.42
   */
  vipDiscountAmount: number
  /**
   * 优惠券抵扣金额
   */
  couponFeeAmount: string
  /**
   * 优惠券id
   */
  couponId: string
  /**
   * 优惠券打折比例
   */
  couponDiscountRatio: string
  /**
   * 优惠券抵扣数量
   */
  'couponFeeCount(废弃)': string
  /**
   * 优惠券抵扣折扣
   */
  'couponDiscount(废弃)': string
  /**
   * 报价响应Id
   */
  seqId?: string
}

/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
type ServiceSwapSwapQuoteRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/swap/quote',
    'data',
    string,
    'from' | 'to' | 'amountQuoteIn' | 'slippage' | 'chainId' | 'type' | 'useEchoCoin' | 'couponId',
    false
  >
>

/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
const serviceSwapSwapQuoteRequestConfig: ServiceSwapSwapQuoteRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_1,
  devUrl: devUrl_0_6_0_1,
  prodUrl: prodUrl_0_6_0_1,
  path: '/service-swap/swap/quote',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_1,
  paramNames: [],
  queryNames: ['from', 'to', 'amountQuoteIn', 'slippage', 'chainId', 'type', 'useEchoCoin', 'couponId'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapSwapQuote',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
export const serviceSwapSwapQuote = /*#__PURE__*/ (
  requestData: ServiceSwapSwapQuoteRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapSwapQuoteResponse>(prepare(serviceSwapSwapQuoteRequestConfig, requestData), ...args)
}

serviceSwapSwapQuote.requestConfig = serviceSwapSwapQuoteRequestConfig


/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
export interface ServiceTokenTokenFeeTokenRequest {
  /**
   * 钱包地址
   */
  wallet: string
  chainId: string
  /**
   * 自定义token地址
   */
  customTokenAddress?: string
}



/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export interface ServiceSwapSwapEncodeWithFeeRequest {
  /**
   * 0x50CC9451543258d3975F653D019Fa51dcE3C9F64
   */
  wallet: string
  /**
   * {\"bestroute\":[{\"swaps\":[{\"srcDecimals\":6,\"destToken\":\"0x6B175474E89094C44Da98b954EedeAC495271d0F\",\"srcToken\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"destDecimals\":18,\"swapExchanges\":[{\"destAmount\":\"31289050871662499981\",\"data\":{\"path\":[\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"0x6B175474E89094C44Da98b954EedeAC495271d0F\"],\"router\":\"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D\",\"pools\":[{\"address\":\"123\",\"fee\":30,\"direction\":true}]},\"srcAmount\":\"31462757\",\"exchange\":\"UniswapV2\",\"percent\":100}]}],\"percent\":100}],\"blocknumber\":1,\"contractaddress\":\"0x6732128F9cc0c4344b2d4DC6285BCd516b7E59E6\",\"contractmethod\":\"singleHopSell\",\"destamount\":\"31289050871662499981\",\"destdecimals\":18,\"desttoken\":\"0x6B175474E89094C44Da98b954EedeAC495271d0F\",\"destusd\":\"0\",\"feeData\":\"1342341120030\",\"gascost\":\"0\",\"gascostusd\":\"0\",\"hmac\":\"\",\"network\":1,\"others\":[],\"partnerfee\":0,\"side\":\"SELL\",\"slippage\":100,\"srcamount\":\"31462757\",\"srcdecimals\":6,\"srctoken\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"srcusd\":\"0\",\"tokentransferproxy\":\"0xF6a8aD553b265405526030c2102fda2bDcdDC177\"}
   */
  priceRoute: string
  beneficiary: string
  chainId: number
  permitData: {
    permit: string
  }
}

/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export interface ServiceSwapSwapEncodeWithFeeResponse {
  from?: string
  data?: string
  to?: string
  value?: string
  gasLimitData?: {
    gasLimit?: string
    swapGasLimit?: string
    opL1GasFee?: null
  }
  gasPriceData?: {
    fast?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    propose?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    slow?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    exchangeRate?: string
    suggestBaseFee?: string
    gasLimit?: string
    transferAllRemainRate?: number
  }
}


/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
export interface ServiceSwapSwapQuoteRequest {
  /**
   * 兑出代币
   */
  from: string
  /**
   * 兑入代币
   */
  to: string
  /**
   * 输入金额（用户在哪个框输入就传那个，会影响下面type的值）
   */
  amountQuoteIn: string
  /**
   * 滑点
   */
  slippage: string
  /**
   * 链id
   */
  chainId: string
  /**
   * 如果用户是在上面的框输入（卖出）type=0 如果是下面的框（买入） type=1
   */
  type: string
  /**
   * 是否使用回响币，true或false，不传为false
   */
  useEchoCoin?: string
  /**
   * 优惠券id
   */
  couponId?: string
}

/**
 * 接口 [获取报价↗](https://docs.valleysound.xyz/project/314/interface/api/1788) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/quote`
 * @更新时间 `2023-09-25 10:38:22`
 */
export interface ServiceSwapSwapQuoteResponse {
  /**
   * 源地址
   */
  srcAddress: string
  /**
   * 目标地址
   */
  dstAddress: string
  /**
   * 单位 万分之一
   */
  fees: string
  /**
   * (兼容老版本，保留)VIP手续费折扣，1到100，80表示8折，默认100，不打折
   */
  discountRatio: number
  /**
   * 最小金额
   */
  minReturnAmount: string
  /**
   * 源数量
   */
  srcAmount: string
  /**
   * 目标数量
   */
  dstAmount: string
  referrer: string
  /**
   * 兑换价格
   */
  currentPrice: string
  /**
   * 价格影响幅度，0.01
   */
  spreadRate: number
  priceRoute: string
  /**
   * 830版本增加，最终折扣:1到100，80表示8折，默认100，不打折
   */
  finalDiscountRatio: number
  /**
   * 830版本增加,回响币抵扣个数
   */
  echoCoinFeeCount: number
  /**
   * 回响币抵扣金额  两位小数 1.32
   */
  echoCoinFeeAmount: number
  /**
   * 回响币抵扣，折算折扣比例
   */
  echoCoinDiscountRatio: number
  /**
   * 830版本增加  VIP折扣比例
   */
  vipDiscountRatio: number
  /**
   * 830版本增加 VIP折扣金额 两位小数 比如1.42
   */
  vipDiscountAmount: number
  /**
   * 优惠券抵扣金额
   */
  couponFeeAmount: string
  /**
   * 优惠券id
   */
  couponId: string
  /**
   * 优惠券打折比例
   */
  couponDiscountRatio: string
  /**
   * 优惠券抵扣数量
   */
  'couponFeeCount(废弃)': string
  /**
   * 优惠券抵扣折扣
   */
  'couponDiscount(废弃)': string
  /**
   * 报价响应Id
   */
  seqId?: string
}


/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export interface ServiceSwapSwapEncodeWithFeeRequest {
  /**
   * 0x50CC9451543258d3975F653D019Fa51dcE3C9F64
   */
  wallet: string
  /**
   * {\"bestroute\":[{\"swaps\":[{\"srcDecimals\":6,\"destToken\":\"0x6B175474E89094C44Da98b954EedeAC495271d0F\",\"srcToken\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"destDecimals\":18,\"swapExchanges\":[{\"destAmount\":\"31289050871662499981\",\"data\":{\"path\":[\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"0x6B175474E89094C44Da98b954EedeAC495271d0F\"],\"router\":\"0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D\",\"pools\":[{\"address\":\"123\",\"fee\":30,\"direction\":true}]},\"srcAmount\":\"31462757\",\"exchange\":\"UniswapV2\",\"percent\":100}]}],\"percent\":100}],\"blocknumber\":1,\"contractaddress\":\"0x6732128F9cc0c4344b2d4DC6285BCd516b7E59E6\",\"contractmethod\":\"singleHopSell\",\"destamount\":\"31289050871662499981\",\"destdecimals\":18,\"desttoken\":\"0x6B175474E89094C44Da98b954EedeAC495271d0F\",\"destusd\":\"0\",\"feeData\":\"1342341120030\",\"gascost\":\"0\",\"gascostusd\":\"0\",\"hmac\":\"\",\"network\":1,\"others\":[],\"partnerfee\":0,\"side\":\"SELL\",\"slippage\":100,\"srcamount\":\"31462757\",\"srcdecimals\":6,\"srctoken\":\"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48\",\"srcusd\":\"0\",\"tokentransferproxy\":\"0xF6a8aD553b265405526030c2102fda2bDcdDC177\"}
   */
  priceRoute: string
  beneficiary: string
  chainId: number
  permitData: {
    permit: string
  }
}

/**
 * 接口 [编码接口↗](https://docs.valleysound.xyz/project/314/interface/api/1872) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `POST /service-swap/swap/encodeWithFee`
 * @更新时间 `2024-03-04 10:52:43`
 */
export interface ServiceSwapSwapEncodeWithFeeResponse {
  from?: string
  data?: string
  to?: string
  value?: string
  gasLimitData?: {
    gasLimit?: string
    swapGasLimit?: string
    opL1GasFee?: null
  }
  gasPriceData?: {
    fast?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    propose?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    slow?: {
      confirmationTime?: string
      minCost?: string
      maxCost?: string
      minGas?: string
      maxGas?: string
      minGasPrice?: string
      maxGasPrice?: string
      maxPriorityFeePerGas?: string
      maxFeePerGas?: string
    }
    exchangeRate?: string
    suggestBaseFee?: string
    gasLimit?: string
    transferAllRemainRate?: number
  }
}



/**
 * 接口 [nft token↗](https://docs.valleysound.xyz/project/57/interface/api/558) 的 **请求类型**
 *
 * @分类 [NFT↗](https://docs.valleysound.xyz/project/57/interface/api/cat_245)
 * @请求头 `GET /service-token/token/nft`
 * @更新时间 `2023-06-01 17:51:05`
 */
export interface ServiceTokenTokenNftRequest {
  wallet: string
  chainId: string
}


/**
 * 接口 [token搜索↗](https://docs.valleysound.xyz/project/314/interface/api/1795) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/search`
 * @更新时间 `2024-02-26 16:49:56`
 */
export interface ServiceSwapSwapSearchRequest {
  chainId: string
  wallet: string
  searchText: string
}

/**
 * 接口 [token搜索↗](https://docs.valleysound.xyz/project/314/interface/api/1795) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/search`
 * @更新时间 `2024-02-26 16:49:56`
 */
export type ServiceSwapSwapSearchResponse = {
  id: number
  coingeckoId: string
  symbol: string
  chainId: number
  address: string
  name: string
  balance: string
  decimals: number
  logo: string
  price24hChangePercent: number
  price: number
  totalAmount: string
  isAdded: boolean
  isRisky: boolean
  addedTime: null
  lastUpdatedTime: null
  isDeleted: null
  previousBalance: null
  userTokenGmtCreate: null
  userTokenGmtUpdate: null
  gmtCreate: string
  gmtUpdate: string
  hot: null
  type: number
  isDefault: null
  isSupportFee: boolean
  zkInternalId: null
  isPermit: boolean
  isSpam: boolean
}[]

/**
 * 接口 [token搜索↗](https://docs.valleysound.xyz/project/314/interface/api/1795) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/search`
 * @更新时间 `2024-02-26 16:49:56`
 */
type ServiceSwapSwapSearchRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/swap/search',
    'data',
    string,
    'chainId' | 'wallet' | 'searchText',
    false
  >
>

/**
 * 接口 [token搜索↗](https://docs.valleysound.xyz/project/314/interface/api/1795) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/search`
 * @更新时间 `2024-02-26 16:49:56`
 */
const serviceSwapSwapSearchRequestConfig: ServiceSwapSwapSearchRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_1,
  devUrl: devUrl_0_6_0_1,
  prodUrl: prodUrl_0_6_0_1,
  path: '/service-swap/swap/search',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_1,
  paramNames: [],
  queryNames: ['chainId', 'wallet', 'searchText'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapSwapSearch',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [token搜索↗](https://docs.valleysound.xyz/project/314/interface/api/1795) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/search`
 * @更新时间 `2024-02-26 16:49:56`
 */
export const serviceSwapSwapSearch = /*#__PURE__*/ (
  requestData: ServiceSwapSwapSearchRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapSwapSearchResponse>(prepare(serviceSwapSwapSearchRequestConfig, requestData), ...args)
}

serviceSwapSwapSearch.requestConfig = serviceSwapSwapSearchRequestConfig

/**
 * 接口 [token搜索↗](https://docs.valleysound.xyz/project/314/interface/api/1795) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/314/interface/api/cat_621)
 * @请求头 `GET /service-swap/swap/search`
 * @更新时间 `2024-02-26 16:49:56`
 */
export interface ServiceSwapSwapSearchRequest {
  chainId: string
  wallet: string
  searchText: string
}



/**
 * 接口 [代币列表↗](https://docs.valleysound.xyz/project/57/interface/api/403) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/list`
 * @更新时间 `2023-11-20 13:45:58`
 */
export interface ServiceTokenTokenListRequest {
  /**
   * 钱包地址
   */
  wallet: string
  /**
   * 链id
   */
  chainId: string
  /**
   * 0 普通代币 1 defi -1 全部代币 2跨链token
   */
  tokenType: string
}

/**
 * 接口 [代币列表↗](https://docs.valleysound.xyz/project/57/interface/api/403) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/list`
 * @更新时间 `2023-11-20 13:45:58`
 */
export type ServiceTokenTokenListResponse = {
  id: number
  coingeckoId: string
  symbol: string
  chainId: number
  address: string
  name: string
  balance: string
  decimals: string
  logo: string
  high: string
  low: string
  price24hChangePercent: string
  price: string
  totalAmount: string
  isAdded: boolean
  addedTime: number
  lastUpdatedTime: number
  gmtCreate: null
  gmtUpdate: null
  isSupportFee: boolean
  zkInternalId: null
  crossChainInfo: {
    /**
     * 链id
     */
    chainId: string
    /**
     * 链名
     */
    name: string
    /**
     * 链图片
     */
    icon: string
    /**
     * 代币地址
     */
    tokenAddress: string
  }[]
  /**
   * 确认中的订单
   */
  confirmingOrderList: string[]
  isCrossChain: boolean
}[]

/**
 * 接口 [代币列表↗](https://docs.valleysound.xyz/project/57/interface/api/403) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/list`
 * @更新时间 `2023-11-20 13:45:58`
 */
type ServiceTokenTokenListRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/57',
    'https://test-api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-token/token/list',
    'data',
    string,
    'wallet' | 'chainId' | 'tokenType',
    false
  >
>

/**
 * 接口 [代币列表↗](https://docs.valleysound.xyz/project/57/interface/api/403) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/list`
 * @更新时间 `2023-11-20 13:45:58`
 */
const serviceTokenTokenListRequestConfig: ServiceTokenTokenListRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_2_0_1,
  devUrl: devUrl_0_2_0_1,
  prodUrl: prodUrl_0_2_0_1,
  path: '/service-token/token/list',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_2_0_1,
  paramNames: [],
  queryNames: ['wallet', 'chainId', 'tokenType'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceTokenTokenList',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [代币列表↗](https://docs.valleysound.xyz/project/57/interface/api/403) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/list`
 * @更新时间 `2023-11-20 13:45:58`
 */
export const serviceTokenTokenList = /*#__PURE__*/ (
  requestData: ServiceTokenTokenListRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceTokenTokenListResponse>(prepare(serviceTokenTokenListRequestConfig, requestData), ...args)
}

serviceTokenTokenList.requestConfig = serviceTokenTokenListRequestConfig

/**
 * 接口 [代币列表↗](https://docs.valleysound.xyz/project/57/interface/api/403) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/list`
 * @更新时间 `2023-11-20 13:45:58`
 */
export interface ServiceTokenTokenListRequest {
  /**
   * 钱包地址
   */
  wallet: string
  /**
   * 链id
   */
  chainId: string
  /**
   * 0 普通代币 1 defi -1 全部代币 2跨链token
   */
  tokenType: string
}


/**
 * 接口 [矿工费token↗](https://docs.valleysound.xyz/project/57/interface/api/1753) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/feeToken`
 * @更新时间 `2024-03-07 16:45:40`
 */
export interface ServiceTokenTokenFeeTokenRequest {
  /**
   * 钱包地址
   */
  wallet: string
  chainId: string
  /**
   * 自定义token地址
   */
  customTokenAddress?: string
}



/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
export interface ServiceSwapCrossChainListRequest {}



/**
 * 接口 [根据地址获取详情↗](https://docs.valleysound.xyz/project/57/interface/api/518) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/getByAddress`
 * @更新时间 `2024-03-11 11:32:03`
 */
export interface ServiceTokenTokenGetByAddressRequest {
  /**
   * 0x111,0x222
   */
  addresses: string
  /**
   * 5
   */
  chainId?: string
  wallet?: string
}

/**
 * 接口 [根据地址获取详情↗](https://docs.valleysound.xyz/project/57/interface/api/518) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/getByAddress`
 * @更新时间 `2024-03-11 11:32:03`
 */
export type ServiceTokenTokenGetByAddressResponse = {
  id: number
  isPermit: boolean
  coingeckoId: string
  symbol: string
  chainId: number
  address: string
  name: string
  balance: string
  decimals: string
  logo: string
  high: string
  low: string
  price24hChangePercent: number
  price: string
  totalAmount: string
  isAdded: boolean
  addedTime: null
  lastUpdatedTime: null
  gmtCreate: null
  gmtUpdate: null
}[]

/**
 * 接口 [根据地址获取详情↗](https://docs.valleysound.xyz/project/57/interface/api/518) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/getByAddress`
 * @更新时间 `2024-03-11 11:32:03`
 */
type ServiceTokenTokenGetByAddressRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/57',
    'https://test-api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-token/token/getByAddress',
    'data',
    string,
    'addresses' | 'chainId' | 'wallet',
    false
  >
>

/**
 * 接口 [根据地址获取详情↗](https://docs.valleysound.xyz/project/57/interface/api/518) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/getByAddress`
 * @更新时间 `2024-03-11 11:32:03`
 */
const serviceTokenTokenGetByAddressRequestConfig: ServiceTokenTokenGetByAddressRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_2_0_1,
  devUrl: devUrl_0_2_0_1,
  prodUrl: prodUrl_0_2_0_1,
  path: '/service-token/token/getByAddress',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_2_0_1,
  paramNames: [],
  queryNames: ['addresses', 'chainId', 'wallet'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceTokenTokenGetByAddress',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [根据地址获取详情↗](https://docs.valleysound.xyz/project/57/interface/api/518) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/57/interface/api/cat_185)
 * @请求头 `GET /service-token/token/getByAddress`
 * @更新时间 `2024-03-11 11:32:03`
 */
export const serviceTokenTokenGetByAddress = /*#__PURE__*/ (
  requestData: ServiceTokenTokenGetByAddressRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceTokenTokenGetByAddressResponse>(
    prepare(serviceTokenTokenGetByAddressRequestConfig, requestData),
    ...args,
  )
}

serviceTokenTokenGetByAddress.requestConfig = serviceTokenTokenGetByAddressRequestConfig

/**
 * 接口 [批量转账token上报↗](https://docs.valleysound.xyz/project/58/interface/api/2932) 的 **请求类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/recordTransfer`
 * @更新时间 `2023-07-14 10:33:57`
 */
export interface ServiceOrderTokenTransferRecordTransferRequest {
  chainId: number
  /**
   * 操作类型枚举，1：转账nft，2： 转erc20
   */
  type: number
  address: string
  transactionHash?: string
  /**
   * token地址
   */
  tokenAddress: string
  /**
   * token的symbol
   */
  tokenSymbol: string
  /**
   * token总交易数量
   */
  tokenAmount: string
  /**
   * 交易明细，json  如：token地址等
   */
  detail: string
  /**
   * address字段MD5后的结果
   */
  message: string
  /**
   * 所花费的燃料费，包含数量+单位
   */
  gasFee: string
  /**
   * 批量转账的笔数
   */
  batchCount: number
  /**
   * 为用户节省的gas
   */
  decreaseGas: string
  /**
   * 创建时间
   */
  gmtCreate: number
}

/**
 * 接口 [批量转账token上报↗](https://docs.valleysound.xyz/project/58/interface/api/2932) 的 **返回类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/recordTransfer`
 * @更新时间 `2023-07-14 10:33:57`
 */
export interface ServiceOrderTokenTransferRecordTransferResponse {
  /**
   * transfer id
   */
  transferId: string
}

/**
 * 接口 [批量转账token上报↗](https://docs.valleysound.xyz/project/58/interface/api/2932) 的 **请求配置的类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/recordTransfer`
 * @更新时间 `2023-07-14 10:33:57`
 */
type ServiceOrderTokenTransferRecordTransferRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/58',
    'https://api.valleysound.xyz',
    'http://api.echooo.xyz',
    '/service-order/tokenTransfer/recordTransfer',
    'data',
    string,
    string,
    false
  >
>

const mockUrl_0_1_0_0 = 'https://docs.valleysound.xyz/mock/58' as any
const devUrl_0_1_0_0 = 'https://api.valleysound.xyz' as any
const prodUrl_0_1_0_0 = 'http://api.echooo.xyz' as any
const dataKey_0_1_0_0 = 'data' as any

/**
 * 接口 [批量转账token上报↗](https://docs.valleysound.xyz/project/58/interface/api/2932) 的 **请求配置**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/recordTransfer`
 * @更新时间 `2023-07-14 10:33:57`
 */
const serviceOrderTokenTransferRecordTransferRequestConfig: ServiceOrderTokenTransferRecordTransferRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/service-order/tokenTransfer/recordTransfer',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'serviceOrderTokenTransferRecordTransfer',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {},
  }

/**
 * 接口 [批量转账token上报↗](https://docs.valleysound.xyz/project/58/interface/api/2932) 的 **请求函数**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/recordTransfer`
 * @更新时间 `2023-07-14 10:33:57`
 */
export const serviceOrderTokenTransferRecordTransfer = /*#__PURE__*/ (
  requestData: ServiceOrderTokenTransferRecordTransferRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceOrderTokenTransferRecordTransferResponse>(
    prepare(serviceOrderTokenTransferRecordTransferRequestConfig, requestData),
    ...args,
  )
}

serviceOrderTokenTransferRecordTransfer.requestConfig = serviceOrderTokenTransferRecordTransferRequestConfig

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **请求类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export interface ServiceOrderTokenTransferTransferSignRequest {
  /**
   * chainId
   */
  chainId: number
  /**
   * 钱包地址
   */
  wallet: string
  /**
   * 数组
   */
  transferRecord: string[]
  gasPrice: string
  /**
   * 1 为转nft，2为转erc20
   */
  type: string
}

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **返回类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export interface ServiceOrderTokenTransferTransferSignResponse {
  /**
   * 签名
   */
  signature: string
  /**
   * 原始需要消耗的gas费
   */
  originGasFeeAmount: string
  /**
   * 实际调用批量合约需要消耗的gas费
   */
  actualGasFeeAmount: string
  /**
   * 服务费
   */
  serviceFeeAmount: string
}

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **请求配置的类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
type ServiceOrderTokenTransferTransferSignRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/58',
    'https://api.valleysound.xyz',
    'http://api.echooo.xyz',
    '/service-order/tokenTransfer/transferSign',
    'data',
    string,
    string,
    false
  >
>

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **请求配置**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
const serviceOrderTokenTransferTransferSignRequestConfig: ServiceOrderTokenTransferTransferSignRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_1_0_0,
    devUrl: devUrl_0_1_0_0,
    prodUrl: prodUrl_0_1_0_0,
    path: '/service-order/tokenTransfer/transferSign',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_1_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'serviceOrderTokenTransferTransferSign',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {},
  }

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **请求函数**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export const serviceOrderTokenTransferTransferSign = /*#__PURE__*/ (
  requestData: ServiceOrderTokenTransferTransferSignRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceOrderTokenTransferTransferSignResponse>(
    prepare(serviceOrderTokenTransferTransferSignRequestConfig, requestData),
    ...args,
  )
}

serviceOrderTokenTransferTransferSign.requestConfig = serviceOrderTokenTransferTransferSignRequestConfig

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **请求类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export interface ServiceOrderTokenTransferTransferSignRequest {
  /**
   * chainId
   */
  chainId: number
  /**
   * 钱包地址
   */
  wallet: string
  /**
   * 数组
   */
  transferRecord: string[]
  gasPrice: string
  /**
   * 1 为转nft，2为转erc20
   */
  type: string
}

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **返回类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export interface ServiceOrderTokenTransferTransferSignResponse {
  /**
   * 签名
   */
  signature: string
  /**
   * 原始需要消耗的gas费
   */
  originGasFeeAmount: string
  /**
   * 实际调用批量合约需要消耗的gas费
   */
  actualGasFeeAmount: string
  /**
   * 服务费
   */
  serviceFeeAmount: string
}


/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **请求类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export interface ServiceOrderTokenTransferTransferSignRequest {
  /**
   * chainId
   */
  chainId: number
  /**
   * 钱包地址
   */
  wallet: string
  /**
   * 数组
   */
  transferRecord: string[]
  gasPrice: string
  /**
   * 1 为转nft，2为转erc20
   */
  type: string
}

/**
 * 接口 [批量转账获取签名接口↗](https://docs.valleysound.xyz/project/58/interface/api/3177) 的 **返回类型**
 *
 * @分类 [订单相关↗](https://docs.valleysound.xyz/project/58/interface/api/cat_281)
 * @请求头 `POST /service-order/tokenTransfer/transferSign`
 * @更新时间 `2023-07-10 19:03:35`
 */
export interface ServiceOrderTokenTransferTransferSignResponse {
  /**
   * 签名
   */
  signature: string
  /**
   * 原始需要消耗的gas费
   */
  originGasFeeAmount: string
  /**
   * 实际调用批量合约需要消耗的gas费
   */
  actualGasFeeAmount: string
  /**
   * 服务费
   */
  serviceFeeAmount: string
}


/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
export interface ServiceRelayRelayGetEstimateGasPriceRequest {
  /**
   * 默认值21000，该入参已废弃
   */
  gasLimit?: string
  chainId: string
  deviceId: string
}

/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
export interface ServiceRelayRelayGetEstimateGasPriceResponse {
  /**
   * 快
   */
  fast: {
    /**
     * 单位 秒
     */
    confirmationTime: string
    /**
     * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    minCost: string
    /**
     * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    maxCost: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    minGas: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    maxGas: string
    /**
     * gas price 单位wei 该字段代表Legacy交易的gasPrice
     */
    minGasPrice: string
    /**
     * gas price 单位wei 该字段已废弃，不会用到
     */
    maxGasPrice: string
    /**
     * wei
     */
    maxPriorityFeePerGas: string
    /**
     * wei
     */
    maxFeePerGas: string
  }
  /**
   * 慢
   */
  slow: {
    /**
     * 单位 秒
     */
    confirmationTime: string
    /**
     * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    minCost: string
    /**
     * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    maxCost: string
    /**
     * 花费gas 单位eth  该字段已废弃，由客户端根据PRD规则计算
     */
    minGas: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    maxGas: string
    /**
     * gas price 单位wei 该字段代表Legacy交易的gasPrice
     */
    minGasPrice: string
    /**
     * gas price 单位wei 该字段已废弃，不会用到
     */
    maxGasPrice: string
    maxPriorityFeePerGas: string
    maxFeePerGas: string
  }
  /**
   * 标准
   */
  propose: {
    /**
     * 单位 秒
     */
    confirmationTime: string
    /**
     * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    minCost: string
    /**
     * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    maxCost: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    minGas: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    maxGas: string
    /**
     * gas price 单位wei 该字段代表Legacy交易的gasPrice
     */
    minGasPrice: string
    /**
     * gas price 单位wei 该字段已废弃，不会用到
     */
    maxGasPrice: string
    maxPriorityFeePerGas: string
    maxFeePerGas: string
  }
  /**
   * 基础费用
   */
  suggestBaseFee: string
  /**
   * gaslimit
   */
  gasLimit: string
  /**
   * 汇率 eth兑美元汇率
   */
  exchangeRate: string
  /**
   * 转账全部剩余比例
   */
  transferAllRemainRate: number
}

/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
type ServiceRelayRelayGetEstimateGasPriceRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/12',
    'https://api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-relay/relay/getEstimateGasPrice',
    'data',
    string,
    'gasLimit' | 'chainId' | 'deviceId',
    false
  >
>


const mockUrl_0_3_0_0 = 'https://docs.valleysound.xyz/mock/12' as any
const devUrl_0_3_0_0 = 'https://api.valleysound.xyz' as any
const prodUrl_0_3_0_0 = 'https://api.echooo.xyz' as any
const dataKey_0_3_0_0 = 'data' as any


/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
const serviceRelayRelayGetEstimateGasPriceRequestConfig: ServiceRelayRelayGetEstimateGasPriceRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_0,
    devUrl: devUrl_0_3_0_0,
    prodUrl: prodUrl_0_3_0_0,
    path: '/service-relay/relay/getEstimateGasPrice',
    method: Method.GET,
    requestHeaders: {},
    requestBodyType: RequestBodyType.query,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_0,
    paramNames: [],
    queryNames: ['gasLimit', 'chainId', 'deviceId'],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'serviceRelayRelayGetEstimateGasPrice',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {},
  }


/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
export interface ServiceRelayRelayGetEstimateGasPriceRequest {
  /**
   * 默认值21000，该入参已废弃
   */
  gasLimit?: string
  chainId: string
  deviceId: string
}

/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
export interface ServiceRelayRelayGetEstimateGasPriceResponse {
  /**
   * 快
   */
  fast: {
    /**
     * 单位 秒
     */
    confirmationTime: string
    /**
     * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    minCost: string
    /**
     * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    maxCost: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    minGas: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    maxGas: string
    /**
     * gas price 单位wei 该字段代表Legacy交易的gasPrice
     */
    minGasPrice: string
    /**
     * gas price 单位wei 该字段已废弃，不会用到
     */
    maxGasPrice: string
    /**
     * wei
     */
    maxPriorityFeePerGas: string
    /**
     * wei
     */
    maxFeePerGas: string
  }
  /**
   * 慢
   */
  slow: {
    /**
     * 单位 秒
     */
    confirmationTime: string
    /**
     * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    minCost: string
    /**
     * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    maxCost: string
    /**
     * 花费gas 单位eth  该字段已废弃，由客户端根据PRD规则计算
     */
    minGas: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    maxGas: string
    /**
     * gas price 单位wei 该字段代表Legacy交易的gasPrice
     */
    minGasPrice: string
    /**
     * gas price 单位wei 该字段已废弃，不会用到
     */
    maxGasPrice: string
    maxPriorityFeePerGas: string
    maxFeePerGas: string
  }
  /**
   * 标准
   */
  propose: {
    /**
     * 单位 秒
     */
    confirmationTime: string
    /**
     * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    minCost: string
    /**
     * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
     */
    maxCost: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    minGas: string
    /**
     * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
     */
    maxGas: string
    /**
     * gas price 单位wei 该字段代表Legacy交易的gasPrice
     */
    minGasPrice: string
    /**
     * gas price 单位wei 该字段已废弃，不会用到
     */
    maxGasPrice: string
    maxPriorityFeePerGas: string
    maxFeePerGas: string
  }
  /**
   * 基础费用
   */
  suggestBaseFee: string
  /**
   * gaslimit
   */
  gasLimit: string
  /**
   * 汇率 eth兑美元汇率
   */
  exchangeRate: string
  /**
   * 转账全部剩余比例
   */
  transferAllRemainRate: number
}

/**
 * 接口 [预估gas费用↗](https://docs.valleysound.xyz/project/12/interface/api/76) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `GET /service-relay/relay/getEstimateGasPrice`
 * @更新时间 `2023-04-19 17:38:49`
 */
export const serviceRelayRelayGetEstimateGasPrice = /*#__PURE__*/ (
  requestData: ServiceRelayRelayGetEstimateGasPriceRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceRelayRelayGetEstimateGasPriceResponse>(
    prepare(serviceRelayRelayGetEstimateGasPriceRequestConfig, requestData),
    ...args,
  )
}

serviceRelayRelayGetEstimateGasPrice.requestConfig = serviceRelayRelayGetEstimateGasPriceRequestConfig

/**
 * 接口 [编码relayRequest↗](https://docs.valleysound.xyz/project/12/interface/api/3745) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/encodeRelayRequest`
 * @更新时间 `2024-01-18 15:09:33`
 */
export interface ServiceRelayRelayEncodeRelayRequestRequest {
  from: string
  to: string
  value: string
  data: string
  token: string
  permit: string
  chainId: string
  gasLimit: string
  gasFeeSpecific: string
}

/**
 * 接口 [编码relayRequest↗](https://docs.valleysound.xyz/project/12/interface/api/3745) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/encodeRelayRequest`
 * @更新时间 `2024-01-18 15:09:33`
 */
export interface ServiceRelayRelayEncodeRelayRequestResponse {
  encode?: string
}

/**
 * 接口 [编码relayRequest↗](https://docs.valleysound.xyz/project/12/interface/api/3745) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/encodeRelayRequest`
 * @更新时间 `2024-01-18 15:09:33`
 */
type ServiceRelayRelayEncodeRelayRequestRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/12',
    'https://api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-relay/relay/encodeRelayRequest',
    'data',
    string,
    string,
    false
  >
>

/**
 * 接口 [编码relayRequest↗](https://docs.valleysound.xyz/project/12/interface/api/3745) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/encodeRelayRequest`
 * @更新时间 `2024-01-18 15:09:33`
 */
const serviceRelayRelayEncodeRelayRequestRequestConfig: ServiceRelayRelayEncodeRelayRequestRequestConfig =
  /*#__PURE__*/ {
    mockUrl: mockUrl_0_3_0_0,
    devUrl: devUrl_0_3_0_0,
    prodUrl: prodUrl_0_3_0_0,
    path: '/service-relay/relay/encodeRelayRequest',
    method: Method.POST,
    requestHeaders: {},
    requestBodyType: RequestBodyType.json,
    responseBodyType: ResponseBodyType.json,
    dataKey: dataKey_0_3_0_0,
    paramNames: [],
    queryNames: [],
    requestDataOptional: false,
    requestDataJsonSchema: {},
    responseDataJsonSchema: {},
    requestFunctionName: 'serviceRelayRelayEncodeRelayRequest',
    queryStringArrayFormat: QueryStringArrayFormat.brackets,
    extraInfo: {},
  }

/**
 * 接口 [编码relayRequest↗](https://docs.valleysound.xyz/project/12/interface/api/3745) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/encodeRelayRequest`
 * @更新时间 `2024-01-18 15:09:33`
 */
export const serviceRelayRelayEncodeRelayRequest = /*#__PURE__*/ (
  requestData: ServiceRelayRelayEncodeRelayRequestRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceRelayRelayEncodeRelayRequestResponse>(
    prepare(serviceRelayRelayEncodeRelayRequestRequestConfig, requestData),
    ...args,
  )
}

serviceRelayRelayEncodeRelayRequest.requestConfig = serviceRelayRelayEncodeRelayRequestRequestConfig

/**
 * 接口 [permit交易↗](https://docs.valleysound.xyz/project/12/interface/api/3697) 的 **请求类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/permit`
 * @更新时间 `2024-01-18 15:09:25`
 */
export interface ServiceRelayRelayPermitRequest {
  chainId?: number
  permit?: string
  sigResult?: string
  maxFeePerGas?: number
  maxPriorityFeePerGas?: number
  gasLimit?: number
  wallet?: string
  from: string
  to: string
  value: string
  data: string
  token: string
  gasFeeSpecific: string
}

/**
 * 接口 [permit交易↗](https://docs.valleysound.xyz/project/12/interface/api/3697) 的 **返回类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/permit`
 * @更新时间 `2024-01-18 15:09:25`
 */
export interface ServiceRelayRelayPermitResponse {
  relayHash?: string
}

/**
 * 接口 [permit交易↗](https://docs.valleysound.xyz/project/12/interface/api/3697) 的 **请求配置的类型**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/permit`
 * @更新时间 `2024-01-18 15:09:25`
 */
type ServiceRelayRelayPermitRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/12',
    'https://api.valleysound.xyz',
    'https://api.echooo.xyz',
    '/service-relay/relay/permit',
    'data',
    string,
    string,
    false
  >
>

/**
 * 接口 [permit交易↗](https://docs.valleysound.xyz/project/12/interface/api/3697) 的 **请求配置**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/permit`
 * @更新时间 `2024-01-18 15:09:25`
 */
const serviceRelayRelayPermitRequestConfig: ServiceRelayRelayPermitRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_3_0_0,
  devUrl: devUrl_0_3_0_0,
  prodUrl: prodUrl_0_3_0_0,
  path: '/service-relay/relay/permit',
  method: Method.POST,
  requestHeaders: {},
  requestBodyType: RequestBodyType.json,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_3_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceRelayRelayPermit',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [permit交易↗](https://docs.valleysound.xyz/project/12/interface/api/3697) 的 **请求函数**
 *
 * @分类 [公共分类↗](https://docs.valleysound.xyz/project/12/interface/api/cat_15)
 * @请求头 `POST /service-relay/relay/permit`
 * @更新时间 `2024-01-18 15:09:25`
 */
export const serviceRelayRelayPermit = /*#__PURE__*/ (
  requestData: ServiceRelayRelayPermitRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceRelayRelayPermitResponse>(prepare(serviceRelayRelayPermitRequestConfig, requestData), ...args)
}

serviceRelayRelayPermit.requestConfig = serviceRelayRelayPermitRequestConfig

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
export interface ServiceSwapCrossChainEncodeWithFeeRequest {
  /**
   * 质押赎回返回数据
   */
  quoteResult: string
  /**
   * 钱包
   */
  wallet: string
  chainId: string
  permitData?: {
    permit: string
    token: string
  }
  /**
   * 跨链桥名字
   */
  bridgeName: string
  /**
   * 收款地址
   */
  beneficiary: string
}

/**
 * 接口 [编码+获取手续费↗](https://docs.valleysound.xyz/project/314/interface/api/4537) 的 **返回类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `POST /service-swap/crossChain/encodeWithFee`
 * @更新时间 `2024-03-08 17:16:05`
 */
export interface ServiceSwapCrossChainEncodeWithFeeResponse {
  data: string
  to: string
  value: string
  from: string
  gasLimitData: {
    gasLimit: string
    swapGasLimit: string
    /**
     * op链的l1的gasFee
     */
    opL1GasFee: string
  }
  gasPriceData: {
    /**
     * 快
     */
    fast: {
      /**
       * 单位 秒
       */
      confirmationTime: string
      /**
       * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      minCost: string
      /**
       * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      maxCost: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      minGas: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      maxGas: string
      /**
       * gas price 单位wei 该字段代表Legacy交易的gasPrice
       */
      minGasPrice: string
      /**
       * gas price 单位wei 该字段已废弃，不会用到
       */
      maxGasPrice: string
      /**
       * wei
       */
      maxPriorityFeePerGas: string
      /**
       * wei
       */
      maxFeePerGas: string
    }
    /**
     * 慢
     */
    slow: {
      /**
       * 单位 秒
       */
      confirmationTime: string
      /**
       * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      minCost: string
      /**
       * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      maxCost: string
      /**
       * 花费gas 单位eth  该字段已废弃，由客户端根据PRD规则计算
       */
      minGas: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      maxGas: string
      /**
       * gas price 单位wei 该字段代表Legacy交易的gasPrice
       */
      minGasPrice: string
      /**
       * gas price 单位wei 该字段已废弃，不会用到
       */
      maxGasPrice: string
      maxPriorityFeePerGas: string
      maxFeePerGas: string
    }
    /**
     * 标准
     */
    propose: {
      /**
       * 单位 秒
       */
      confirmationTime: string
      /**
       * 最小花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      minCost: string
      /**
       * 最大花费 美元或者rmb 该字段已废弃，由客户端根据货币单位计算
       */
      maxCost: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      minGas: string
      /**
       * 花费gas 单位eth 该字段已废弃，由客户端根据PRD规则计算
       */
      maxGas: string
      /**
       * gas price 单位wei 该字段代表Legacy交易的gasPrice
       */
      minGasPrice: string
      /**
       * gas price 单位wei 该字段已废弃，不会用到
       */
      maxGasPrice: string
      maxPriorityFeePerGas: string
      maxFeePerGas: string
    }
    /**
     * 基础费用
     */
    suggestBaseFee: string
    /**
     * gaslimit
     */
    gasLimit: string
    /**
     * 汇率 eth兑美元汇率
     */
    exchangeRate: string
    /**
     * 转账全部剩余比例
     */
    transferAllRemainRate: number
  }
}


/**
 * 接口 [获取支持跨链的token↗](https://docs.valleysound.xyz/project/314/interface/api/4121) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/list`
 * @更新时间 `2024-01-26 15:00:17`
 */
export interface ServiceSwapCrossChainListRequest {}


serviceSwapCrossChainList.requestConfig = serviceSwapCrossChainListRequestConfig

/**
 * 接口 [获取swift跨链最大最小值↗](https://docs.valleysound.xyz/project/314/interface/api/5667) 的 **请求类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/swift`
 * @更新时间 `2024-03-08 11:41:16`
 */
export interface ServiceSwapCrossChainSwiftRequest {
  srcTokenAddress: string
  destTokenAddress: string
  srcChainId: string
  destChainId: string
}

/**
 * 接口 [获取swift跨链最大最小值↗](https://docs.valleysound.xyz/project/314/interface/api/5667) 的 **返回类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/swift`
 * @更新时间 `2024-03-08 11:41:16`
 */
export interface ServiceSwapCrossChainSwiftResponse {
  depositMin?: string
  depositMax?: string
}

/**
 * 接口 [获取swift跨链最大最小值↗](https://docs.valleysound.xyz/project/314/interface/api/5667) 的 **请求配置的类型**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/swift`
 * @更新时间 `2024-03-08 11:41:16`
 */
type ServiceSwapCrossChainSwiftRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/314',
    '',
    'https://api.echooo.xyz',
    '/service-swap/crossChain/swift',
    'data',
    string,
    'srcTokenAddress' | 'destTokenAddress' | 'srcChainId' | 'destChainId',
    false
  >
>

/**
 * 接口 [获取swift跨链最大最小值↗](https://docs.valleysound.xyz/project/314/interface/api/5667) 的 **请求配置**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/swift`
 * @更新时间 `2024-03-08 11:41:16`
 */
const serviceSwapCrossChainSwiftRequestConfig: ServiceSwapCrossChainSwiftRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_6_0_0,
  devUrl: devUrl_0_6_0_0,
  prodUrl: prodUrl_0_6_0_0,
  path: '/service-swap/crossChain/swift',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_6_0_0,
  paramNames: [],
  queryNames: ['srcTokenAddress', 'destTokenAddress', 'srcChainId', 'destChainId'],
  requestDataOptional: false,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSwapCrossChainSwift',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [获取swift跨链最大最小值↗](https://docs.valleysound.xyz/project/314/interface/api/5667) 的 **请求函数**
 *
 * @分类 [跨链↗](https://docs.valleysound.xyz/project/314/interface/api/cat_1360)
 * @请求头 `GET /service-swap/crossChain/swift`
 * @更新时间 `2024-03-08 11:41:16`
 */
export const serviceSwapCrossChainSwift = /*#__PURE__*/ (
  requestData: ServiceSwapCrossChainSwiftRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSwapCrossChainSwiftResponse>(
    prepare(serviceSwapCrossChainSwiftRequestConfig, requestData),
    ...args,
  )
}

serviceSwapCrossChainSwift.requestConfig = serviceSwapCrossChainSwiftRequestConfig

const mockUrl_0_5_0_0 = 'https://docs.valleysound.xyz/mock/42' as any
const devUrl_0_5_0_0 = 'http://18.141.216.129:8999' as any
const prodUrl_0_5_0_0 = 'https://api.echooo.xyz' as any
const dataKey_0_5_0_0 = 'data' as any

/**
 * 接口 [jeton配置↗](https://docs.valleysound.xyz/project/42/interface/api/3705) 的 **请求类型**
 *
 * @分类 [配置↗](https://docs.valleysound.xyz/project/42/interface/api/cat_1216)
 * @请求头 `GET /service-system/config/jeton`
 * @更新时间 `2023-08-18 12:21:35`
 */
export interface ServiceSystemConfigJetonRequest {}

/**
 * 接口 [jeton配置↗](https://docs.valleysound.xyz/project/42/interface/api/3705) 的 **返回类型**
 *
 * @分类 [配置↗](https://docs.valleysound.xyz/project/42/interface/api/cat_1216)
 * @请求头 `GET /service-system/config/jeton`
 * @更新时间 `2023-08-18 12:21:35`
 */
export type ServiceSystemConfigJetonResponse = {
  chainId: string
  jeton: {
    allowanceTarget: string
    relayHub: string
    uniswapV2PayMaster: string
    gasCalculator: string
    spender: string
    forwarder: string
    uniswapV3PayMaster: string
    payMasterAllowanceTarget: string
    payMasterSpender: string
  }
}[]

/**
 * 接口 [jeton配置↗](https://docs.valleysound.xyz/project/42/interface/api/3705) 的 **请求配置的类型**
 *
 * @分类 [配置↗](https://docs.valleysound.xyz/project/42/interface/api/cat_1216)
 * @请求头 `GET /service-system/config/jeton`
 * @更新时间 `2023-08-18 12:21:35`
 */
type ServiceSystemConfigJetonRequestConfig = Readonly<
  RequestConfig<
    'https://docs.valleysound.xyz/mock/42',
    'http://18.141.216.129:8999',
    'https://api.echooo.xyz',
    '/service-system/config/jeton',
    'data',
    string,
    string,
    true
  >
>

/**
 * 接口 [jeton配置↗](https://docs.valleysound.xyz/project/42/interface/api/3705) 的 **请求配置**
 *
 * @分类 [配置↗](https://docs.valleysound.xyz/project/42/interface/api/cat_1216)
 * @请求头 `GET /service-system/config/jeton`
 * @更新时间 `2023-08-18 12:21:35`
 */
const serviceSystemConfigJetonRequestConfig: ServiceSystemConfigJetonRequestConfig = /*#__PURE__*/ {
  mockUrl: mockUrl_0_5_0_0,
  devUrl: devUrl_0_5_0_0,
  prodUrl: prodUrl_0_5_0_0,
  path: '/service-system/config/jeton',
  method: Method.GET,
  requestHeaders: {},
  requestBodyType: RequestBodyType.query,
  responseBodyType: ResponseBodyType.json,
  dataKey: dataKey_0_5_0_0,
  paramNames: [],
  queryNames: [],
  requestDataOptional: true,
  requestDataJsonSchema: {},
  responseDataJsonSchema: {},
  requestFunctionName: 'serviceSystemConfigJeton',
  queryStringArrayFormat: QueryStringArrayFormat.brackets,
  extraInfo: {},
}

/**
 * 接口 [jeton配置↗](https://docs.valleysound.xyz/project/42/interface/api/3705) 的 **请求函数**
 *
 * @分类 [配置↗](https://docs.valleysound.xyz/project/42/interface/api/cat_1216)
 * @请求头 `GET /service-system/config/jeton`
 * @更新时间 `2023-08-18 12:21:35`
 */
export const serviceSystemConfigJeton = /*#__PURE__*/ (
  requestData?: ServiceSystemConfigJetonRequest,
  ...args: UserRequestRestArgs
) => {
  return request<ServiceSystemConfigJetonResponse>(prepare(serviceSystemConfigJetonRequestConfig, requestData), ...args)
}

serviceSystemConfigJeton.requestConfig = serviceSystemConfigJetonRequestConfig