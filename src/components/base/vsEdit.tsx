import {FC, useContext, useEffect, useRef, useState} from "react";
import {DefaultSelectProps} from "@/types/global";
import ContentEditable from "react-contenteditable";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import styles from '@/styles/edit.module.css';
import {useDebounceFn} from "ahooks";
import {Button, Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";
import CsvReader from "@/components/base/csvReader";

interface VsEditProps extends DefaultSelectProps<string[]> {
    title: string,
    placeholder?: string,
    value?: string[],
    errors?: number[],
    demoUrl?: string
}

const CsvFormatToHtml = (arr: string | string[], errors?: any[]) => {
    if (Array.isArray(arr)) {
        if (arr.length) {
            const newArr = arr.map((v, i) => {
                if (errors && errors.includes(i)) {
                    return `<li class="text-red-500">${v}</li>`;
                }
                return `<li>${v}</li>`
            });
            return `<ol>${newArr.join("")}</ol>`;
        }
    }
    return  '';
}

const htmlReg = new RegExp('<[^>]*>', "g");
const divReg = new RegExp('<div[^>]*>', "g");
const spanReg = new RegExp('<span[^>]*>', "g");
const liReg = new RegExp('<li[^>]*>', "g");
const getCsvResult = (vs: string): string[] => {
    const s = vs
        .replace(spanReg, "")
        .replace(divReg, "|")
        .replace(liReg, "|")
        .replace(htmlReg, "")
        .replace(/\s/g,'');
    const a = s.split("|");
    const len = a.length;
    return a.filter((v, i) => len - 1 === i || v);
}
const VsEdit: FC<VsEditProps> = ({ title, value, errors, demoUrl, onChange, placeholder }) => {

    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);
    const csvWrite = useRef<HTMLDivElement>(null);
    const [checking, setChecking] = useState<boolean>(false);
    const [showHtml, setShowHtml] = useState<string>('');
    const [showFileRead, setShowFileRead] = useState<boolean>(false);

    const { run: formatEditorValue } = useDebounceFn(async (str: string) => {
        if (str) {
            let info = getCsvResult(str);
            onChange(info);
            setShowHtml(CsvFormatToHtml(info));
        } else {
            setShowHtml('');
        }
        setChecking(false);
    }, { wait: 500 });

    useEffect(() => {
        if (value?.length) {
            setShowHtml(CsvFormatToHtml(value, errors));
        } else {
            setShowHtml('');
        }
    }, [value, errors]);

    return <div>
        <div className={`pt-3 text-lg font-semibold flex items-center justify-between`}>
            <span>{ title }</span>
            <div className={`flex items-center`}>
                <Button
                    className={`h-8 bg-vs-nav text-white`}
                    onClick={ () => {
                        setShowFileRead(true);
                    }}
                >{ t('{#上傳文件#}') }</Button>
            </div>
        </div>
        <div className={'bg-white rounded-xl my-3 z-0'}>
            {
                //@ts-ignore
                <ContentEditable placeholder={placeholder}
                                 className={styles.content_editable}
                                 html={ showHtml }
                                 innerRef={csvWrite}
                                 disabled={checking}
                                 onBlur={ () => {} }
                                 onChange={(e) => {
                                     formatEditorValue(e.target.value);
                                 }}></ContentEditable>
            }
        </div>
        <Modal isOpen={ showFileRead } onOpenChange={ () => setShowFileRead(false)}>
            <ModalContent>
                <ModalHeader className={`text-sm text-center`}>
                    <div className={`text-center text-base w-full`}>
                        { t('{#上傳文件#}') }
                    </div>
                </ModalHeader>
                <ModalBody>
                    <>
                        <div className={`text-right`}>
                            <a className={`underline text-primary`} target={'_blank'} href={ demoUrl }>{ t('{#下载模板#}') }</a>
                        </div>
                        <CsvReader onChange={ (e) => {
                            const info = (e || []).filter((_: any,i: number) => i > 0).map((v: string[] ) => v.filter(u => u).join('#'));
                            const baseInfo = [...getCsvResult(showHtml), ...info].filter(v => v);
                            onChange(baseInfo);
                            setShowFileRead(false);
                        }}/>
                    </>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
}

export default VsEdit;