
import {NextPageWithLayout} from "@/types/global";
import {ReactElement} from "react";
import {defaultGetStaticPaths, defaultGetStaticProps, useTrans} from "@/_i18n/next.i18n";
import fs from "fs";
import path from "path";
import {GetStaticPaths, GetStaticProps} from "next";
import {LangProps} from "@/_i18n/i18n.config";
import DefaultLayout from "@/components/layout/default.layout";
import {ComponentsSwapFeatureInfoTsx, PagesLangJeSwapBridgeTsx} from "@/_i18n/langs";
import VsFeatureInfo from "@/components/swap/featureInfo";
import bg from '@/styles/bg.module.css';
import Head from "next/head";

const PageDefi: NextPageWithLayout = ({langs, lang}) => {

    const {t} = useTrans(langs);

    return <>
        <Head>
            <title>{ t('{#Swap & Bridge#}') }</title>
        </Head>
        <div className={`w-full h-full bg-cover bg-center ${ bg.bg }`}>
            <VsFeatureInfo />
            <div className={`flex-1 w-full h-[400px] flex items-center justify-center`}>
                { t('{#暂未开放#}') }
            </div>
        </div>
    </>

}

PageDefi.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <DefaultLayout>
                {page}
            </DefaultLayout>
        </>
    )
}
export default PageDefi;

const PageKeys: string[] = [
    ...PagesLangJeSwapBridgeTsx,
    ...ComponentsSwapFeatureInfoTsx,
];
export const getStaticPaths: GetStaticPaths = defaultGetStaticPaths;
export const getStaticProps: GetStaticProps<LangProps> = defaultGetStaticProps(
    PageKeys,
    {
        node:
            {fs, path},
        mds: []
    });



