import {NextPageWithLayout} from "@/types/global";
import {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {defaultGetStaticPaths, defaultGetStaticProps, useTrans} from "@/_i18n/next.i18n";
import fs from "fs";
import path from "path";
import {GetStaticPaths, GetStaticProps} from "next";
import {LangProps} from "@/_i18n/i18n.config";
import DefaultLayout from "@/components/layout/default.layout";
import {
    ComponentsBridgeFeeTsx, ComponentsMaxTipsTsx,
    ComponentsModalAddressEditTsx, ComponentsModalGastokenModalTsx,
    ComponentsSlipPointTsx,
    ComponentsSwapFeatureInfoTsx, ComponentsSwapFeeTsx,
    PagesLangJeSwapBridgeTsx
} from "@/_i18n/langs";
import VsFeatureInfo from "@/components/swap/featureInfo";
import bg from '@/styles/bg.module.css';
import Head from "next/head";
import {
    useAccount,
    useBytecode,
    useChainId,
    useConfig, useConnect,
    useReadContract,
    useSendTransaction,
    useSignMessage,
    useSwitchChain,
} from "wagmi";
import {useConnectModal} from "@sofent/rainbowkit";
import {defaultDestToken, defaultSrcToken, getChainInfoByChainId, SupportedShowChains} from "@/config/project.config";
import {
    serviceRelayRelayEncodeRelayRequest,
    serviceRelayRelayPermit, serviceSwapCrossChainEncodeWithFee,
    serviceSwapCrossChainList,
    ServiceSwapCrossChainListResponse, serviceSwapCrossChainPrice, serviceSwapCrossChainSwift,
    serviceSystemConfigJeton,
    ServiceSystemConfigJetonResponse,
    serviceTokenTokenFeeToken,
    ServiceTokenTokenFeeTokenResponse
} from "@/_yapi";
import useSelectTokenBalance from "@/hooks/useSelectTokenBalance";
import {usePermit} from "@/hooks/permit";
import {
    checksumAddress,
    encodeFunctionData,
    erc20Abi,
    formatUnits,
    keccak256,
    pad,
    parseUnits,
    toHex,
    zeroAddress,
    getAddress, maxInt256
} from "viem";
import {toast} from "@/components/base/toast";
import isValidPath from "@/_utils/validpath";
import {estimateGas, readContract, waitForTransactionReceipt, writeContract} from "wagmi/actions";
import {isDaiPermit} from "@/_utils/permit";
import {EIP_2612_PERMIT_ABI as Permit2612ABI, DAI_EIP_2612_PERMIT_ABI as PermitDaiABI} from "@/hooks/permit/permitAbi";
import {useDebounceFn, useRequest} from "ahooks";
import {Avatar, Button} from "@nextui-org/react";
import SwapFeeCard from "@/components/swapFee";
import BridgeFeeCard from "@/components/bridgeFee";
import {addressSens} from "@/_utils/web3";
import AddressEditModal from "@/components/modal/address.edit";
import TokenSelectModal from "@/components/modal/token.modal";
import InputNumber from "@/components/base/vsInputNumber";
import VsMaxTips from "@/components/maxTips";
import {baseNumberFormat} from "@/_utils/number";
import walletIcon from '@/styles/png/icon-wallet.png'
import vaultIcon from '@/styles/png/ic-vault.png'
import Image from 'next/image';
import {JetonRelay} from "@/abi/abi";
import {isApp, isIos} from "@/_utils";

const useCheckIsSwap = ({
                            srcTokenChainId,
                            destTokenChainId
                        }: { srcTokenChainId?: number, destTokenChainId?: number }) => {
    const [isSwap, setIsSwap] = useState<boolean>(true);
    useEffect(() => {
        if (srcTokenChainId && destTokenChainId) {
            setIsSwap(srcTokenChainId === destTokenChainId)
        }
    }, [srcTokenChainId, destTokenChainId]);
    return isSwap;
}

const PageSwapAndBridge: NextPageWithLayout = ({langs, lang}) => {

    const {t} = useTrans(langs);

    const config = useConfig();
    const chainId = useChainId();
    const {isConnected, address} = useAccount();
    const walletModal = useConnectModal();
    const { connectors, connect } = useConnect()
    const [srcAddress, setSrcAddress] = useState<`0x${string}`>();
    const [accountReady, setAccountReady] = useState<boolean>(false);
    const [destAddress, setDestAddress] = useState<typeof srcAddress>();
    const [srcToken, setSrcToken] = useState<TokenInfo>(defaultSrcToken);
    const [quoteType, setQuoteType] = useState(0);
    const [refresh, setRefresh] = useState(1);
    const [destToken, setDestToken] = useState<TokenInfo | undefined>(defaultDestToken);
    const [srcAmount, setSrcAmount] = useState('');
    const [destAmount, setDestAmount] = useState('');
    const [showMaxTips, setShowMaxTips] = useState<boolean>(false);
    const [tokenSelectType, setTokenSelectType] = useState<'src' | 'dest'>('src');
    const [showTokenSelect, setShowTokenSelect] = useState(false);
    const [showAddressEdit, setShowAddressEdit] = useState(false);
    const [allPath, setAllPath] = useState<ServiceSwapCrossChainListResponse>([]);
    const [feeTokens, setFeeTokens] = useState<ServiceTokenTokenFeeTokenResponse>([]);
    const [feeToken, setFeeToken] = useState<ServiceTokenTokenFeeTokenResponse['0']>();
    const [needFee, setNeedFee] = useState<bigint>();
    const [isValid, setIsValid] = useState<boolean>(true);
    const [isSwitch, setIsSwitch] = useState<boolean>(false);
    const [tx, setTx] = useState<Record<string, any>>({});
    const [refreshArr, setRefreshArr] = useState<number[]>([0, 0, 0]);
    const {signMessageAsync} = useSignMessage();
    const [jeton, setJeton] = useState<ServiceSystemConfigJetonResponse>();
    const srcAddressCode = useBytecode({address: srcAddress, chainId: srcToken?.chainId});
    const [isContract, setIsContract] = useState<Boolean>(false);
    const isSwap = useCheckIsSwap({srcTokenChainId: srcToken?.chainId, destTokenChainId: destToken?.chainId});
    const [jetonAddress, setJetonAddress] = useState<Record<string, string>>();
    const [hasEdit, setHasEdit] = useState<boolean>(false);
    const [txFunc, setTxFunc] = useState<(permit: string) => Promise<Record<string, any>>>();
    const [prevInfo, setPrevInfo] = useState<Record<string, any>>({});
    const [crossInfo, setCrossInfo] = useState<{
        fee: number,
        cost: string,
        depositMin?: string,
        depositMax?: string
    }>({fee: 0, cost: '0' });
    const [isIosApp, setIsIosApp] = useState<boolean>(false);

    const [deposit, setDeposit] = useState<{
        depositMin?: string,
        depositMax?: string
    }>({ });

    const [showOutPrice, setShowOutPrice] = useState<boolean>();

    const api = {
        price: useRequest(serviceSwapCrossChainPrice, { manual: true }),
        fee: useRequest(serviceSwapCrossChainEncodeWithFee, {manual: true})
    }

    const setInitFunc = useCallback((initSwap: (permit: string) => Promise<Record<string, any>>) => {
        setTxFunc(() => {
            return initSwap
        })
    }, [setTxFunc]);

    // 选择转出代币余额
    const {value: srcTokenBalance, decimals: tokenDecimals} = useSelectTokenBalance({
        tokenAddress: srcToken?.address,
        userAddress: srcAddress,
        chainId: srcToken?.chainId,
        scopeKey: `srcToken_${refresh}`,
        enabled: !!srcToken?.address
    });
    // 选择矿工费代币余额
    const {value: feeBalance} = useSelectTokenBalance({
        tokenAddress: feeToken?.address,
        userAddress: srcAddress,
        chainId: feeToken?.chainId,
        scopeKey: `feeToken_${refresh}`,
        enabled: !!feeToken?.address
    });
    // 初始化 sign permit
    const {signPermit, signPermitDai} = usePermit({
        contractAddress: feeToken?.address === zeroAddress ? undefined : feeToken?.address as any,
        chainId: srcToken?.chainId,
        ownerAddress: srcAddress as any,
    });

    const {signPermit: signTokenPermit, signPermitDai: signTokenPermitDai} = usePermit({
        contractAddress: srcToken?.address === zeroAddress ? undefined : srcToken?.address as any,
        chainId: srcToken?.chainId,
        ownerAddress: srcAddress as any,
    });

    const tokenAllowance = useReadContract({
        address: srcToken?.address as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        chainId: srcToken?.chainId,
        account: srcAddress,
        args: srcAddress && tx?.allowanceTarget ? [srcAddress, tx?.allowanceTarget as `0x${string}`] : undefined,
        query: {
            enabled: !!tx?.allowanceTarget && srcToken?.address !== zeroAddress
        },
        scopeKey: `tokenAllowance_${refreshArr[0]}`
    });

    const {data: relayNonce} = useReadContract({
        address: jetonAddress?.relayHub as `0x${string}`,
        abi: JetonRelay.abi,
        functionName: "getRelayTxNonce",
        chainId: srcToken?.chainId,
        account: srcAddress,
        args: [srcAddress],
        query: {
            enabled: !!jetonAddress?.relayHub
        },
        scopeKey: `relayNonce_${refresh}`
    });

    const feeRelayHubAllowance = useReadContract({
        address: feeToken?.address as `0x${string}`,
        abi: erc20Abi,
        functionName: "allowance",
        chainId: feeToken?.chainId,
        account: srcAddress,
        args: srcAddress && jetonAddress?.payMasterAllowanceTarget ? [srcAddress, jetonAddress?.payMasterAllowanceTarget as `0x${string}`] : undefined,
        query: {
            enabled: !!jetonAddress?.payMasterAllowanceTarget && feeToken?.address !== zeroAddress
        },
        scopeKey: `feeRelayAllowance_${refreshArr[2]}`
    });

    useEffect(() => {
        if (typeof relayNonce === 'bigint') {
            console.log('relayNonce', relayNonce);
        }
        if (typeof feeRelayHubAllowance.data === 'bigint') {
            console.log('feeRelayHubAllowance', feeRelayHubAllowance.data);
        }
    }, [relayNonce, feeRelayHubAllowance]);

    const {run} = useDebounceFn(async (fn, args) => {
        await fn(args);
    }, {maxWait: 1000});

    const [showConfirm, setShowConfirm] = useState<boolean>(false);
    const [showApprove, setShowApprove] = useState<boolean>(false);
    const [expand, setExpand] = useState(false);
    const expandRef = useRef(null);
    const {sendTransactionAsync} = useSendTransaction();
    const {switchChainAsync} = useSwitchChain();
    const [needSwitchChain, setNeedSwitchChain] = useState<boolean>(false);

    const initTx = async () => {

        if (!srcAddress) {
            return;
        }
        let newTx = tx;
        let needNoncePlus = false;
        const nativeToken = feeTokens.filter(it => it.address === zeroAddress)[0];
        const feeAmount = BigInt(newTx.gasLimitData.swapGasLimit) * BigInt(newTx.gasPriceData.propose.maxGasPrice);
        const feeGasPrice = Number(formatUnits(feeAmount, Number(nativeToken?.decimals))) * Number(nativeToken?.price);
        const feePrice = isSwap ? feeGasPrice : feeGasPrice + crossInfo?.fee;
        const feeTokenAmount = parseUnits(String((1.2 * feePrice) / Number(feeToken?.price)), Number(feeToken?.decimals));

        const deadline = BigInt(Math.floor(Date.now() / 1000) + 86400);

        if (srcToken?.isPermit && srcToken?.address !== zeroAddress && newTx.allowanceTarget && BigInt(tokenAllowance.data || 0) < parseUnits(srcAmount, Number(srcToken?.decimals))) {

            setShowConfirm(true);

            const amount = parseUnits(srcAmount, Number(srcToken?.decimals));
            const isDai = isDaiPermit(srcToken);

            const spenderAddress = newTx?.allowanceTarget as `0x${string}`;

            if (BigInt(feeRelayHubAllowance.data || 0) < feeTokenAmount && srcToken?.address === feeToken?.address) {
                needNoncePlus = true;
            }

            try {

                const result = isDai ? await signTokenPermitDai?.({
                    spenderAddress,
                    deadline
                }, needNoncePlus) : await signTokenPermit?.({
                    value: amount,
                    spenderAddress,
                    deadline
                }, needNoncePlus);

                console.log('token permit:', result);

                if (!result) {
                    toast(t("{#Sign签名失败#}"));
                    setShowConfirm(false);
                    return;
                }

                const permit = (isDai ? encodeFunctionData({
                    abi: PermitDaiABI,
                    functionName: 'permit',
                    args: [srcAddress, spenderAddress, result.nonce, deadline, true, result.v, result.r, result.s],
                }) : encodeFunctionData({
                    abi: Permit2612ABI,
                    functionName: 'permit',
                    args: [srcAddress, spenderAddress, amount, deadline, result.v, result.r, result.s],
                }));

                console.log('permit--->', `0x${permit.slice(10)}`);
                console.log('PermitDaiABI arg--->', [srcAddress, spenderAddress, result.nonce, deadline, true, result.v, result.r, result.s]);
                console.log('Permit2612ABI arg--->', [srcAddress, spenderAddress, amount, deadline, result.v, result.r, result.s]);

                const res = await txFunc?.(`0x${permit.slice(10)}`);

                if (res) {
                    newTx = res;
                }

            } catch (e) {
                setShowConfirm(false);
                return console.log(e);
            }
        }

        console.log('chainId', pad(toHex(srcToken?.chainId), {size: 32}).slice(2));
        console.log('relayNonce', relayNonce && pad(toHex(relayNonce as bigint), {size: 32}).slice(2));
        console.log('relayHub', jetonAddress?.relayHub);
        console.log('payMasterAllowanceTarget', jetonAddress?.payMasterAllowanceTarget);

        if (feeToken?.address !== zeroAddress && jetonAddress?.relayHub && jetonAddress?.payMasterAllowanceTarget && typeof relayNonce === 'bigint') {
            try {

                let permitData: string = '';

                if (feeToken?.isPermit && BigInt(feeRelayHubAllowance.data || 0) < feeTokenAmount) {

                    setShowConfirm(true);
                    //@ts-ignore
                    const isDai = isDaiPermit(feeToken);
                    const spenderAddress = getAddress(jetonAddress?.payMasterAllowanceTarget as `0x${string}`);
                    const minPermitValue = parseUnits('10000', Number(feeToken.decimals));
                    const value = minPermitValue > feeTokenAmount ? minPermitValue : feeTokenAmount;

                    try {

                        const result = isDai ? await signPermitDai?.({
                            spenderAddress,
                            deadline
                        }) : await signPermit?.({
                            value,
                            spenderAddress,
                            deadline
                        });

                        console.log('fee token permit:', result);

                        if (!result) {
                            toast(t("{#Sign签名失败#}"));
                            setShowConfirm(false);
                            return;
                        }

                        console.log('isDai', isDai);
                        console.log('args', [srcAddress, spenderAddress, result.nonce, deadline, true, result.v, result.r, result.s]);

                        permitData = (isDai ? encodeFunctionData({
                            abi: PermitDaiABI,
                            functionName: 'permit',
                            args: [srcAddress, spenderAddress, result.nonce, deadline, true, result.v, result.r, result.s],
                        }) : encodeFunctionData({
                            abi: Permit2612ABI,
                            functionName: 'permit',
                            args: [srcAddress, spenderAddress, value, deadline, result.v, result.r, result.s],
                        }));

                        console.log('permitData--->', `0x${permitData.slice(10)}`);

                    } catch (e) {
                        setShowConfirm(false);
                        return console.log(e);
                    }
                }

                const gasLimit = BigInt(newTx.gasLimitData?.swapGasLimit) > BigInt(2000000) && [8453].includes(chainId) ? newTx.gasLimitData?.swapGasLimit : 2000000;

                const {encode} = await serviceRelayRelayEncodeRelayRequest({
                    from: newTx.from,
                    to: newTx.to,
                    token: feeToken?.address || '',
                    value: newTx.value,
                    data: newTx.data,
                    permit: permitData ? `0x${permitData.slice(10)}` : '',
                    chainId: `${srcToken?.chainId}`,
                    gasLimit: `${ gasLimit }`,
                    gasFeeSpecific: ''
                });

                setShowConfirm(true);

                const message = [
                    "0x",
                    "19",
                    "00",
                    getAddress(jetonAddress?.relayHub).slice(2),
                    pad(toHex(srcToken?.chainId), {size: 32}).slice(2),
                    encode,
                    pad(toHex(relayNonce as bigint), {size: 32}).slice(2),
                ].join("") as `0x${string}`;

                console.log('message--->', message);
                console.log('hashMessage--->', keccak256(message));

                const signature = await signMessageAsync({message: {raw: keccak256(message)}});

                console.log('signature---->', signature);

                if (!signature) {
                    setShowConfirm(false);
                    toast(t("{#Sign签名失败#}"));
                    return;
                }

                const {relayHash} = await serviceRelayRelayPermit({
                    wallet: newTx.from,
                    data: newTx.data,
                    to: newTx.to,
                    value: newTx.value,
                    from: newTx.from,
                    token: feeToken?.address || '',
                    permit: permitData ? `0x${permitData.slice(10)}` : '',
                    chainId: srcToken?.chainId,
                    sigResult: signature,
                    gasFeeSpecific: newTx.gasPriceData.propose.gasPrice,
                    gasLimit,
                    maxFeePerGas: newTx.gasPriceData?.propose?.maxFeePerGas,
                    maxPriorityFeePerGas: newTx.gasPriceData?.propose?.maxPriorityFeePerGas
                });

                if (relayHash) {
                    toast(t("{#交易已发起，请稍后在插件中查看结果#}"), 'success');
                    setSrcAmount('');
                    setDestAmount('');
                    return;
                }

                toast(t('{#交易失败#}'));

            } catch (error: any) {
                console.log("signData error", JSON.stringify(error));
            } finally {
                setShowConfirm(false);
            }
            return;
        }
        setShowConfirm(true);
        try {
            const gas = await estimateGas(config, {
                chainId: srcToken?.chainId,
                to: newTx.to as any,
                data: newTx.data as any,
                value: BigInt(newTx.value),
            });
            const tr = await sendTransactionAsync({
                chainId: srcToken?.chainId,
                to: newTx.to as any,
                data: newTx.data as any,
                gas,
                gasPrice: BigInt(newTx.gasPriceData.propose.maxGasPrice),
                value: BigInt(newTx.value),
            });

            const hash = typeof tr === "string" ? tr : Array.isArray(tr) ? tr[0] : '';
            if (hash) {
                const trr = await waitForTransactionReceipt(config, {
                    chainId,
                    hash,
                    confirmations: 1
                });

                if (trr?.status !== 'success') {
                    toast(t("{#交易失败#}"), 'error');
                    return;
                } else {
                    console.log("tx result", trr);
                    toast(t("{#交易成功#}"), 'success');
                }
                if (tr) {
                    setSrcAmount('');
                    setDestAmount('');
                    setRefresh((old) => old + 1);
                }
            }
        } catch (error) {
            console.log(error);
            // toast(t("{#发送交易失败#}"),'error')
        } finally {
            setShowConfirm(false);
        }
    };


    useEffect(() => {
        setIsIosApp(isApp() && isIos())
    }, [])

    const getButtonLabel = useMemo(() => {
        const srcAmountN = parseUnits(srcAmount || '0', Number(srcToken?.decimals));
        const normalBtn = `my-4 w-full text-2xl rounded-2xl h-[68px] mo:h-10 mo:rounded-xl mo:text-base`;
        const approveBtn = `bg-[#F38535]`;
        const approveDisabled = `disabled:bg-[#F38535]/40`;
        const primaryDisabled = `cursor-not-allowed disabled:bg-primary/40`;
        if (!accountReady || !srcAddress) {
            return <Button
                className={`${normalBtn}`}
                color="primary"
                onClick={async () => {
                    try {
                        setIsSwitch(true);
                        if (!accountReady && walletModal.openConnectModal && !walletModal.connectModalOpen) {
                            await walletModal.openConnectModal();
                        }
                    } catch (e) {

                    } finally {
                        setIsSwitch(false);
                    }
                }}
            >
                {isSwitch && <i className={`w-6 h-6 block mr-2 vc-loading`}></i>}
                {t('{#链接钱包#}')}
            </Button>
        }
        if (!srcAmountN || !destAmount || !isValid || !tx?.to || !tx?.data) {
            return <Button
                className={`${normalBtn} ${primaryDisabled}`}
                color="primary"
                disabled={true}
            >
                {srcToken?.chainId === destToken?.chainId ? t('{#兑换#}') : t('{#跨链兑换#}')}
            </Button>
        }
        if (showApprove) {
            return <Button
                className={`${normalBtn} ${approveBtn} ${approveDisabled}`}
                color="primary"
                disabled={true}
            >
                <i className={`w-6 h-6 block mr-2 vc-loading`}></i>
                {t('{#請在錢包中確認#}')}
            </Button>
        }
        if (srcToken && srcToken?.address !== zeroAddress && (!srcToken?.isPermit || srcToken?.chainId === 324)) {
            if (BigInt(tokenAllowance.data || 0) < parseUnits(srcAmount, Number(srcToken?.decimals))) {
                return <Button
                    className={`${normalBtn} ${approveBtn}`}
                    color="primary"
                    disabled={!tokenAllowance.isFetched}
                    onClick={async () => {
                        setShowApprove(true);
                        try {
                            await allowanceAndApprove({
                                account: srcAddress as `0x${string}`,
                                chainId: srcToken?.chainId,
                                contractAddress: srcToken?.address as `0x${string}`,
                                balance: srcTokenBalance,
                                value: srcAmountN,
                                tokenSymbol: srcToken?.symbol,
                                targetAddress: tx.allowanceTarget
                            });
                            setRefreshArr([refreshArr[0] + 1, refreshArr[1], refreshArr[2]]);
                        } catch (e) {
                            console.log(e)
                        } finally {
                            setShowApprove(false);
                        }
                    }}
                >
                    {t('{#授权 %t#}').replace(`%t`, srcToken?.symbol)}
                </Button>
            }
        }
        if (!srcTokenBalance || srcTokenBalance < srcAmountN) {
            return <Button
                className={`${normalBtn} ${primaryDisabled}`}
                color="primary"
                disabled={true}
            >
                {t('{#代币%d余额不足#}').replace('%d', srcToken?.symbol)}
            </Button>
        }
        const nativeToken = feeTokens.filter(it => it.address === zeroAddress)[0];
        const gasLimit = feeToken?.address === zeroAddress ? tx?.gasLimitData.gasLimit : tx?.gasLimitData?.swapGasLimit;
        const feeAmount = BigInt(tx.gasLimitData?.swapGasLimit) * BigInt(tx.gasPriceData?.propose.maxGasPrice);
        const feeBridge = BigInt(gasLimit) * BigInt(tx.gasPriceData?.propose.maxGasPrice);
        const feeBridgePrice = Number(formatUnits(feeBridge, Number(nativeToken?.decimals))) * Number(nativeToken?.price);
        const feeGasPrice = Number(formatUnits(feeAmount, Number(nativeToken?.decimals))) * Number(nativeToken?.price);
        const feePrice = isSwap ? feeGasPrice : feeBridgePrice + crossInfo?.fee;
        const feeTokenAmount = parseUnits(String(feePrice / Number(feeToken?.price)), Number(feeToken?.decimals));
        const balance = feeToken?.address === srcToken?.address ? (srcTokenBalance - srcAmountN) : feeBalance;
        if (balance < feeTokenAmount) {
            return <Button
                className={`${normalBtn} ${primaryDisabled}`}
                color="primary"
                disabled={true}
            >
                {t('{#矿工费%d不足#}').replace(`%d`, `${feeToken?.symbol || ''}`)}
            </Button>
        }
        if (feeToken && feeToken?.address !== zeroAddress && (!feeToken.isPermit || feeToken.chainId === 324)) {
            if (BigInt(feeRelayHubAllowance.data || 0) < feeTokenAmount) {
                return <Button
                    className={`${normalBtn} ${approveBtn}`}
                    color="primary"
                    disabled={!feeRelayHubAllowance.isFetched}
                    onClick={async () => {
                        setShowApprove(true);
                        try {
                            await allowanceAndApprove({
                                account: srcAddress as `0x${string}`,
                                chainId: feeToken.chainId,
                                contractAddress: feeToken.address as `0x${string}`,
                                balance: feeBalance,
                                value: feeTokenAmount,
                                tokenSymbol: feeToken.symbol,
                                targetAddress: jetonAddress?.payMasterAllowanceTarget as `0x${string}`,
                                isPayMaster: true
                            });
                            setRefreshArr([refreshArr[0], refreshArr[1], refreshArr[2] + 1]);
                        } catch (e) {
                            console.log(e);
                        } finally {
                            setShowApprove(false);
                        }
                    }}
                >
                    {t('{#授權礦工費 %t#}').replace(`%t`, feeToken.symbol)}
                </Button>
            }
        }
        if (showConfirm) {
            return <Button
                className={`${normalBtn} ${primaryDisabled}`}
                color="primary"
                disabled={true}>
                <i className={`w-6 h-6 block mr-2 vc-loading`}></i> {t('{#請在錢包中確認#}')}
            </Button>
        }
        if (needSwitchChain) {
            return <Button
                className={`${normalBtn}`}
                color="primary"
                onClick={async () => {
                    try {
                        setIsSwitch(true);
                        const res = await switchChainAsync({chainId: srcToken?.chainId});
                        setNeedSwitchChain(false);
                    } catch (e) {

                    } finally {
                        setIsSwitch(false);
                        setRefresh(refresh + 1);
                    }
                }}
            >
                {isSwitch && <i className={`w-6 h-6 block mr-2 vc-loading`}></i>}
                {isSwitch ? t('{#請在錢包中確認#}') : t('{#切换网络#}')}
            </Button>
        }
        return <Button
            className={`${normalBtn}`}
            color="primary"
            onClick={async () => {
                await run(initTx, undefined);
            }}>
            {srcToken?.chainId === destToken?.chainId ? t('{#兑换#}') : t('{#跨链兑换#}')}
        </Button>
    }, [
        accountReady,
        needSwitchChain,
        setNeedSwitchChain,
        feeRelayHubAllowance,
        isValid,
        srcToken,
        destToken,
        feeToken,
        tokenAllowance,
        srcAmount,
        destAmount,
        showConfirm,
        srcTokenBalance,
        feeBalance,
        isSwap,
        crossInfo,
        tokenDecimals,
        tx,
        showApprove,
        feeTokens,
        isSwitch,
        lang,
    ]);

    const openSrc = () => {
        setTokenSelectType('src');
        setShowTokenSelect(true);
    }
    const openDest = () => {
        if (!srcToken?.address) {
            return
        }
        setTokenSelectType('dest');
        setShowTokenSelect(true);
    }
    const toSetMaxTransValue = useCallback(() => {
        if (feeTokens.length && (tx?.gasLimitData || prevInfo.gasLimitData)) {
            const gasLimit = (!tx?.gasLimitData || tx?.gasLimitData?.swapGasLimit?.includes('0000') ? prevInfo?.gasLimitData?.swapGasLimit : tx?.gasLimitData?.swapGasLimit) || 800000;
            const gasPrice = tx?.gasPriceData?.propose?.maxGasPrice || prevInfo?.gasPriceData?.propose?.maxGasPrice || 0;
            const gasValue = (BigInt(gasLimit) + BigInt(200000)) * BigInt(gasPrice);
            if (feeToken?.address === zeroAddress) {
                if (srcToken?.address === zeroAddress) {
                    const values = isSwap ? gasValue : gasValue + BigInt(crossInfo?.cost || 0);
                    return {
                        total: srcTokenBalance > values ? srcTokenBalance - values : BigInt(0),
                        feeAmount: values
                    }
                } else {
                    return {
                        total: srcTokenBalance,
                        feeAmount: BigInt(0)
                    }
                }
            }
            const nativeToken = feeTokens.filter(it => it.address === zeroAddress)[0];
            const feePrice = Number(formatUnits(gasValue, Number(nativeToken?.decimals))) * Number(nativeToken?.price);
            const feeTokenAmount = parseUnits(String(( isSwap ? feePrice * 1.2 : crossInfo?.fee + feePrice ) / Number(feeToken?.price)), Number(feeToken?.decimals));
            const total = feeToken?.address === srcToken?.address ? (srcTokenBalance > feeTokenAmount ? srcTokenBalance - feeTokenAmount : BigInt(0)) : srcTokenBalance;
            return { total, feeAmount: feeToken?.address === srcToken?.address ? feeTokenAmount : BigInt(0)};
        } else {
            return {total: srcTokenBalance, feeAmount: BigInt(0)}
        }
    }, [feeToken, feeTokens, srcTokenBalance, srcToken, zeroAddress, tx, prevInfo, crossInfo?.fee, isSwap]);

    const allowanceAndApprove: (obj: {
        contractAddress: `0x${string}`,
        targetAddress: `0x${string}`,
        chainId: number,
        account: `0x${string}`,
        value: bigint,
        balance: bigint,
        tokenSymbol: string,
        isPayMaster?: boolean
    }) => Promise<Boolean> = useCallback(async (obj) => {
        const {contractAddress, account, chainId, targetAddress, value, balance, tokenSymbol, isPayMaster} = obj;
        const allowance = await readContract(config, {
            address: contractAddress,
            abi: erc20Abi,
            functionName: "allowance",
            chainId,
            account,
            args: [account, targetAddress]
        });
        if (allowance < value) {
            try {
                if (allowance > BigInt(0) && (tokenSymbol === 'USDT' && [1, 9527].includes(chainId))) {
                    const result = await writeContract(config, {
                        address: checksumAddress(srcToken?.address as any),
                        abi: [{...erc20Abi.filter(it => it.name === 'approve')[0], outputs: []}],
                        functionName: "approve",
                        chainId,
                        args: [targetAddress, BigInt(0)],
                        account,
                    })
                    const hash = typeof result === "string" ? result : Array.isArray(result) ? result[0] : '';
                    if(hash) {
                        const trr = await waitForTransactionReceipt(config, {
                            hash,
                            confirmations: 1
                        });
                        if (trr.status !== 'success') {
                            toast(t("{#授权交易失败#}"));
                            return false;
                        }
                    }
                }
                const result = await writeContract(config, {
                    address: contractAddress,
                    abi: (tokenSymbol === 'USDT' && [1, 9527].includes(chainId)) || (contractAddress === '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA' && [8453].includes(chainId)) ? [{
                        ...erc20Abi.filter(it => it.name === 'approve')[0],
                        outputs: []
                    }] : erc20Abi,
                    chainId,
                    functionName: "approve",
                    args: [getAddress(targetAddress), isPayMaster ? maxInt256 : balance],
                    account,
                });
                console.log('result', result);
                const hash = typeof result === "string" ? result : Array.isArray(result) ? result[0] : '';
                if(hash) {
                    const trr = await waitForTransactionReceipt(config, {
                        hash,
                        confirmations: 1
                    });
                    if (trr.status !== 'success') {
                        toast(t("{#授权交易失败#}"));
                    } else {
                        toast(t("{#代币授权成功#}"));
                    }
                    return trr.status === 'success';
                }
                return false;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
        return true;
    }, [config, lang]);

    useEffect(() => {
        serviceSwapCrossChainList().then((res: ServiceSwapCrossChainListResponse) => {
            setAllPath(res);
        })
    }, []);

    useEffect(() => {
        setAccountReady(isConnected);
        if (address) {
            setSrcAddress(getAddress(address));
        }
    }, [isConnected, address]);

    useEffect(() => {
        if (srcToken?.address === feeToken?.address) {
            const srcInfo = parseUnits(srcAmount, Number(srcToken?.decimals));
            if (srcInfo > BigInt(0) && srcInfo === srcTokenBalance) {
                const {total, feeAmount: fa} = toSetMaxTransValue();
                const isCache = localStorage.getItem('Jeton_cache_max_tips');
                if (!isCache && fa) {
                    setNeedFee(fa);
                    setShowMaxTips(true);
                } else {
                    setSrcAmount(formatUnits(total, Number(srcToken?.decimals)));
                }
            }
        }
    }, [srcToken, feeToken, tx]);

    useEffect(() => {
        serviceTokenTokenFeeToken({
            wallet: srcAddress || '',
            chainId: `${srcToken?.chainId}`,
            customTokenAddress: ""
        }).then((res) => {
            const list = res ?? [];
            setFeeTokens([324].includes(srcToken?.chainId) ? list.filter(v => v.address === zeroAddress) : list);
            setFeeToken(res?.length ? res.filter(v => v.address === zeroAddress)[0] : undefined);
            setRefreshArr([refreshArr[0], refreshArr[1], refreshArr[2] + 1])
        });
    }, [srcToken, srcAddress, refresh]);

    useEffect(() => {
        if (!hasEdit) {
            if (srcAddress && srcAddressCode.isFetched) {
                if (!srcAddressCode.data && destToken?.chainId !== 728126428) {
                    setDestAddress(srcAddress);
                } else {
                    setDestAddress(undefined);
                }
                setIsContract(!!srcAddressCode.data);
            }
        }
    }, [srcAddress, srcAddressCode, destToken]);

    useEffect(() => {
        if (chainId) {
            setNeedSwitchChain(chainId !== srcToken?.chainId);
        }
    }, [chainId, srcToken]);

    useEffect(() => {
        if (expand && expandRef.current) {
            setTimeout(() => {
                (expandRef.current as any)?.scrollIntoView({behavior: 'smooth', block: 'end'});
            }, 180)
        }
    }, [expand]);

    useEffect(() => {
        serviceSystemConfigJeton().then(res => {
            setJeton(res);
        })
    }, []);

    useEffect(() => {
        if (jeton?.length) {
            const addr = jeton?.filter(v => Number(v.chainId) === srcToken?.chainId)[0]?.jeton;
            if (addr) {
                setJetonAddress(addr);
            }
        }
        setSrcAmount('');
    }, [srcToken]);

    useEffect(() => {
        if (!srcAmount && quoteType === 0) {
            setDestAmount('');
        }
        if (srcAmount === '0' && quoteType === 0) {
            setDestAmount('0');
        }
        if (!destAmount && quoteType === 1) {
            setSrcAmount('');
        }
        if (destAmount === '0' && quoteType === 1) {
            setSrcAmount('0');
        }
    }, [srcAmount, destAmount]);

    useEffect(() => {
        if (srcToken && destToken && srcToken?.chainId !== destToken?.chainId) {
            serviceSwapCrossChainSwift({
                destChainId: `${destToken?.chainId}`,
                srcChainId: `${srcToken?.chainId}`,
                srcTokenAddress: srcToken?.address,
                destTokenAddress: destToken?.address,
            }).then( res => {
                setDeposit(res ?? {})
            });
        }
    }, [srcToken, destToken]);

    useEffect(() => {
        if (srcAmount && (deposit.depositMin || deposit.depositMax)) {
            const sa = Number(srcAmount);
            const min = Number(deposit.depositMin) || 0;
            const max = Number(deposit.depositMax) || 20000000000000000000000000;
            setShowOutPrice((sa < min || sa > max) && srcToken?.chainId !== destToken?.chainId);
        } else {
            setShowOutPrice(false);
        }
    }, [srcAmount, deposit, srcToken, destToken]);

    useEffect(() => {
         if (srcAmount) {
             return;
         }
         if (destToken?.chainId !== srcToken?.chainId && srcAddress && destAddress) {
             api.price.runAsync({
                 srcChainId: `${srcToken?.chainId}`,
                 destChainId: `${destToken?.chainId}`,
                 srcTokenAddress: `${srcToken?.address}`,
                 destTokenAddress: `${destToken?.address}`,
                 srcTokenAmount: `${parseUnits(deposit.depositMin || '1', Number(srcToken?.decimals))}`,
                 srcWalletAddress: srcAddress || '',
                 destWalletAddress: destAddress || ''
             }).then(res => {
                 if(res.bridgeList?.length || res.quoteResult) {
                     api.fee.runAsync({
                         wallet: srcAddress || '',
                         beneficiary: destAddress || '',
                         quoteResult: res.quoteResult,
                         chainId: `${srcToken?.chainId}`,
                         bridgeName: res.bridgeList[0]?.bridgeName
                     }).then( val => {
                         setPrevInfo({
                             ...res,
                             val
                         });
                     });
                 }
             });
         }
    }, [destToken, srcToken, srcAddress, destAddress, srcAmount, deposit.depositMin]);

    return <>
        <Head>
            <title>{t('{#Swap & Bridge#}')}</title>
        </Head>
        <div
            className={`w-full min-h-full flex items-center justify-between flex-col bg-cover bg-center mo:block ${bg.bg}`}>
            <div className={`w-full`}>
                <VsFeatureInfo/>
            </div>
            <div className="w-full flex-1 overflow-y-auto flex items-center p-8 mo:p-0 justify-center mo:block m-auto"
                 ref={expandRef}>
                <div
                    className="min-w-[598px] bg-vs-part shadow-lg rounded-2xl mo:min-w-0 mo:rounded-xl py-6 px-9 mo:py-3 mo:px-4 mo:m-4">
                    <div className="text-2xl font-semibold mo:text-xl">{t('{#兌換&跨鏈#}')}</div>
                    <div className="mt-6 mo:mt-4 bg-vs-content rounded-lg pb-8 relative">
                        { !!srcToken?.price && !!srcAmount && srcAmount !== '0' && <div className={`absolute right-5 mo:right-3 bottom-8 text-word-grey text-xs`}>
                            ${ baseNumberFormat(Number(srcAmount || 0) * Number(srcToken?.price), { digits: 2, fill: false }) || '' }
                            {/*<span className={`${ Number(srcToken?.price24hChangePercent) < 0 ? 'text-green-500' : 'text-vs-red'}`}>({ srcToken?.price24hChangePercent }%)</span>*/}
                        </div> }
                        <div className={`p-5 mo:text-sm mo:p-3`}>
                            <div className={`flex items-center justify-between text-word-grey`}>
                                <div className={`flex items-center`}>
                                    <span className={`mr-2`}>{t('{#從%n#}').replace('%n', '')}</span>
                                    <Avatar
                                        src={ getChainInfoByChainId(srcToken?.chainId || 1)?.icon}
                                        className="w-[18px] h-[18px] mo:w-4 mo:h-4 mr-2" radius="full"></Avatar>
                                    <span>{ getChainInfoByChainId(srcToken?.chainId || 1)?.name}</span>
                                </div>
                                {
                                    accountReady && <div className={`text-xl flex items-center mo:flex-col mo:items-end mo:text-sm`}>
                                        <div
                                            className={`mr-2 mo:mr-0`}>{t('{#餘額#}')}: {baseNumberFormat(formatUnits(srcTokenBalance, tokenDecimals), {
                                            digits: 6,
                                            fill: false
                                        })}</div>
                                        <div className={`text-primary cursor-pointer`}
                                              onClick={() => {
                                                  setQuoteType(0);
                                                  const {total, feeAmount: fa} = toSetMaxTransValue();
                                                  const isCache = localStorage.getItem('Jeton_cache_max_tips');
                                                  if (!isCache && fa) {
                                                      setNeedFee(fa);
                                                      setShowMaxTips(true);
                                                  } else {
                                                      setSrcAmount(formatUnits(total, Number(srcToken?.decimals)));
                                                  }
                                              }}
                                        >{t('{#全部#}')}</div>
                                    </div>
                                }
                            </div>
                            <div className="flex items-center pt-8 mo:pt-5">
                                <div className="flex items-center gap-2 cursor-pointer mr-4 mo:mr-3" onClick={openSrc}>
                                    <Avatar src={srcToken?.logo} className="w-9 h-9 mo:w-6 mo:h-6"/>
                                    <div className="text-2xl min-w-[80px] font-semibold mo:text-xl mo:min-w-[60px]">{srcToken?.symbol}</div>
                                    <div
                                        className={`bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center`}>
                                        <i className={`iconfont vc-more`}></i>
                                    </div>
                                </div>
                                <div className={`flex-1`}>
                                    <InputNumber value={srcAmount}
                                                 className={`text-3xl font-semibold mo:text-xl`}
                                                 placeholder={'0'}
                                                 min={0}
                                                 onChange={(v) => {
                                                     setSrcAmount(v);
                                                     if (Number(v) === 0) {
                                                         setDestAmount(v);
                                                         return;
                                                     }
                                                     setQuoteType(0);
                                                 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`relative z-[2] m-auto rounded-full cursor-pointer border-8 bg-vs-content flex items-center justify-center border-vs-part w-14 h-14 -mt-6`}
                        onClick={async () => {
                            if (destToken && srcToken) {
                                const valid = await isValidPath(destToken, srcToken, allPath);
                                setIsValid(valid);
                                setSrcAmount('');
                                setDestAmount('');
                                setTimeout(() => {
                                    setDestToken(srcToken);
                                    setSrcToken(destToken);
                                    setRefreshArr([refreshArr[0] + 1, refreshArr[1], refreshArr[2]]);
                                }, 100);
                            }
                        }}>
                        <i className={`iconfont vc-trans`}></i>
                    </div>
                    <div className="-mt-6 bg-vs-content  mo:text-sm rounded-lg pt-4 pb-4 relative">
                        { !!destToken?.price && !!srcAmount && srcAmount !== '0' && <div className={`absolute right-5 mo:right-3 bottom-4 text-word-grey text-xs`}>
                            ${ baseNumberFormat(Number(destAmount || 0) * Number(destToken?.price), { digits: 2, fill: false }) || '' }
                            <span className={`${ Number(destToken?.price24hChangePercent) < 0 ? 'text-green-500' : 'text-vs-red'}`}>({ destToken?.price24hChangePercent?.toFixed(2) }%)</span>
                        </div> }
                        <div className={`p-5 mo:p-3`}>
                            <div className={`flex items-center justify-between text-word-grey`}>
                                <div className={`flex items-center`}>
                                    <span className={`mr-2`}>{t('{#到%n#}').replace('%n', '')}</span>
                                    <Avatar
                                        src={ getChainInfoByChainId(destToken?.chainId || 1).icon}
                                        className="w-[18px] h-[18px] mo:w-4 mo:h-4 mr-2" radius="full"></Avatar>
                                    <span>{ getChainInfoByChainId(destToken?.chainId || 1 ).name }</span>
                                </div>
                            </div>
                            <div className="flex items-center pt-8 mo:pt-5 relative">
                                <div className="flex items-center cursor-pointer gap-2 mr-4 mo:mr-3" onClick={openDest}>
                                    { destToken ? <>
                                        <Avatar src={destToken?.logo} className="w-9 h-9 mo:w-6 mo:h-6"/>
                                        <div className="text-2xl font-semibold min-w-[80px] mo:text-xl mo:min-w-[60px]">
                                            {destToken?.symbol}
                                        </div>
                                    </> : <div className={`min-w-[116px] h-9 flex font-semibold text-xl mo:text-base items-center`}>{ t('{#请选择#}') }</div> }
                                    <div
                                        className={`bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center`}>
                                        <i className={`iconfont vc-more`}></i>
                                    </div>
                                </div>
                                <div className={`flex-1`}>
                                    <InputNumber value={destAmount}
                                                 className={`text-3xl font-semibold mo:text-xl`}
                                                 placeholder={'0'}
                                                 min={0}
                                                 onChange={(v) => {
                                                     setDestAmount(v);
                                                     if (Number(v) === 0) {
                                                         setSrcAmount(v);
                                                         return;
                                                     }
                                                     setQuoteType(1);
                                                 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        ( !isValid || tx?.message || showOutPrice) && !!destToken && <div
                            className={`p-5 rounded-lg mt-3 flex items-center mo:mt-2 text-[#E34949] mo:text-sm bg-[#E34949]/20 mo:p-4`}>
                            <i className={`iconfont vc-warning mr-1`}></i>
                            {showOutPrice ? (
                                Number(deposit.depositMin || 0) > Number(srcAmount)
                                    ? `${t('{#本次最小跨链数量为#}')}${ baseNumberFormat(deposit.depositMin, { digits: 6, fill: false })}${srcToken?.symbol}`
                                    : `${t('{#本次最大跨链数量为#}')}${ baseNumberFormat(deposit.depositMax, { digits: 6, fill: false })}${srcToken?.symbol}`
                                )
                                : tx?.message || t('{#流动性不足，无法交易#}')}
                        </div>
                    }
                    { isSwap ? <SwapFeeCard onExpandToggle={setExpand}
                                           isShow={isValid}
                                           srcToken={srcToken}
                                           destToken={destToken}
                                           srcAddress={srcAddress}
                                           destAddress={destAddress}
                                           srcAmount={srcAmount}
                                           destAmount={destAmount}
                                           feeTokens={feeTokens}
                                           feeToken={feeToken}
                                           onFeeTokenUpdate={(v) => {
                                               setFeeToken(v);
                                               setRefreshArr([refreshArr[0], refreshArr[1], refreshArr[2] + 1])
                                           }}
                                           quoteType={quoteType}
                                           onDestAmountUpdate={setDestAmount}
                                           onSrcAmountUpdate={setSrcAmount}
                                           refresh={refresh}
                                           updateTxInit={setInitFunc}
                                           updateTx={setTx}
                    /> : <BridgeFeeCard srcToken={srcToken}
                                        isShow={isValid}
                                        destToken={destToken}
                                        srcAddress={srcAddress}
                                        destAddress={destAddress}
                                        feeTokens={feeTokens}
                                        feeToken={feeToken}
                                        onFeeTokenUpdate={(v) => {
                                            setFeeToken(v);
                                            setRefreshArr([refreshArr[0], refreshArr[1], refreshArr[2] + 1])
                                        }}
                                        srcAmount={srcAmount}
                                        onDestAmountUpdate={setDestAmount}
                                        refresh={ refresh }
                                        updateTxInit={ setInitFunc }
                                        setValid={(v) => {
                                            if (srcToken?.chainId !== destToken?.chainId) {
                                                setIsValid(v);
                                            }
                                        }}
                                        updateCrossInfo={ v => {
                                            setCrossInfo(v);
                                            setDeposit({
                                                depositMin: v.depositMin ? formatUnits(BigInt(v.depositMin), Number(srcToken?.decimals)) : deposit.depositMin,
                                                depositMax: v.depositMax ? formatUnits(BigInt(v.depositMax), Number(srcToken?.decimals)) : deposit.depositMax,
                                            })
                                        } }
                                        updateTx={setTx}
                    />}
                    { srcAddress && <div className={`mt-3 mo:mt-2 bg-vs-content rounded-lg mo:text-xs`}>
                        <div className="w-full flex py-5 items-center justify-between px-4 ">
                            <div className="flex-1 flex items-center">
                                <Image className="w-7 h-7 mr-2 rounded-full" alt={''} src={ isContract ? vaultIcon : walletIcon}/>
                                { addressSens(srcAddress) }
                            </div>
                            <i className={`iconfont vc-to px-4`}></i>
                            <div className="flex-1 flex items-center justify-between cursor-pointer"
                                 onClick={() => setShowAddressEdit(true)}>
                                <Image className="w-7 h-7 mr-2 rounded-full" alt={''} src={walletIcon}/>
                                <span className={`flex-1`}>
                                    { destAddress ? addressSens(destAddress) : t('{#请输入钱包#}')}
                                </span>
                                <i className={`iconfont vc-edit`}/>
                            </div>
                        </div>
                    </div>}
                    {getButtonLabel}
                </div>
            </div>
            <TokenSelectModal allPath={allPath}
                              srcToken={srcToken}
                              destToken={destToken}
                              type={tokenSelectType}
                              wallet={srcAddress}
                              isOpen={showTokenSelect}
                              onClose={() => setShowTokenSelect(false)}
                              updateDefaultToken={ (v) => {
                                  setSrcToken(v.srcToken);
                                  setDestToken(v.destToken);
                              }}
                              onTokenSelect={async (token) => {
                                  if (tokenSelectType === 'src') {
                                      if (destToken) {
                                          const verifyPath = await isValidPath(token, destToken, allPath);
                                          setIsValid(verifyPath);
                                          if (verifyPath && token.address === destToken?.address && token.chainId === destToken?.chainId) {
                                              setDestToken(srcToken);
                                          }
                                          if (!verifyPath) {
                                              setDestToken(undefined);
                                          }
                                      }
                                      setSrcToken(token);
                                      setRefreshArr([refreshArr[0] + 1, refreshArr[1], refreshArr[2]]);
                                  } else {
                                      const verifyPath = await isValidPath(srcToken, token, allPath);
                                      
                                      setIsValid(verifyPath);
                                      if (token.address === srcToken?.address && token.chainId === srcToken?.chainId && destToken) {
                                          setSrcToken(destToken);
                                          setRefreshArr([refreshArr[0] + 1, refreshArr[1]]);
                                      }
                                      setDestToken(token);
                                  }
                                  setDestAmount('');
                                  setQuoteType(0);
                                  setShowTokenSelect(false);
                              }}/>
            <AddressEditModal initAddress={destAddress || ''}
                              destToken={ destToken }
                              isOpen={showAddressEdit}
                              onClose={() => setShowAddressEdit(false)}
                              onSubmit={(address) => {
                                  setHasEdit(true);
                                  setDestAddress(address as any)
                                  setShowAddressEdit(false);
                              }}/>
            <VsMaxTips gas={needFee ? `${ baseNumberFormat(formatUnits(needFee, Number(srcToken?.decimals)), { digits: 6, fill: false })}${srcToken?.symbol}` : ''}
                       isOpen={showMaxTips}
                       onCancel={() => {
                           setShowMaxTips(false);
                           setSrcAmount('');
                       }}
                       onChange={(b) => {
                           const {total} = toSetMaxTransValue();
                           setSrcAmount(formatUnits(total, Number(srcToken?.decimals)));
                           setShowMaxTips(false);
                       }}/>
        </div>
    </>

}

PageSwapAndBridge.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <DefaultLayout>
                {page}
            </DefaultLayout>
        </>
    )
}
export default PageSwapAndBridge;

const PageKeys: string[] = [
    ...PagesLangJeSwapBridgeTsx,
    ...ComponentsSwapFeatureInfoTsx,
    ...ComponentsModalAddressEditTsx,
    ...ComponentsModalGastokenModalTsx,
    ...ComponentsBridgeFeeTsx,
    ...ComponentsSwapFeeTsx,
    ...ComponentsSlipPointTsx,
    ...ComponentsMaxTipsTsx,
];
export const getStaticPaths: GetStaticPaths = defaultGetStaticPaths;
export const getStaticProps: GetStaticProps<LangProps> = defaultGetStaticProps(
    PageKeys,
    {
        node:
            {fs, path},
        mds: []
    });



