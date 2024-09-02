import "@/styles/globals.css";
import '@/styles/iconfont/iconfont.css';
import '@sofent/rainbowkit/styles.css';
import {TransContext} from "@/_i18n/next.i18n";
import {NextUIProvider} from "@nextui-org/react";
import {AppPropsWithLayout} from "@/types/global";
import {ReactElement, useEffect} from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {WagmiProvider} from 'wagmi'
import {RainbowKitProvider} from '@sofent/rainbowkit';
import config from "@/walletconfig/rainbow.config";
import Head from "next/head";

const env = process.env.BUILD_ENV;
export default function App({Component, pageProps}: AppPropsWithLayout) {

    const queryClient = new QueryClient();

    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

    useEffect(() => {
        if (env !== 'production') {
            const vConsole = require("vconsole");
            new vConsole();
        }
    }, []);

    return <>
        <Head>
            <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1" />
        </Head>
        <NextUIProvider>
            <TransContext.Provider value={{langs: pageProps?.langs, lang: pageProps?.lang, json: pageProps?.json}}>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider
                            locale={
                                pageProps?.lang?.split('-').map((v: string, i: number) => i > 0 ? v.toUpperCase() : v).join('-')
                            }>
                            {getLayout(<Component {...pageProps} />)}
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </TransContext.Provider>
        </NextUIProvider>
    </>
}
