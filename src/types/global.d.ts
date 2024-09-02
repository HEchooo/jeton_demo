import {LangProps} from "@/_i18n/i18n.config";
import {NextPage} from "next";
import {ReactElement} from "react";
import {AppProps} from "next/app";
import {ServiceSwapSwapSearchResponse, ServiceTokenTokenListResponse} from "@/_yapi";
import {NftSelectInfo} from "@/types/nft";


export type NextPageWithLayout<P = LangProps, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode,
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export interface DefaultSelectProps<T> {
    value?: T,
    onChange:  (v:T) => Promise<T> | void
}

export interface TransDataProps {
    token?: string,
    tokenObj?: ServiceTokenTokenListResponse[0] | null | ServiceSwapSwapSearchResponse[0],
    nft?: string,
    nftObj?: NftSelectInfo,
    step?: number,
    sendType?: number,
    pushValue?: string[],
    localPushValue?: string[],
    gasMode?: string,
    totalValue?: string,
    totalAddress?: number,
    hash?: string | string[],
    fee?: string,
    chainId?: number
}