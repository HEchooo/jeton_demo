import {FC, useContext, useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {TransContext, useTrans} from "@/_i18n/next.i18n";


const VsMaxTips: FC<{
    gas: string,
    isOpen: boolean,
    onChange: (v: boolean) => void,
    onCancel: (v: boolean) => void
}> = ({isOpen, gas, onChange, onCancel}) => {

    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);
    const [isCache, setIsCache] = useState<boolean>(false);

    useEffect(() => {
        setIsCache(!!localStorage.getItem('Jeton_cache_max_tips'));
    }, [isOpen]);

    return <Modal isOpen={isOpen} onOpenChange={onCancel}>
        <ModalContent>
            {
                (close) => (<>
                        <ModalHeader>
                            {t('{#预留金额提醒#}')}
                        </ModalHeader>
                        <ModalBody className={`pb-5`}>
                            <div>
                                {t('{#為避免交易失敗，已在錢包中預留 %n 作為交易時的網路費用。 由於鏈上網路費用波動，每次預留金額不同。#}').replace('%n', gas || '')}
                            </div>
                            <div className={`flex items-center`}>
                                <i className={`iconfont mr-1 cursor-pointer text-xl ${isCache ? 'vc-suc text-primary' : 'vc-select text-gray-200'}`}
                                   onClick={() => {
                                       if (isCache) {
                                           localStorage.removeItem('Jeton_cache_max_tips');
                                       } else {
                                           localStorage.setItem('Jeton_cache_max_tips', '1');
                                       }
                                       setIsCache(!isCache);
                                   }}></i>
                                {t('{#下次不再提醒#}')}
                            </div>
                            <div className={`flex space-x-3 items-center`}>
                                <Button className={`flex-1 rounded-lg bg-white border border-primary text-primary`}
                                        onClick={
                                            () => onCancel(false)
                                        }
                                        color={'default'}>
                                    {t('{#取消#}')}
                                </Button>
                                <Button className={`flex-1 rounded-lg`} color={'primary'}
                                        onClick={
                                            () => onChange(true)
                                        }
                                >{t('{#我知道了#}')}</Button>
                            </div>
                        </ModalBody>
                    </>
                )
            }
        </ModalContent>
    </Modal>
}

export default VsMaxTips;