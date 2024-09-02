import {FC, useContext} from "react";
import VsRoll from "@/components/base/vsRoll";
import {TransContext, useTrans} from "@/_i18n/next.i18n";
import icons from '@/styles/icon.module.css';

const VsFeatureInfo: FC<any> = () => {

    const { langs } = useContext(TransContext);
    const { t } = useTrans(langs);

    const list = [
        { icon: 'ic_ai', name: '{#AI 智能路由#}', tips: '{#智能匹配最優的路徑#}' },
        { icon: 'ic_gas', name: '{#GasLess 交易#}', tips: '{#任意稳定币支付gas#}' },
        { icon: 'ic_fullnet', name: '{#全網絡支持#}', tips: '{#費用更低更便捷#}' },
    ]

    return <div className={`w-full bg-white/60`}>
        <div className={`max-w-[1920px] m-auto py-10 mo:py-5`}>
            <VsRoll speed={1}>
                <>
                    { list.map((v,i) => {
                        return <div key={`FeatureInfo_${i}`} className={`flex ${ i > 0 ? 'ml-[200px] mo:ml-8' : 'mo:ml-8' } items-center justify-center`}>
                            <div className={`w-[66px] h-[66px] mr-3 mo:mr-1 mo:w-[42px] mo:h-[42px] ${ icons[v.icon] }`} />
                            <div className={`whitespace-nowrap`}>
                                <h3 className={`text-2xl font-semibold mo:text-sm`}>{ t(v.name) }</h3>
                                <p className={`text-xl mo:text-xs`}>{ t(v.tips) }</p>
                            </div>
                        </div>
                    }) }
                </>
            </VsRoll>
        </div>
    </div>
}

export default VsFeatureInfo;