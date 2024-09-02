import {  Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {FC, useContext, useEffect, useState} from "react";
import { isAddress } from "viem";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import {isTrxAddress} from "@/_utils/tron";

type AddressEditProps = {
    initAddress:string,
    isOpen: boolean,
    onClose: () => void,
    destToken?: TokenInfo,
    onSubmit: (token: string) => void,
}

const AddressEditModal: FC<AddressEditProps> = ({ initAddress, isOpen, destToken, onClose, onSubmit }) => {

    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);
    const [address, setAddress] = useState('');
    const [isError,setIsError]=useState(false);

    useEffect(() => {
        if (isOpen) {
           setAddress(initAddress);
           setIsError(false);
        }
    }, [isOpen,initAddress])
    
    return <Modal isOpen={isOpen} onClose={onClose} >
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col gap-1">{ t('{#編輯收款錢包#}') }</ModalHeader>
                    <ModalBody className="flex items-center justify-center">
                        <Input onFocus={ ()=> setIsError(false)}
                               isInvalid={ isError }
                               placeholder={ t('{#请输入钱包地址#}') }
                               errorMessage={ isError? t("{#地址格式不正确#}"):'' }
                               value={address}
                               onValueChange={setAddress}
                               isClearable
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={ onClose }>
                            { t('{#取消#}') }
                        </Button>
                        <Button color="primary" variant="light" onPress={()=>{
                            if(isAddress(address) || (destToken?.chainId === 728126428 && isTrxAddress(address))){
                                onSubmit(address);
                            }else{
                                setIsError(true);
                            }
                        }}>
                            { t('{#保存#}') }
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
}

export default AddressEditModal;