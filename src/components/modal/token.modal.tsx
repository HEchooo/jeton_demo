import {addressSens} from "@/_utils/web3";
import {
    ServiceSwapCrossChainListResponse,
    serviceSwapSwapSearch,
    serviceTokenTokenGetByAddress
} from "@/_yapi";
import {
    getChainInfoByChainId,
    SupportedChains,
    SupportedCrossChains,
} from "@/config/project.config";
import useDebounce from "@/hooks/useDebounce";
import {
    Avatar,
    Badge,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader
} from "@nextui-org/react";
import {FC, useContext, useEffect, useState} from "react";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import {zeroAddress} from "viem";
import VsEmpty from "@/components/base/vsEmpty";
import {useAsyncEffect} from "ahooks";

type TokenSelectModalProps = {
    type?: string,
    isOpen: boolean,
    wallet?: string,
    chainId?: number,
    srcToken?: TokenInfo,
    destToken?: TokenInfo,
    allPath: ServiceSwapCrossChainListResponse,
    onClose: () => void,
    onTokenSelect: (tokenInfo: TokenInfo) => void,
    updateDefaultToken: (v: { srcToken: TokenInfo, destToken: TokenInfo }) => void
}

const UnSupportedSwapChains = [534352, 728126428];
const TokenSelectModal: FC<TokenSelectModalProps> = ({
                                                         srcToken,
                                                         destToken,
                                                         type = 'src',
                                                         isOpen,
                                                         onClose,
                                                         wallet,
                                                         onTokenSelect,
                                                         allPath,
                                                         updateDefaultToken
                                                     }) => {
    const {langs} = useContext(TransContext);
    const {t} = useTrans(langs);
    const [chainId, setChainId] = useState(0);  //src chain id
    const [destChainIdLocal, setDestChainIdLocal] = useState(1) //dest chain id
    const [searchText, setSearchText] = useState('');
    const dSearchText = useDebounce(searchText, 100, [searchText]);
    const [selectedToken, setSelectedToken] = useState<TokenInfo>();
    const [srcTokenCache, setSrcTokenCache] = useState<Record<string, TokenInfo[]>>({});
    const [destTokenCache, setDestTokenCache] = useState<Record<string, TokenInfo[]>>({});
    const [tokenList, setTokenList] = useState<TokenInfo[]>([]);
    const [availableChainIds, setAvailableChainIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showAllChain, setShowAllChain] = useState<boolean>(false);
    const [chainList, setChainList] = useState<typeof SupportedChains>([]);
    const [showChains, setShowChains] = useState<typeof SupportedChains>([]);
    const [canCrossIds, setCanCrossIds] = useState<number[]>([]);
    const [destChain, setDestChain] = useState<typeof SupportedChains[0]>();
    const [crossTokens, setCrossTokens] = useState<string[]>([]);

    useEffect(() => {
        if (type === 'dest') {
            setChainId(srcToken?.chainId || 1);
            const swapChainId = srcToken?.chainId && UnSupportedSwapChains.includes(srcToken?.chainId) ? [] : [srcToken?.chainId || 1]
            setAvailableChainIds([
                ...swapChainId,
                ...allPath.filter(it => Number(it.srcChainId) === srcToken?.chainId
                ).map(it => Number(it.destChainId))
            ]);
            setCanCrossIds([]);
        } else {
            setAvailableChainIds(SupportedChains.map(it => it.id));
            setCanCrossIds([
                ...allPath.filter(it => Number(it.destChainId) === destToken?.chainId)
                    .map(it => Number(it.srcChainId))
            ]);
        }
    }, [type, srcToken, destToken, allPath]);

    useEffect(() => {
        if (!isOpen) {
            setSearchText('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            if (type === 'src') {
                setSelectedToken(srcToken);
                setChainId(srcToken?.chainId || 0);
            }
            if (type === 'dest') {
                setSelectedToken(destToken);
                setDestChainIdLocal(destToken?.chainId || 1)
                // setChainId(destToken?.chainId || srcToken?.chainId || 0);
            }
        }
    }, [srcToken, destToken, isOpen, type]);

    useEffect(() => {
        if (tokenList?.length > 1 && !srcToken?.price && !destToken?.price) {
            updateDefaultToken({
                srcToken: tokenList[0],
                destToken: tokenList[1],
            });
        }
    }, [tokenList, srcToken, destToken]);

    useEffect(() => {
        if (destToken) {
            const chainInfo = getChainInfoByChainId(destToken?.chainId);
            setDestChain(chainInfo as any);
        } else {
            setDestChain(undefined);
        }
    }, [destToken])

    useAsyncEffect(async () => {
        if (isOpen) {
            setIsLoading(true);
            try {
                if (type === 'src') {
                    const tokens = !dSearchText && srcTokenCache[`src_${chainId}`] || await serviceSwapSwapSearch({
                        chainId: chainId ? `${chainId}` : '',
                        searchText: dSearchText || '',
                        wallet: wallet || ""
                    });
                    
                    setTokenList(tokens || []);
                    const bt = (allPath || []).filter(v =>
                        Number(destToken?.chainId) === Number(v.destChainId)
                        && v.destTokenAddress.toLowerCase() === destToken?.address.toLowerCase()
                    );
                    setCrossTokens(bt.map(v => v.srcTokenAddress.toLowerCase()));
                    setSrcTokenCache({
                        ...srcTokenCache,
                        [`src_${chainId}`]: tokens || []
                    });
                }
                if (type === 'dest') {
                    const getTokenList = async () => {
                        // const crossTokens = (allPath || []).filter(it =>
                        //     (destChainIdLocal === 0 || Number(it.destChainId) === destChainIdLocal)
                        // );
                        const tokens = !dSearchText && destTokenCache[`dest_${destChainIdLocal}`]|| await serviceSwapSwapSearch({
                          chainId: destChainIdLocal ? `${destChainIdLocal}` : '',
                          searchText: dSearchText || '',
                          wallet: wallet || ""
                        });
                        
                        const bridgeTokens = tokens?.length ? await serviceTokenTokenGetByAddress({
                            addresses: Array.from(new Set(tokens.map(it => it.address))).join(','),
                            chainId: destChainIdLocal === 0 ? undefined : `${destChainIdLocal}`,
                            wallet: wallet || ''
                        }) : [];
                        const key = (dSearchText || '').toLowerCase();

                        const bt = (bridgeTokens || [])
                            .filter(v => v)
                            .filter(v => destChainIdLocal ? v.chainId === destChainIdLocal : v)
                            .filter(v => key ? v.symbol.toLowerCase().includes(key) || v.address.toLowerCase().includes(key) : v);

                        const swapTokens = srcToken?.chainId && UnSupportedSwapChains.includes(srcToken?.chainId) || destChainIdLocal !== srcToken?.chainId
                            ? []
                            : await serviceSwapSwapSearch({
                                chainId: `${srcToken?.chainId}`,
                                searchText: dSearchText || '',
                                wallet: wallet || ""
                            });
                        return [
                            ...swapTokens,
                            ...bt.filter(u => !swapTokens.map(v => v.address).includes(u.address))
                        ];
                    }
                    const list = !dSearchText && destTokenCache[`dest_${srcToken?.chainId}_${destChainIdLocal}`] || await getTokenList();
                    setTokenList(list.filter(v => destToken ? v : !(srcToken?.chainId === v.chainId && srcToken?.address === v.address)));
                    setDestTokenCache({
                        ...destTokenCache,
                        [`dest_${srcToken?.chainId}_${destChainIdLocal}`]: list
                    });
                }
            } catch (e) {
                console.log(e)
                setTokenList([]);
            } finally {
                setIsLoading(false);
            }
        }
    }, [type, dSearchText, chainId, wallet, srcToken, destToken, allPath, destChainIdLocal]);

    useEffect(() => {
        const allChains = type === 'dest' ? [...SupportedChains, ...SupportedCrossChains] : SupportedChains;
        
        const newSupportChains = allChains.map((v, i) => {
            const isValid = availableChainIds.includes(v.id);
            return {
                ...v,
                sort: chainId === v.id ? 999 : isValid ? 888 - i : v.sort,
                isValid: isValid
            }
        });
        
        setChainList(newSupportChains.sort((a, b) => b.sort - a.sort) as typeof SupportedChains);
        const newShowChains = allChains.map((v, i) => {
            const isValid = availableChainIds.includes(v.id);
            return {
                ...v,
                sort: chainId === v.id && i > 5 ? 999 : isValid ? 888 - i : v.sort,
                isValid: isValid
            }
        }).sort((a, b) => b.sort - a.sort).filter((v, i) => i < 6);
        setShowChains(newShowChains as typeof SupportedChains);
    }, [
        chainId,
        destChainIdLocal,
        availableChainIds,
        type
    ]);

    return <>
        <Modal isOpen={isOpen} onClose={onClose} className="min-h-[600px] px-0">
            <ModalContent className="light text-black bg-white">
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{t('{#选择币种#}')}</ModalHeader>
                        <ModalBody className={`px-0`}>
                            <div className={`px-6`}>
                                <Input value={searchText}
                                       onValueChange={(v) => {
                                           setSearchText(v);
                                       }}
                                       startContent={<i className={`iconfont vc-search`}></i>}
                                       isClearable
                                />
                            </div>
                            <div
                                className={`font-semibold px-6`}>
                                {t('{#选择网络#}')}: {getChainInfoByChainId(type === "src" ? chainId : destChainIdLocal)?.name}
                                {/* {type === 'src' && !!destToken?.chainId && !!chainId && chainId !== destToken?.chainId && !canCrossIds.includes(chainId) &&
                                    <div
                                        className={`text-xs pl-2 font-normal text-vs-red`}>({t('{#该链暂不支持与%c链跨链兑换#}').replace('%c', destChain?.name || '')})</div>} */}
                            </div>
                            <div key='chain_list_0' className="flex gap-3 items-center flex-wrap px-6">
                                <div
                                    className={`flex items-center h-10 cursor-pointer rounded justify-center px-2 mo:h-8 mo:text-xs ${chainId === 0 ? `border border-primary` : `border border-gray-200`}`}
                                    onClick={() => {
                                        setChainId(0);
                                    }}>{t('{#全部#}')}</div>
                                {
                                    showChains.map(it =>
                                        <Avatar key={it.id}
                                                className={`cursor-pointer w-8 h-8 mo:h-6 mo:w-6`}
                                                isBordered={it.id === (type === "src" ? chainId : destChainIdLocal)}
                                                color={it.id === (type === "src" ? chainId : destChainIdLocal) ? 'primary' : 'default'}
                                                size="sm"
                                                isDisabled={!it.isValid}
                                                src={it.icon}
                                                name={it.name}
                                                onClick={() => {
                                                    if (!it.isValid) {
                                                        return;
                                                    }
                                                    (type === "src" ? setChainId(it.id) : setDestChainIdLocal(it.id))
                                                }}
                                        />)

                                }
                                {
                                    <div
                                        className={`flex items-center h-10 rounded justify-center px-2 border border-gray-200 cursor-pointer mo:h-8 mo:text-xs mo:px-1`}
                                        onClick={() => setShowAllChain(true)}
                                    >{t('{#更多#}')}</div>
                                }
                            </div>
                            <div className={`font-semibold px-6`}>{t('{#选择币种#}')}</div>
                            <div className={`h-[360px] overflow-y-auto`}>
                                {isLoading ? <div className={`flex items-center justify-center min-h-[200px] py-4`}>
                                    <i className={`vc-loading w-8 h-8`}></i>
                                </div> : tokenList.length ?
                                    tokenList.map((item, i) => (
                                            <div key={`${item.chainId}_${item.address}_${i}`}
                                                 className={`relative cursor-pointer hover:bg-gray-100 px-6`}
                                                 onClick={() => {
                                                     setSelectedToken(item);
                                                     setTimeout(() => {
                                                         onTokenSelect(item);
                                                     }, 100);
                                                 }}
                                            >
                                                <div className={`absolute h-full flex items-center right-6 text-xl`}>
                                                    {
                                                        item.chainId === selectedToken?.chainId && item.address === selectedToken?.address ?
                                                            <i className={`iconfont text-primary vc-suc`}/> :
                                                            null
                                                    }
                                                </div>
                                                <div className="flex gap-2 items-center py-3">
                                                    <Badge isOneChar
                                                           isDot
                                                           isInvisible={false}
                                                           shape="circle"
                                                           showOutline={false}
                                                           variant='flat'
                                                           className="bg-transparent"
                                                           content={
                                                               !chainId ? <Avatar className="w-[10px] h-[10px] flex-shrink-0"
                                                                                  radius="full"
                                                                                  src={getChainInfoByChainId(item.chainId)?.icon}/>
                                                                   : null
                                                           }
                                                           placement="bottom-right"
                                                           size="sm"
                                                    >
                                                        <Avatar alt={item.symbol}
                                                                className="flex-shrink-0" size="sm" name={item.symbol}
                                                                src={item.logo}
                                                        />
                                                    </Badge>
                                                    <div className="flex flex-col">
                                                        <div className="text-small flex items-center">
                                                            <div
                                                                className={`max-w-[60px] whitespace-nowrap overflow-hidden text-ellipsis`}>{item.symbol}</div>
                                                            {item.isSpam && <span
                                                                className={`text-xs rounded ml-1 border border-vs-red text-vs-red`}>SPAM</span>}
                                                        </div>
                                                        <div className="text-tiny w-fit text-default-400 underline"
                                                             onClick={(e) => {
                                                                 e.preventDefault();
                                                                 e.stopPropagation();
                                                                 const url = getChainInfoByChainId(item.chainId)?.chain?.blockExplorers?.default?.url;
                                                                 window.open(item.address === zeroAddress ? url : `${url}/address/${item.address}`);
                                                             }}>
                                                            {item.address === zeroAddress ? getChainInfoByChainId(item.chainId)?.name : addressSens(item.address)}
                                                        </div>
                                                        {/* {type === 'src' && !!destToken && !!destToken?.chainId && item.chainId !== destToken?.chainId && !crossTokens.includes(item.address.toLowerCase()) &&
                                                            <div
                                                                className={`text-xs pt-1 text-vs-red`}>({t('{#不支持与%d链的%t跨链兑换#}').replace('%d', `${destChain?.name}`).replace('%t', `${destToken?.symbol}`)})</div>} */}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    : <VsEmpty text={t('{#未匹配到要交易的代幣#}')}/>
                                }
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
        <Modal isOpen={showAllChain} className={`min-h-[600px]`} onOpenChange={setShowAllChain}>
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader>
                        <div className={`flex items-center`}>
                            <div className={`rotate-180 cursor-pointer mr-2`}
                                 onClick={onClose}
                            ><i className={`iconfont vc-next`}></i></div>
                            {t('{#選擇網絡#}')}
                        </div>
                    </ModalHeader>
                    <ModalBody className={`px-0 max-h-[90vh] overflow-y-auto`}>
                        <div>
                            {
                                chainList.filter(v => v.isValid).map((it, i) =>
                                    <div key={`isValid_${it.id}_${i}`}
                                         className={`flex items-center justify-between py-4 px-6 cursor-pointer hover:bg-gray-100`}
                                         onClick={() => {
                                             type === "src" ? setChainId(it.id) : setDestChainIdLocal(it.id)
                                             setShowAllChain(false);
                                         }}
                                    >
                                        <Avatar
                                            className={`cursor-pointer w-8 h-8 mr-2`}
                                            size="sm"
                                            src={it.icon}
                                            name={it.name}
                                        />
                                        <div className={`flex-1 font-semibold`}>
                                            <div>{it.name}</div>
                                            {/* {
                                                type === 'src' && !!destToken && (type === "src" ? chainId : destChainIdLocal) !== destToken.chainId && !canCrossIds.includes(it.id) &&
                                                <div className={`text-xs font-normal text-vs-red`}>
                                                    ({t('{#暫不支持与 %d 的跨鏈#}').replace(
                                                    '%d',
                                                    `${destChain?.name}-${destToken?.symbol}`
                                                )})
                                                </div>
                                            } */}
                                        </div>
                                        <span>
                                                {(type === "src" ? chainId : destChainIdLocal) === it.id &&
                                                    <i className={`iconfont vc-suc text-xl text-primary`}></i>}
                                            </span>
                                    </div>
                                )
                            }
                            {/* {
                                !!chainList.filter(it => !it.isValid).length &&
                                <div className={`text-danger px-6 py-2 bg-danger-50 border-gray-200`}>
                                    {t('{#暂不支持 %c 到以下链的跨链#}').replace('%c', SupportedShowChains.filter(it => it.id === srcToken?.chainId)[0].name)}
                                </div>
                            } */}
                            {
                                chainList.filter(it => !it.isValid).map((it, i) =>
                                    <div key={`unValid${it.id}_${i}`}
                                         className={`flex items-center justify-between py-4 px-6 opacity-40 cursor-pointer hover:bg-gray-100`}
                                    >
                                        <Avatar
                                            className={`cursor-pointer w-8 h-8 mr-2`}
                                            size="sm"
                                            src={it.icon}
                                            name={it.name}
                                        />
                                        <span className={`flex-1 font-semibold`}>{it.name}</span>
                                        <span>
                                                {(type === "src" ? chainId : destChainIdLocal) === it.id &&
                                                    <i className={`iconfont vc-suc text-xl text-primary`}></i>}
                                            </span>
                                    </div>
                                )
                            }
                        </div>
                    </ModalBody>
                </>)}
            </ModalContent>
        </Modal>
    </>
}

export default TokenSelectModal;