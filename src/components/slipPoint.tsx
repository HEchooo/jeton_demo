import {DefaultSelectProps} from "@/types/global";
import {FC, useContext, useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import InputNumber from "@/components/base/vsInputNumber";

interface VsSlipPointProps extends DefaultSelectProps<string | number> {
    isOpen: boolean,
    isSwap: boolean,
}
const VsSlipPoint: FC<VsSlipPointProps> = ({value, onChange, isSwap, isOpen}) => {

    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);
    const [selectType, setSelectType] = useState<number>(0);
    const [inputValue, setInputValue] = useState<number>();
    useEffect(() => {
        if (selectType === 0) {
            setInputValue(undefined );
        }
    }, [selectType]);

    useEffect(() => {
        setSelectType(value && Number(value) === 1 ? 0 : 1);
    }, [value]);

    return <>
        <Modal
            className={`w-[454px] mo:w-screen`}
            isOpen={isOpen}
            onOpenChange={() => onChange('') }>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{ t('{#设置滑点#}') }</ModalHeader>
                        <ModalBody>
                            <div className={`flex justify-between p-4 mo:p-3 items-center cursor-pointer rounded-xl mo:rounded-lg border border-gray-200 hover:border-vs-nav`}  onClick={ () => {
                                setSelectType(0);
                            } }>
                                <div className={`flex items-center`}>
                                    <i className={`iconfont text-xl mr-1 ${ selectType === 0 ? 'text-vs-nav vc-suc' : 'text-gray-200 vc-select' }`}></i>
                                    <span className={`mo:text-sm`}>{ t('{#默认#}') }</span>
                                </div>
                                <div>
                                    1 %
                                </div>
                            </div>
                            <div className={`flex justify-between p-4 mo:p-3 rounded-xl mo:rounded-lg border border-gray-200 hover:border-vs-nav`}>
                                <div className={`cursor-pointer flex items-center`} onClick={ () => setSelectType(1) }>
                                    <i className={`iconfont text-xl mr-1 ${ selectType === 1 ? 'text-vs-nav vc-suc' : 'text-gray-200 vc-select' }`}></i>
                                    <span className={`mr-1 mo:text-sm`}>{ t('{#自定义#}') }</span>
                                    <span className={ `whitespace-nowrap bg-gray-300 text-xs rounded px-1 py-0.5` }>{ isSwap ? t('{#單鏈#}') : t('{#跨链#}')  }</span>
                                </div>
                                <div className={`flex justify-end items-center`}>
                                    <div className={`mr-1`}>
                                        <InputNumber
                                            min={ 0.3 }
                                            max={ 100 }
                                            placeholder={ `0.3~100` }
                                            value={ inputValue }
                                            onChange={ (val) => {
                                                setInputValue(Number(val));
                                                setSelectType(val ? 1 : 0);
                                            }}
                                        />
                                    </div>
                                    %
                                </div>
                            </div>
                            <div className={`pb-4`}>
                                <Button className={`w-full bg-vs-nav h-12 mo:h-10 disabled:bg-vs-nav/80`}
                                        color={`primary`}
                                        disabled={ selectType === 1 && !inputValue }
                                        onClick={ () => {
                                    if (selectType === 0) {
                                        onChange(1);
                                    }
                                    if (selectType === 1) {
                                        onChange(Number(inputValue));
                                    }
                                    onClose();
                                }}>{ t('{#確認#}') }</Button>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}

export default VsSlipPoint;