import {FC, ReactElement, useContext, useRef, useState} from "react";
import {ConnectButton} from "@sofent/rainbowkit";
import {getLangUrl, SupportedLangs, TransContext, useTrans} from "@/_i18n/next.i18n";
import Image from 'next/image';
import Link from "next/link";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import Cookies from "js-cookie";
import {usePathname, useRouter} from "next/navigation";
import {useEventListener} from "ahooks";
const DefaultLayout: FC<{ children: ReactElement }> = ({children}) => {

    const { langs, lang } = useContext(TransContext);
    const { t } = useTrans(langs);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [showMenus, setShowMenus] = useState<boolean>(false);
    const pathname = usePathname();

    const list = [
        { link: `/${lang}/je/swap-bridge/`, name: '{#Swap & Bridge#}' },
    ];

    const langChange = async (e: any, lg: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (lg === lang) {
            return;
        }
        sessionStorage.setItem('locale', lg === 'en-us' ? 'en' : 'zh');
        Cookies.set('lang', lg);
        const link = getLangUrl(
            window.location.href, lg).replace(
            `${window.location.protocol}//${window.location.host}`,
            ""
        );
        router.replace(link);
    }

    useEventListener('resize', () => {
        setShowMenus(false);
    }, { target: ref });



    return <main ref={ref} className={``}>
        <header className={`fixed left-0 top-0 w-screen h-20 bg-vs-nav mo:h-16 z-50`}>
            <div className={`max-w-[1920px] m-auto flex justify-between items-center py-5 px-10 bg-vs-nav text-white mo:py-3 mo:px-4`}>
                <div className={`flex items-center mr-16 pr-2 relative z-[889]`}>
                    <Link className={`mr-3`} href="/">
                        <Image className={`w-8 h-8`} width={0} height={0} src={`https://cdn.echooo.xyz/front-end/source/images/logo/jeton.svg`} alt={`Jeton Protocol`}></Image>
                    </Link>
                    <h1 className={`text-xl font-semibold`}>Jeton Protocol</h1>
                </div>
                <div className={`hidden mo:block`}>
                    <i className={`iconfont vc-menu text-2xl`} onClick={ () => setShowMenus(true) }></i>
                </div>
                <div className={`flex-1 flex items-center mo:bg-vs-nav mo:w-screen mo:z-[888] mo:h-screen mo:flex-col-reverse mo:items-start mo:absolute mo:left-0 mo:top-0 mo:pt-16 ${showMenus ? '' : 'mo:hidden'}`}>
                    <div className={`absolute right-4 top-3 hidden mo:block`}>
                        <i className={`iconfont text-2xl vc-close`} onClick={ () => setShowMenus(false) }></i>
                    </div>
                    <div className={`flex-1 flex mo:w-full mo:block mo:pt-4`}>
                        {
                            list.map((v,i) => {
                                return <div key={`Menu_${i}`} className={`mr-8 cursor-pointer mo:mr-0 mo:my-5 mo:px-4 ${ pathname === v.link ? 'text-white font-semibold mo:border-l-4 mo:border-white' : 'text-white/80 mo:border-l-4 mo:border-transparent' }`}>
                                    <Link href={v.link}>{ t(v.name) }</Link>
                                </div>
                            })
                        }
                    </div>
                    <div className={`flex items-center mo:w-full mo:justify-between mo:pt-3 mo:relative mo:z-10 mo:px-4`}>
                        <div className={`mr-4`}>
                          <ConnectButton />
                         </div>
                        <div>
                            <Popover placement="bottom-end" showArrow={true}>
                                <PopoverTrigger>
                                    <div className={`w-7`}>
                                        <i className={`iconfont text-2xl vc-global-2`}></i>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="px-3 py-1.5">
                                        {
                                            SupportedLangs.map((v,i) => {
                                                return <div key={`Lang_${i}`} className={`cursor-pointer py-1.5`} onClick={ async (e) => {
                                                    await langChange(e, v.lang);
                                                }}>
                                                    { v.name }
                                                </div>
                                            })
                                        }
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="h-screen pt-20 overflow-y-auto mo:pt-16">
            { children }
        </div>
    </main>
}

export default DefaultLayout;