import { ServiceTokenTokenFeeTokenResponse } from "@/_yapi";
import {getChainInfoByChainId} from "@/config/project.config";
import { Avatar, Badge, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {FC, useContext } from "react";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import {formatUnits} from "viem";
import {baseNumberFormat} from "@/_utils/number";

type GasTokenModalProps = {
    feeTokens:ServiceTokenTokenFeeTokenResponse,
    feeToken?: ServiceTokenTokenFeeTokenResponse[0],
    isOpen: boolean,
    onClose: () => void,
    onTokenSelect: (tokenInfo: ServiceTokenTokenFeeTokenResponse['0']) => void,
}

const GasTokenModal: FC<GasTokenModalProps> = ({ isOpen, onClose, onTokenSelect, feeTokens, feeToken }) => {

    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);

    return <Modal isOpen={isOpen} onClose={onClose} className="min-h-[300px]">
        <ModalContent className="light text-black bg-white">
            {() => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{ t('{#选择矿工费代币#}')}</ModalHeader>
                    <ModalBody>
                        <div className={``}>
                            { feeTokens?.map((item, i) => (
                                <div className={`px-4 border border-gray-200 rounded-lg my-2 relative hover:border-vs-nav`}
                                             key={ `${item.address}_${i}_${item.chainId}` }>
                                    <div className={`h-full flex items-center w-fit absolute right-4 top-1/2 -translate-y-1/2`}>
                                        {  item.address === feeToken?.address ?
                                            <i className={`iconfont text-xl text-vs-nav vc-suc`}/> :
                                            <i className={`iconfont text-xl text-word-grey/20 vc-select`}/>}
                                    </div>
                                    <div className="flex gap-2 py-3 items-center cursor-pointer" onClick={ ()=>{
                                        onTokenSelect(item);
                                    }}>
                                        <Badge isOneChar isDot isInvisible={false} shape="circle" showOutline={false} variant='flat' className="bg-transparent"
                                            content={
                                            <Avatar className="w-[10px] h-[10px] flex-shrink-0"
                                                    radius="full"
                                                    src={ getChainInfoByChainId(item.chainId)?.icon } />}
                                               placement="bottom-right" size="sm"
                                        >
                                            <Avatar alt={item.symbol}
                                                className="flex-shrink-0" size="sm" name={item.symbol}
                                                src={item.logo}
                                            />
                                        </Badge>
                                        <div className="flex flex-col">
                                            <div className="text-small">{item.symbol}</div>
                                            <div className="text-tiny text-default-400">
                                                {/*{addressSens(item.address)}*/}
                                                { t('{#餘額#}') }: { baseNumberFormat(formatUnits(BigInt(item.balance), Number(item.decimals)), { digits:6, fill: false}) } { item.symbol }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}

export default GasTokenModal;