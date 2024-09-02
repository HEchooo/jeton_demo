import {FC, ReactNode, useEffect, useState} from "react";
import styles from '@/styles/components.module.css';

interface VsCollapseProps {
    title: ReactNode,
    children: ReactNode,
    className?: string,
}

const VsCollapse: FC<VsCollapseProps> = ({
     title,
     children,
     className,
 }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return <div className={`rounded-xl w-full h-auto border border-transparent mb-4 ${className || ''} p-4 ${isOpen ? '' : 'bg-vsCollapse'}`}>
        <div className={`w-full flex justify-between`}
             onClick={() => {
                 setIsOpen(!isOpen);
             }}
        >
            <div className={`flex-1`}>{title}</div>
            <div className={`w-fit h-6 cursor-pointer ${styles.ani} ${ isOpen ? 'rotate-90' : 'rotate-0'  }`}>
                <i className={`iconfont vc-next`} />
            </div>
        </div>
        <div className={`overflow-hidden ${styles.gird} ${isOpen ? styles.gird_open : ''}`}>
            <div className={`w-full min-h-0`}>{ children }</div>
        </div>
    </div>
}

export default VsCollapse;