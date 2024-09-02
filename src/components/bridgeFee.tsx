import {
    ServiceSwapCrossChainPriceResponse,
    serviceSwapCrossChainEncodeWithFee,
    serviceSwapCrossChainPrice,
    ServiceTokenTokenFeeTokenResponse, ServiceSwapSwapEncodeWithFeeResponse
} from "@/_yapi";
import {
    Avatar,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader, Popover, PopoverContent, PopoverTrigger,
} from "@nextui-org/react"
import {FC, useCallback, useContext, useEffect, useState} from "react"
import useDebounce from "@/hooks/useDebounce";
import {formatUnits, parseUnits, zeroAddress} from "viem";
import {getChainInfoByChainId} from "@/config/project.config";
import VsSlipPoint from "@/components/slipPoint";
import GasTokenModal from "@/components/modal/gastoken.modal";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import {baseNumberFormat} from "@/_utils/number";
import {useAsyncEffect, useRequest} from "ahooks";
import ani from '@/styles/ani.module.css';
import VsLoading from "@/components/base/vsLoading";
import VsCollapse from "@/components/base/vsCollapse";

type BridgeFeeCardProps = {
    srcToken: TokenInfo,
    destToken?: TokenInfo,
    srcAddress: `0x${string}` | undefined,
    destAddress: `0x${string}` | undefined,
    srcAmount?: string,
    feeTokens: ServiceTokenTokenFeeTokenResponse,
    feeToken?: ServiceTokenTokenFeeTokenResponse['0'],
    onFeeTokenUpdate: (token: ServiceTokenTokenFeeTokenResponse['0']) => void,
    onDestAmountUpdate: (amount: string) => void,
    updateTx: (f: Record<string, any>) => void,
    setValid: (v: boolean) => void,
    updateTxInit: (fn: (permit: string) => Promise<ServiceSwapSwapEncodeWithFeeResponse>) => void,

    updateCrossInfo: (v: {
        fee: number,
        cost: string,
        depositMin: string,
        depositMax: string
    }) => void,
    refresh: number,
    isShow: boolean,
}
const BridgeFeeCard: FC<BridgeFeeCardProps> = ({
                                                   srcToken,
                                                   destToken,
                                                   srcAddress,
                                                   destAddress,
                                                   srcAmount,
                                                   onDestAmountUpdate,
                                                   updateTx,
                                                   feeTokens,
                                                   feeToken,
                                                   onFeeTokenUpdate,
                                                   setValid,
                                                   refresh,
                                                   updateTxInit,
                                                   updateCrossInfo,
                                                   isShow
                                               }) => {

    const {langs} = useContext(TransContext);
    const {t} = useTrans(langs);
    const [exchangeRate, setExchangeRate] = useState('--');
    const [isSrcRate, setIsSrcRate] = useState<boolean>(true);
    const [quoteResult, setQuoteResult] = useState<ServiceSwapCrossChainPriceResponse>();
    const debounceAmount = useDebounce(srcAmount, 200, [srcAmount]);
    const [fee, setFee] = useState<number>();
    const [destGasFee, setDestGasFee] = useState<{ cost: number, price: number, symbol: string }>({
        cost: 0,
        price: 0,
        symbol: ''
    });
    const [tx, setTx] = useState<ServiceSwapSwapEncodeWithFeeResponse>(null!);
    const [nativeFee, setNativeFee] = useState<TokenInfo>();
    const [gasInfo, setGasInfo] = useState<{ price: number, cost: string }>({
        price: 0,
        cost: ''
    });
    const [slippage, setSlippage] = useState('1');
    const [bridgeList, setBridgeList] = useState<ServiceSwapCrossChainPriceResponse['bridgeList']>();
    const [bridge, setBridge] = useState<ServiceSwapCrossChainPriceResponse['bridgeList']['0']>();
    const [showSlip, setShowSlip] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [showBridge, setShowBridge] = useState<boolean>(false);

    const api = {
        price: useRequest(serviceSwapCrossChainPrice, {manual: true}),
        fee: useRequest(serviceSwapCrossChainEncodeWithFee, {manual: true})
    }

    const initBridge = useCallback(async (permit: string = '') => {
        if (!quoteResult?.quoteResult) {
            return {}
        }
        if (!bridge) {
            return {message: t("{#暂无第三方跨链桥支持该路径#}")}
        }
        if (!srcAddress || !destAddress || !srcToken) {
            return {};
        }
        try {
            const tx = await api.fee.runAsync({
                wallet: srcAddress || '',
                beneficiary: destAddress || '',
                quoteResult: quoteResult.quoteResult,
                chainId: `${srcToken.chainId}`,
                permitData: permit ? {
                    permit,
                    token: srcToken.address,
                } : undefined,
                bridgeName: bridge?.bridgeName
            }) as Record<string, any>;
            return (tx ? {...tx, allowanceTarget: (quoteResult as any).allowanceTarget} : {}) as Record<string, any>;
        } catch (e: any) {
            return {}
        }
    }, [quoteResult, srcAddress, destAddress, srcToken, bridge, debounceAmount]);

    const getTime = (v: ServiceSwapCrossChainPriceResponse['bridgeList']['0']) => {
        const a = Number(v.estimatedTransferTimeMax);
        const [day, h, m] = [Math.floor(a / 86400), Math.floor(a / 3600), Math.floor(a / 60)];
        return day ? t('{#%d 天#}').replace('%d', `${day}`) : h ? t('{#%h小时#}').replace('%h', `${h}`) : t('{#%m分钟#}').replace('%m', `${m}`);
    }

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
                cost: value,
                price: Number(value) * Number(nativeFee?.price) || 0
            })
        }
    }, [nativeFee, tx, feeToken]);

    useEffect(() => {
        updateTx({});
        initBridge().then((tx) => {
            setTx(tx);
            updateTx(tx);
        });
        updateTxInit(initBridge);
    }, [quoteResult, srcAddress, destAddress, srcToken, initBridge]);


    useAsyncEffect(async () => {
        setIsSrcRate(true);
        if (!debounceAmount || !destToken || debounceAmount === '0') {
            return;
        }
        if (!srcAddress || !destAddress) {
            return;
        }
        if (srcToken.chainId !== destToken?.chainId) {
            try {
                const res = await api.price.runAsync({
                    srcChainId: `${srcToken.chainId}`,
                    destChainId: `${destToken?.chainId}`,
                    srcTokenAddress: `${srcToken.address}`,
                    destTokenAddress: `${destToken?.address}`,
                    srcTokenAmount: `${parseUnits(debounceAmount, Number(srcToken.decimals))}`,
                    srcWalletAddress: srcAddress || '',
                    destWalletAddress: destAddress || ''
                });
                setQuoteResult(res);
                setBridgeList(res.bridgeList);
                setBridge(res.bridgeList?.length ? res.bridgeList[0] : undefined);
                setValid(!!res?.bridgeList?.length);
            } catch (e: any) {
                setExchangeRate('--');
                // if (!hasPost) {
                updateTx({message: t("{#暂无第三方跨链桥支持该路径#}")});
                // }
            }
        }
    }, [debounceAmount, srcToken, destToken, srcAddress, destAddress, refresh]);

    useEffect(() => {
        if (bridge && destToken) {
            const bridgeFeeAmount = Number(formatUnits(BigInt(bridge.bridgeFeeTokenAmount), Number(bridge.bridgeFeeToken.decimal)));
            const destValue = formatUnits(BigInt(bridge.destTokenAmount), Number(bridge.destToken.decimal));
            const srcValue = formatUnits(BigInt(bridge.srcTokenAmount), Number(bridge.srcToken.decimal));
            const destGasFeeAmount = bridge.destGasFeeToken ? Number(formatUnits(BigInt(bridge.destGasFeeTokenAmount), Number(bridge.destGasFeeToken.decimal))) : 0;
            const feePrice = bridgeFeeAmount * Number(bridge?.bridgeFeeToken?.price);
            setFee(feePrice);
            setDestGasFee({
                cost: destGasFeeAmount,
                price: bridge.destGasFeeToken ? destGasFeeAmount * bridge.destGasFeeToken.price + feePrice : feePrice,
                symbol: bridge.destGasFeeToken?.symbol || destToken?.symbol
            });
            setExchangeRate(baseNumberFormat(Number(destValue) / Number(srcValue), {digits: 6, fill: false}));
            onDestAmountUpdate(formatUnits(BigInt(bridge.destTokenAmount), Number(destToken.decimals)));
        }
    }, [bridge, onDestAmountUpdate]);

    useEffect(() => {
        if (destGasFee.price || bridge?.depositMin || bridge?.depositMax) {
            updateCrossInfo({
                fee: destGasFee.price,
                cost: bridge?.destGasFeeTokenAmount || '0',
                depositMin: bridge?.depositMin || '',
                depositMax: bridge?.depositMax || ''
            });
        } else {
            updateCrossInfo({
                fee: 0,
                cost: '0',
                depositMin: '',
                depositMax: ''
            });
        }
    }, [destGasFee, bridge]);

    return !isShow ? null : <div className="mt-2 bg-vs-content rounded-lg">
        <VsCollapse title={ !api.price.loading ? <div className="flex items-center">
            {
                isSrcRate ? `1${srcToken.symbol} ≈ ${exchangeRate} ${destToken?.symbol || ''} ` :
                    `1 ${destToken?.symbol || ''} ≈ ${(baseNumberFormat(Number(exchangeRate.replace(",", "")) > 0 ? 1 / Number(exchangeRate.replace(",", "")) : 0, {
                        digits: 6,
                        fill: false
                    }))}${srcToken.symbol}`
            }
            { exchangeRate &&
                <i className={`iconfont ml-2 block rotate-90 cursor-pointer vc-trans`} onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setIsSrcRate(!isSrcRate);
                }}></i>
            }
        </div> : <div className={`w-1/2 h-7 rounded bg-gray-200 ${ani.vs_loading}`}></div>
        }>
            <div className="w-full flex pt-4 flex-col items-center gap-3 mo:text-sm">
                <div className="w-full flex justify-between" onClick={() => {
                    if (!bridgeList?.length) {
                        return;
                    }
                    setShowBridge(true);
                }}>
                    <div>
                        <span>{t('{#跨链桥#}')}</span>
                    </div>
                    <VsLoading loading={api.fee.loading}>
                        <div className={`flex items-center justify-end cursor-pointer`}>
                            <span className={`font-semibold`}>{bridge?.bridgeName || '--'}</span>
                            {bridge?.isFastestBridge && <span
                                className={`px-2 ml-1 rounded-t-full rounded-br-full py-0.5 text-[#356DF3] bg-[#356DF3]/10`}>
                                <i className={`iconfont vc-falsh mr-1`}></i>
                                {t('{#最快速度#}')}
                            </span>}
                            {bridge?.isCheapestBridge && <span
                                className={`px-2 ml-1 rounded-t-full rounded-br-full py-0.5 text-[#0BB88C] bg-[#0BB88C]/10`}>
                                <i className={`iconfont vc-falsh mr-1`}></i>
                                {t('{#最優價格#}')}
                            </span>}
                            {bridgeList?.length && <i className={`iconfont vc-more`}></i>}
                        </div>
                    </VsLoading>
                </div>
                <div className="w-full flex justify-between">
                    <div>
                        <span>{t('{#滑点#}')}</span>
                    </div>
                    <div className={`flex items-center justify-end cursor-pointer`} onClick={() => {
                        setShowSlip(true);
                    }}>
                        {Number(slippage)}%
                        <i className={`iconfont vc-more`}></i>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <div className={`flex items-center`}>
                        <span>{t('{#跨链费#}')}</span>
                    </div>
                    <VsLoading loading={api.fee.loading}>
                        <div>
                            {fee ? `$${baseNumberFormat(fee, {digits: 2})}` : '--'}
                        </div>
                    </VsLoading>
                </div>
                <div className="w-full flex justify-between">
                    <div className={`flex items-center`}>
                        <span>{t('{#手續費#}')}</span>
                        <Popover>
                            <PopoverTrigger>
                                <i className={`iconfont vc-help`}></i>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="max-w-[200px] break-all">{ t("{#Jeton協議手續費#}") }</div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <VsLoading loading={api.fee.loading}>
                        <div>
                            {
                                bridge?.jetonFeeTokenAmount && bridge.jetonFeeToken
                                    ? `$${
                                        baseNumberFormat(
                                            Number(formatUnits(BigInt(bridge.jetonFeeTokenAmount), Number(bridge.jetonFeeToken.decimal))) *
                                            Number(bridge.jetonFeeToken.price),
                                            {digits: 2}
                                        )
                                    }`
                                    : '0.3%'
                            }
                        </div>
                    </VsLoading>
                </div>
                <div className="w-full flex justify-between">
                    <div className={`flex items-center`}>
                        <span>{t('{#礦工費#}')}</span>
                        <Popover>
                            <PopoverTrigger>
                                <i className={`iconfont vc-help`}></i>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="max-w-[260px] break-words">
                                    {t('{#礦工費用於交易上鍊費用，非平台收取，Jeton協議允許您使用穩定幣支付礦工費，費用包括：#}')}
                                    <p className={`whitespace-nowrap`}>• {t('{#礦工費#}')}:
                                        ${baseNumberFormat(gasInfo?.price, {digits: 2, fill: false}) || '--'}
                                        ({baseNumberFormat(gasInfo?.cost, {
                                            digits: 6,
                                            fill: false
                                        })} {nativeFee?.symbol})
                                    </p>
                                    <p className={`whitespace-nowrap`}>• {t('{#目标链礦工費#}')}:${baseNumberFormat(destGasFee?.price, {
                                        digits: 2,
                                        fill: false
                                    }) || '--'}
                                        ({baseNumberFormat(destGasFee?.cost, {
                                            digits: 6,
                                            fill: false
                                        })} {destGasFee?.symbol})
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <VsLoading loading={api.fee.loading}>
                        <div>
                            {bridge ? `$${baseNumberFormat(destGasFee?.price + gasInfo.price, {
                                digits: 2,
                                fill: false
                            })}` : '--'}
                        </div>
                    </VsLoading>
                </div>
                <div className="w-full flex justify-between">
                    <div>{t('{#礦工費代幣#}')}</div>
                    {
                      bridge?.bridgeName === 'ORBITER' ? 
                      <VsLoading loading={!feeToken}>
                        <div className={`flex items-center justify-end`}>
                            {feeToken?.symbol || getChainInfoByChainId(srcToken.chainId)?.chain.nativeCurrency.symbol}
                        </div> 
                      </VsLoading> :
                      <VsLoading loading={!feeToken}>
                          <div className={`flex items-center justify-end cursor-pointer`} onClick={() => {
                              if (bridge?.supportGasLess && srcToken.address !== zeroAddress) {
                                  setIsOpen(true);
                              }
                          }}>
                              {feeToken?.symbol || getChainInfoByChainId(srcToken.chainId)?.chain.nativeCurrency.symbol}
                              {srcToken.address !== zeroAddress && <i className={`iconfont vc-more ml-1`}></i>}
                          </div>
                      </VsLoading>
                    }
                </div>
            </div>
        </VsCollapse>
        <VsSlipPoint isOpen={showSlip}
                     value={slippage}
                     isSwap={false}
                     onChange={(v) => {
                         if (v) {
                             setSlippage(`${v}`)
                         }
                         setShowSlip(false);
                     }}
        />
        <GasTokenModal isOpen={isOpen}
                       onClose={() => setIsOpen(false)}
                       feeTokens={feeTokens}
                       feeToken={feeToken}
                       onTokenSelect={(token) => {
                           onFeeTokenUpdate(token);
                           setIsOpen(false);
                       }}
        />
        <Modal isOpen={showBridge} onOpenChange={(v) => setShowBridge(v)}>
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader>{t('{#選擇路徑#}')}</ModalHeader>
                            <ModalBody className={`pb-8`}>
                                {
                                    bridgeList?.map((v, i) => (
                                        <div key={`Bridge_${i}`}
                                             className={`relative p-5 border border-gray-200 rounded-xl overflow-hidden mo:rounded-lg cursor-pointer`}
                                             onClick={() => {
                                                 setBridge(v);
                                                 setShowBridge(false);
                                             }}>
                                            {
                                                v.isFastestBridge &&
                                                <div
                                                    className={`absolute rounded-bl-xl px-3 py-0.5 text-[#356DF3] bg-[#356DF3]/10 right-0 top-0 text-xs flex items-center`}>
                                                    <i className={`iconfont vc-falsh mr-1`}></i>
                                                    {t('{#最快速度#}')}
                                                </div>
                                            }
                                            {
                                                v.isCheapestBridge && <div
                                                    className={`absolute rounded-bl-xl px-3 py-0.5  text-[#0BB88C] bg-[#0BB88C]/10 right-0 top-0 text-xs flex items-center`}>
                                                    <i className={`iconfont vc-falsh mr-1`}></i>
                                                    {t('{#最優價格#}')}
                                                </div>
                                            }
                                            <div className={`relative`}>
                                                <div className={`absolute right-0 top-1/2 -translate-y-1/2`}>
                                                    <i className={`iconfont text-gray-200 text-2xl ${v === bridge ? `vc-suc text-vs-nav` : `vc-select text-gray-200`}`}/>
                                                </div>
                                                <p className={`text-xs text-word-grey`}
                                                   dangerouslySetInnerHTML={{
                                                       __html: t('{#預估到賬 %d#}').replace(
                                                           `%d`,
                                                           `<span class="font-semibold text-vs-black text-base">
                                                            ${formatUnits(BigInt(v.destTokenAmount), Number(v.destToken?.decimal))} ${v.destToken?.symbol}
                                                           </span>`
                                                       )
                                                   }}
                                                />
                                                {
                                                    v.isFastestBridge &&
                                                    <p className={`text-xs text-word-grey`}
                                                       dangerouslySetInnerHTML={{
                                                           __html:
                                                               t('{#比其他路徑至少可快 %d#}')
                                                                   .replace(
                                                                       '%d',
                                                                       `<span class="text-[#356DF3] ">${v.fasterTime}s</span>`
                                                                   )
                                                       }}/>
                                                }
                                                {
                                                    v.isCheapestBridge &&
                                                    <p className={`text-xs text-word-grey`}
                                                       dangerouslySetInnerHTML={{
                                                           __html:
                                                               t('{#比其他路徑的費用節約的費用節約的費用節約 %d#}')
                                                                   .replace(
                                                                       '%d',
                                                                       `<span class="text-[#356DF3]">$${v.cheaperUsd}</span>`
                                                                   )
                                                       }}/>
                                                }
                                                <div className={`flex items-center gap-2 text-xs pt-3`}>
                                                    <div
                                                        className={`px-1 flex py-0.5 items-center bg-gray-100 rounded`}>
                                                        <i className={`iconfont vc-time mr-1`}></i>
                                                        {getTime(v)}
                                                    </div>
                                                    <div
                                                        className={`px-1 flex py-0.5 items-center bg-gray-100 rounded`}>
                                                        <i className={`iconfont vc-gas mr-1`}></i>
                                                        ${
                                                        baseNumberFormat(
                                                            Number(formatUnits(BigInt(v.bridgeFeeTokenAmount), Number(v.bridgeFeeToken.decimal))) * v.bridgeFeeToken?.price
                                                            +
                                                            (Number(v.destGasFeeTokenAmount) && v.destGasFeeToken && Number(formatUnits(BigInt(v.destGasFeeTokenAmount), Number(v.destGasFeeToken.decimal))) * v.destGasFeeToken.price),
                                                            {digits: 2})
                                                    }
                                                    </div>
                                                    <div
                                                        className={`flex py-0.5 items-center w-fit bg-gray-100 px-1 rounded`}>
                                                        <Avatar className={`w-4 h-4 mr-1`}
                                                                src={v.bridgeIcon}></Avatar> {v.bridgeName}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ModalBody>
                        </>
                    )}
            </ModalContent>
        </Modal>
    </div>
}

export default BridgeFeeCard;