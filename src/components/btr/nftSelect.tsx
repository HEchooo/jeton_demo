import {DefaultSelectProps} from "@/types/global";
import {FC, useContext, useEffect, useState} from "react";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import {Input, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {useAsyncEffect, useRequest} from "ahooks";
import {serviceTokenTokenNft, ServiceTokenTokenNftResponse} from "@/_yapi";
import {useAccount, useChainId} from "wagmi";
import Image from 'next/image';
import {NftSelectInfo} from "@/types/nft";
import {addressSens} from "@/_utils/web3";
import VsEmpty from "@/components/base/vsEmpty";

const VsNftSelect: FC<DefaultSelectProps<ServiceTokenTokenNftResponse[0]>> = ({ value, onChange }) => {
    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchWord, setSearchWord] = useState<string>('');
    const [nftList, setNftList] = useState<ServiceTokenTokenNftResponse>();
    const [showList, setShowList] = useState<ServiceTokenTokenNftResponse>([]);
    const [nftObj, setNftObj] = useState<Record<string, any>>();
    const chainId = useChainId();
    const { address } = useAccount();

    const api = {
        nftList: useRequest(serviceTokenTokenNft, { manual: true })
    }

    useAsyncEffect(async () => {
        if (address && chainId) {
            const list = await api.nftList.runAsync({ chainId: `${chainId}`, wallet: address });
            const arr = [...list];
            const newNftList: NftSelectInfo[] = [];
            arr.forEach(v => {
                const tokenIds = arr.filter(k => k.address === v.address);
                if (tokenIds && !newNftList.some(m => m.address === v.address)) {
                    newNftList.push({
                        ...v,
                        tokenIds
                    })
                }
            });
            setNftList(newNftList);
        }
    }, [address, chainId]);

    useEffect(() => {
        if(nftList?.length) {
            if (searchWord) {
                setShowList(nftList.filter(v => v.name.indexOf(searchWord) > -1 || v.address.toLowerCase().indexOf(searchWord.toLowerCase()) > -1));
            } else {
                setShowList(nftList);
            }
        }
    }, [searchWord, nftList]);

    useEffect(() => {
        if (value) {
            setNftObj(value);
        }
    }, [value])

    return <div>
        <div className={`text-lg font-semibold pt-3`}>{t('{#選擇藏品#}')}</div>
        <div className={`py-3`}  onClick={ () => setIsOpen(true) }>
            { nftObj ?
                <div className={`flex items-center p-3 rounded-lg bg-white border border-gray-200 cursor-pointer`}>
                    <div className={`w-10 h-10 rounded-lg overflow-hidden mr-4`}>
                        <Image className={`w-full h-full`} src={nftObj.imageUrl} alt={''} width={0} height={0}></Image>
                    </div>
                    <div className={`flex-1`}>
                        <h3 className={`font-semibold`}>{ nftObj.name }</h3>
                        <p className={`text-sm text-word-grey underline`}>{ addressSens(nftObj?.address) }</p>
                    </div>
                </div>
                : <Input placeholder={t('{#選擇NFT#}')}
                                onChange={console.log}
                                disabled
                                endContent={ <i className={`iconfont vc-more`} onClick={ () => setIsOpen(true) }></i> }
            /> }
        </div>
        <Modal isOpen={isOpen} onOpenChange={ () => setIsOpen(false)}>
            <ModalContent>
                <ModalHeader>
                    <div className={`text-center text-base w-full`}>
                        {t('{#選擇藏品#}')}
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <Input size="sm" startContent={<i className={`iconfont vc-search`}></i>} onChange={(e) => {
                                setSearchWord(e.target.value);
                            }} />
                        </div>
                        <div className={`h-[300px] overflow-y-auto pt-4`}>
                            { showList?.length ?
                                showList.map((v,i) => {
                                    return <div key={`nftList_${i}`} className={`p-3 border rounded-lg cursor-pointer my-3 relative flex items-center justify-between`} onClick={ (e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setNftObj(v);
                                        setIsOpen(false);
                                        onChange(v);
                                    } }>
                                        <i className={`absolute right-3 text-lg top-1/2 -translate-y-1/2 iconfont ${ nftObj?.address !== v.address ? 'vc-select text-gray-400' : 'vc-suc text-primary'  }`}></i>
                                        <div className={`w-10 h-10 rounded-lg overflow-hidden mr-4`}>
                                            <Image className={`w-full h-full`} src={v.imageUrl} alt={''} width={0} height={0}></Image>
                                        </div>
                                        <div className={`flex-1`}>
                                            <h3>{ v.name }</h3>
                                            <p className={`text-sm text-word-grey underline`}>{ addressSens(v.address)}</p>
                                        </div>
                                    </div>
                                }) : <VsEmpty text={t('{#暂无NFT#}')}/>
                            }
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
}

export default VsNftSelect;