import {
  ServiceSwapSwapQuoteResponse,
  ServiceTokenTokenFeeTokenResponse,
  serviceSwapSwapEncodeWithFee,
  serviceSwapSwapQuote, ServiceSwapSwapEncodeWithFeeResponse
} from "@/_yapi";
import {Popover, PopoverContent, PopoverTrigger, Tooltip} from "@nextui-org/react"
import {FC, useCallback, useContext, useEffect, useState} from "react"
import useDebounce from "@/hooks/useDebounce";
import {formatUnits, parseUnits, zeroAddress} from "viem";
import GasTokenModal from "./modal/gastoken.modal";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import VsSlipPoint from "@/components/slipPoint";
import {baseNumberFormat} from "@/_utils/number";
import ani from '@/styles/ani.module.css';
import {useAsyncEffect, useRequest} from "ahooks";
import VsLoading from "@/components/base/vsLoading";
import VsCollapse from "@/components/base/vsCollapse";

type SwapFeeCardProps = {
  srcToken: TokenInfo,
  destToken?: TokenInfo,
  srcAddress: `0x${string}` | undefined,
  destAddress: `0x${string}` | undefined,
  srcAmount?: string,
  destAmount?: string,
  quoteType: number,
  feeTokens: ServiceTokenTokenFeeTokenResponse,
  feeToken?: ServiceTokenTokenFeeTokenResponse['0'],
  onFeeTokenUpdate: (token: ServiceTokenTokenFeeTokenResponse['0']) => void,
  onExpandToggle: (expand: boolean) => void,
  onDestAmountUpdate: (amount: string) => void,
  onSrcAmountUpdate: (amount: string) => void,
  updateTx: (v: Record<string, any>) => void,
  updateTxInit: (fn: (permit: string) => Promise<ServiceSwapSwapEncodeWithFeeResponse>) => void
  refresh: number,
  isShow: boolean
}

const SwapFeeCard: FC<SwapFeeCardProps> = ({
                                             srcToken,
                                             destToken,
                                             srcAddress,
                                             destAddress,
                                             destAmount,
                                             srcAmount,
                                             quoteType,
                                             onSrcAmountUpdate,
                                             onDestAmountUpdate,
                                             onExpandToggle,
                                             feeTokens,
                                             feeToken,
                                             onFeeTokenUpdate,
                                             updateTx,
                                             updateTxInit,
                                             refresh,
                                             isShow
                                         }) => {
  const {langs} = useContext(TransContext);
  const {t} = useTrans(langs);
  const [exchangeRate, setExchangeRate] = useState('--');
  const [isSrcRate, setIsSrcRate] = useState<boolean>(true);
  const [quoteResult, setQuoteResult] = useState<ServiceSwapSwapQuoteResponse>();
  const debounceAmount = useDebounce(quoteType ? destAmount : srcAmount, 100, [destAmount, srcAmount, quoteType]);
  const [fee, setFee] = useState<number>();
  const [fees, setFees] = useState<string>();
  const [tx, setTx] = useState<ServiceSwapSwapEncodeWithFeeResponse>(null!);
  const [nativeFee, setNativeFee] = useState<TokenInfo>();
  const [gasInfo, setGasInfo] = useState<{ costPrice: string, cost: string }>(null!);
  const [slippage, setSlippage] = useState('1');
  const [isOpen, setIsOpen] = useState(false);
  const [showSlip, setShowSlip] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showGasTips, setShowGasTips] = useState<boolean>(false);

  const api = {
      price: useRequest(serviceSwapSwapQuote, {manual: true}),
      fee: useRequest(serviceSwapSwapEncodeWithFee, {manual: true})
  }

  const initSwap = useCallback(async (permit: string = '') => {
      if (!srcAddress || !quoteResult?.priceRoute) {
          return {}
      }
      const deadLine = (quoteResult as any).deadLine
      if (deadLine && deadLine < (Date.now() / 1000)) {
          setQuoteResult(undefined);
          return {}
      }
      const tx = await api.fee.runAsync({
          wallet: srcAddress || '',
          priceRoute: quoteResult.priceRoute,
          beneficiary: destAddress || '',
          chainId: srcToken?.chainId,
          permitData: {
              permit
          }
      }) as Record<string, any>;
      return (tx ? {...tx, allowanceTarget: (quoteResult as any).allowanceTarget} : {}) as Record<string, any>;
  }, [quoteResult, srcAddress, destAddress, srcToken])

  useEffect(() => {
      if (feeTokens.length) {
          setNativeFee(feeTokens.filter(v => v.address === zeroAddress)?.[0]);
      }
  }, [feeTokens]);

  useEffect(() => {
      if (nativeFee && tx?.gasPriceData && tx?.gasLimitData) {
          const gasLimit = feeToken?.address === zeroAddress ? tx?.gasLimitData.gasLimit : tx?.gasLimitData?.swapGasLimit;
          const value = formatUnits(BigInt(tx?.gasPriceData?.propose?.maxGasPrice || '0') * BigInt(gasLimit || '0'), 18);
          setGasInfo({
              cost: baseNumberFormat(value, {digits: 6, fill: false}),
              costPrice: baseNumberFormat(Number(nativeFee?.price) * Number(value), {digits: 2})
          })
      }
  }, [nativeFee, tx, feeToken]);

  useEffect(() => {
      updateTx({});
      initSwap().then((tx) => {
          setTx(tx);
          updateTx(tx);
      });
      updateTxInit(initSwap)
  }, [initSwap, refresh]);

  useAsyncEffect(async () => {
      if (!debounceAmount || debounceAmount === '0' || !destToken || (!srcAmount && !destAmount)) {
          setFee(undefined);
          setGasInfo(null!);
          return;
      }
      if (srcToken && destToken && srcToken?.chainId === destToken?.chainId) {
          try {
              const res = await api.price.runAsync({
                  from: srcToken.address,
                  to: destToken.address,
                  amountQuoteIn: String(parseUnits(debounceAmount || '0', Number(quoteType ? destToken.decimals : srcToken.decimals))),
                  slippage: `${Number(slippage) * 100}`,
                  chainId: String(srcToken.chainId),
                  type: `${quoteType}`
              });
              if (!res || !res?.dstAmount || !res?.srcAmount) {
                  return;
              }
              setQuoteResult(res);
              const fee = Number(formatUnits(BigInt(res?.dstAmount || 0), Number(destToken.decimals))) * Number(res.fees) / 1000000;
              setFees(res.fees);
              setFee(fee * Number(destToken.price));
              const amount = !quoteType ? formatUnits(BigInt(res?.dstAmount || 0), Number(destToken.decimals)) : formatUnits(BigInt(res.srcAmount), Number(srcToken.decimals));
              if (!quoteType) {
                  onDestAmountUpdate(amount);
                  setExchangeRate(baseNumberFormat((Number(amount) / Number(debounceAmount)), {
                      digits: 6,
                      fill: false
                  }));
              } else {
                  onSrcAmountUpdate(amount);
                  setExchangeRate(baseNumberFormat((Number(debounceAmount) / Number(amount)), {
                      digits: 6,
                      fill: false
                  }));
              }
          } catch (e: any) {
              updateTx({message: e?.message});
          }
      }
  }, [
      debounceAmount,
      quoteType,
      srcToken,
      destToken,
      srcAddress,
      destAddress,
      onDestAmountUpdate,
      onSrcAmountUpdate,
      slippage,
      refresh,
      srcAmount,
      destAmount
  ]);


  useAsyncEffect(async () => {
      setIsSrcRate(true);
      if (destToken && srcToken && (debounceAmount === '0' || !debounceAmount)) {
          const res = await api.price.runAsync({
              from: srcToken.address,
              to: destToken.address,
              amountQuoteIn: String(parseUnits('1', Number(srcToken.decimals))),
              slippage: `${Number(slippage) * 100}`,
              chainId: String(srcToken.chainId),
              type: `${0}`
          });
          const amount = formatUnits(BigInt(res?.dstAmount || 0), Number(destToken.decimals));
          setExchangeRate(baseNumberFormat(amount, {digits: 6, fill: false}));
      }
  }, [srcToken, destToken]);

  useEffect(() => {
      setIsLoading(true);
  }, [])


  return isShow && isLoading ?  <div className="mt-3 px-3 mo:px-0 mo:mt-2 bg-vs-content rounded-lg">
      <VsCollapse title={!api.price.loading ?
          <div className="flex items-center">
              {  !!srcToken && !!destToken && <>
                  {
                      isSrcRate
                          ? `1${srcToken?.symbol} ≈ ${exchangeRate} ${destToken?.symbol || ''} `
                          : `1 ${destToken?.symbol || ''} ≈ ${baseNumberFormat(
                              Number(exchangeRate?.replace(",", "")) > 0
                                  ? 1 / Number(exchangeRate?.replace(",", ""))
                                  : 0,
                              {
                                  digits: 6,
                                  fill: false
                              })}${srcToken?.symbol}`
                  } <i className={`iconfont ml-2 block cursor-pointer rotate-90 vc-trans`}
                       onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation();
                           setIsSrcRate(!isSrcRate);
                       }}></i>
              </> }
          </div> : <div className={`w-1/2 h-7 rounded bg-gray-200 ${ani.vs_loading}`}></div>
      }>
          <div className="flex flex-col gap-3 pt-3 mo:text-sm">
              <div className="flex justify-between">
                  <div><span>{t('{#滑点#}')}</span>
                      <Popover>
                          <PopoverTrigger>
                              <i className={`iconfont vc-help`}></i>
                          </PopoverTrigger>
                          <PopoverContent>
                              <div className="max-w-[200px] break-all">{ t('{#滑點是指交易的預期價格與交易執行價格之間的差額。如果交易的價格變化超過滑點設置，你的交易將被取消，但仍會收取網路費用。#}') }</div>
                          </PopoverContent>
                      </Popover>
                  </div>
                  <div className={`cursor-pointer flex items-center`} onClick={() => setShowSlip(true)}>
                      <span>{ slippage }%</span>
                      <i className={`iconfont vc-more`}></i>
                  </div>
              </div>
              <div className="flex justify-between">
                  <div>
                      <span>{t('{#手續費#}')}</span>
                      <Popover>
                          <PopoverTrigger>
                              <i className={`iconfont vc-help`}></i>
                          </PopoverTrigger>
                          <PopoverContent>
                              <div className="max-w-[200px] break-words">
                                  { t("{#Jeton協議手續費#}") }
                              </div>
                          </PopoverContent>
                      </Popover>
                  </div>
                  <VsLoading loading={api.fee.loading}>
                      <div>{ fee || fees === '0' ? `$${baseNumberFormat(fee, {digits: 2})}` : '0.3%'}</div>
                  </VsLoading>
              </div>
              <div className="flex justify-between">
                  <div>
                      <span>{t('{#礦工費#}')}</span>
                      <Popover>
                          <PopoverTrigger>
                              <i className={`iconfont vc-help`}></i>
                          </PopoverTrigger>
                          <PopoverContent>
                              <div className="max-w-[200px] break-words">
                                  {t('{#礦工費用於交易上鍊費用，非平台收取，Jeton協議允許您使用穩定幣支付礦工費，費用包括：#}')}
                                  <p>• {t('{#礦工費#}')}：${gasInfo?.costPrice || '--'} ({gasInfo?.cost || '--'} {nativeFee?.symbol})</p>
                              </div>
                          </PopoverContent>
                      </Popover>
                  </div>
                  <VsLoading loading={api.fee.loading}>
                      <div>{gasInfo?.costPrice ? `$${gasInfo?.costPrice}` : '--'}</div>
                  </VsLoading>
              </div>
              <div className="flex justify-between">
                  <div>
                      {t('{#礦工費代幣#}')}
                  </div>
                  <VsLoading loading={!feeToken}>
                      <div className={`cursor-pointer flex items-center`}
                           onClick={() => {
                               if (srcToken?.address === zeroAddress) {
                                   return;
                               }
                               setIsOpen(true);
                           }}>
                          <span className={`mr-1`}>{feeToken?.symbol}</span>
                          {srcToken?.address !== zeroAddress && <i className={`iconfont vc-more`}></i>}
                      </div>
                  </VsLoading>
              </div>
          </div>
      </VsCollapse>
      <GasTokenModal isOpen={isOpen}
                     onClose={() => setIsOpen(false)}
                     feeTokens={feeTokens}
                     feeToken={feeToken}
                     onTokenSelect={(token) => {
                         onFeeTokenUpdate(token);
                         setIsOpen(false);
                     }}
      />
      <VsSlipPoint isOpen={showSlip}
                   isSwap={true}
                   value={slippage}
                   onChange={(v) => {
                       if (v) {
                           setSlippage(`${v}`)
                       }
                       setShowSlip(false);
                   }}
      />
  </div> : null
}

export default SwapFeeCard;