import {FC, ReactNode, useEffect, useRef, useState} from "react";
import {useDebounceFn} from "ahooks";

const VsRoll: FC<{
    children: ReactNode,
    speed?: number,
    started?: number,
    className?: string,
    scrollW?: number,
    toRight?: boolean,
}> = ({ children, speed = 3, started = 0, className= '', scrollW, toRight }) => {

    const [scrollX, setScrollX] = useState<number>(started);
    const [scrolling, setScrolling] = useState<boolean>(true);
    const [needScroll, setNeedScroll] = useState<boolean>(false);
    const RollDiv = useRef<HTMLDivElement>(null!);
    const BaseDiv = useRef<HTMLDivElement>(null!);

    const { run: play } = useDebounceFn(() => {
        try {
            const docWidth = scrollW ? Math.min(scrollW, document.body.clientWidth) : document.body.clientWidth;
            const width = BaseDiv?.current?.clientWidth;
            if (needScroll) {
                const isNeed = width > docWidth;
                setNeedScroll(isNeed);
                if (!isNeed) {
                    setScrollX(0);
                }
                return;
            }
            if (width > docWidth) {
                setNeedScroll(true);
            }
        } catch (e) {
            console.log(e);
        }
    }, { wait: 500 })

    useEffect(() => {
        window.addEventListener('resize', play);
        if (!needScroll) {
            play();
        }
        return () => {
            window.removeEventListener('resize', () => {});
        }
    }, [needScroll]);

    useEffect(() => {
        if (!needScroll || !scrolling) {
            return ;
        }
        const width = RollDiv.current.clientWidth;
        const run = setTimeout(() => {
            const toScroll = toRight ? scrollX + speed : scrollX - speed;
            setScrollX(Math.abs(toScroll) > width/2 ? started : toScroll);
        }, 20);
        return () => {
            clearTimeout(run);
        }
    }, [needScroll, scrollX, scrolling]);

    return <div className={`relative z-[1] w-full h-full m-auto overflow-hidden`}>
        <div className={`flex items-center m-auto justify-between w-fit ${ needScroll ? 'invisible' : '' } ${className}`}
             ref={ BaseDiv }>
            { children }
        </div>
        { needScroll && <div className={`absolute w-fit ${ toRight ? 'right-0' : 'left-0' } top-0 flex items-center justify-between ${className}`}
                             ref={ RollDiv }
                             onMouseEnter={ () => setScrolling(false) }
                             onMouseLeave={ () => setScrolling(true) }
                             onTouchStart={ () => setScrolling(false) }
                             onTouchEnd={ () => setScrolling(true) }
                             style={{ transform:`translateX(${scrollX}px)` }} >
            { children }
            { children }
        </div> }
    </div>
}

export default VsRoll;