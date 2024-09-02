import {FC, useContext, useEffect, useRef, useState} from "react";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import {parse} from "papaparse";

const CsvReader: FC<{ onChange: (v: any) => void }> = ({ onChange }) => {
    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);
    const uploadRef = useRef<HTMLDivElement>(null!);
    const [borderColor, setBorderColor] = useState<boolean>(false);

    const handleEvent = (e: any) => {
        e.preventDefault?.();
        e.stopPropagation?.();
        if (e.type === 'drop') {
            for (let file of e?.dataTransfer.files) {
                const fileReader = new FileReader();
                fileReader.readAsText(file, 'UTF-8');
                fileReader.onload = (event) => {
                    //@ts-ignore
                    const csvData = () => parse(fileReader.result as string, Object.assign({}, { error: () => {}, encoding: 'UTF8',}));
                    //@ts-ignore
                    onChange((csvData()?.data || []) as string[][]);
                    //@ts-ignore
                    console.log(csvData()?.data)
                }
            }
            setBorderColor(false);
        } else if (e.type === 'dragleave') {
            setBorderColor(false);
        } else {
            setBorderColor(true);
        }
    }

    useEffect(() => {
        if (!uploadRef?.current) {
            return;
        }
        uploadRef.current.addEventListener("dragenter", handleEvent);
        uploadRef.current.addEventListener("dragover", handleEvent);
        uploadRef.current.addEventListener("drop", handleEvent);
        uploadRef.current.addEventListener("dragleave", handleEvent);
        uploadRef.current.addEventListener('mouseenter', console.log);
        return () => {
            uploadRef.current?.removeEventListener("dragenter", handleEvent);
            uploadRef.current?.removeEventListener("dragover", handleEvent);
            uploadRef.current?.removeEventListener("drop", handleEvent);
            uploadRef.current?.removeEventListener("dragleave", handleEvent);
            uploadRef.current?.removeEventListener('mouseenter', console.log);
        }
    }, [uploadRef?.current]);

    return <div ref={uploadRef} className={`w-full flex flex-col items-center text-center cursor-pointer justify-center h-32 border ${ borderColor ? 'border-danger' : 'border-vs-nav/20' } rounded-xl mb-4`}>
        <label className={`cursor-pointer`} htmlFor={`file-upload`}>
            <div className={`text-3xl pt-4`}>
                +
            </div>
            <div className={`text-sm font-semibold`}>
                { t('{#請將文件拖至此處/點擊上傳#}') }
            </div>
            <div className={`text-word-grey text-sm mo:text-xs`}>
                { t('{#僅支持.CSV格式文件#}') }
            </div>
        </label>
        <div className={`invisible`}>
            <input type={`file`} name={'file-upload'} id={`file-upload`} accept=".csv" onChange={(e) => {
                handleEvent({
                    ...e,
                    type: 'drop',
                    dataTransfer: {
                        files: e.target.files
                    }
                });
            }}/>
        </div>
    </div>
}

export default CsvReader;