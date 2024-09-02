import {FC, ReactNode} from "react";
import ani from '@/styles/ani.module.css';

const VsLoading: FC<{ loading?: boolean, className?: string, children: ReactNode }> = ({ loading = false, className = 'w-14', children }) => {
    return loading ? <div className={`min-w-[50px] ${className} h-full rounded min-h-6 bg-gray-200 ${ ani.vs_loading }`}></div> : children
}

export default VsLoading;