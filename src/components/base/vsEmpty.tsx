import {FC} from "react";
import icons from '@/styles/icon.module.css';

export const VsEmpty: FC<{  text: string  }> = ({ text }) => {
    return <div className={`w-full min-h-[200px] flex items-center justify-center flex-col`}>
        <div className={`w-[132px] h-[132px] ${ icons.empty }`}></div>
        <div className={`text-word-grey text-sm`}>{ text }</div>
    </div>
}

export default VsEmpty;