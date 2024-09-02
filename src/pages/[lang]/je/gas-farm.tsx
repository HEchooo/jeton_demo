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
import {Button} from "@nextui-org/react";
import {hashMessage, hexToSignature, keccak256, parseTransaction, signatureToHex, toBytes, toHex} from "viem";
import {useSignMessage, useWalletClient} from "wagmi";

const PageGasFarm: NextPageWithLayout = ({langs, lang}) => {

    const {t} = useTrans(langs);

    const { signMessageAsync } = useSignMessage()

    return <>
        <Head>
            <title>{ t('{#Swap & Bridge#}') }</title>
        </Head>
        <div className={`w-full h-full bg-cover bg-center ${ bg.bg }`}>
            <VsFeatureInfo />
            <div className={`flex-1 w-full  h-[400px] flex items-center justify-center`}>
                { t('{#暂未开放#}') }
                <Button onClick={ async () => {
                    const message = [
                        "0x",
                        "19",
                        "00",
                        '0xee1162D7A399793D85bB61733863BE8a753897B6'.slice(2),
                        '0000000000000000000000000000000000000000000000000000000000000089',
                        '0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000005c0000000000000000000000000c5c2d2dba11ae7d7a8e8ad70700297cda2609f07000000000000000000000000109e407df650adf84ec0693d3093020ece7003e10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000484aced324800000000000000000000000000000000000000000000000000000000000000200000000000000000000000001a3acf6d19267e2d3e7f898f42803e90c9219062000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000647bc704e45d00000000000000000000000000000000000000000000000000037c52b625f40f000000000000000000000000000000000000000000000000000385562202227c0000000000000000000000004fd65932c94dab04811f81c1c587cb7267e178f7000000000000000000000000c5c2d2dba11ae7d7a8e8ad70700297cda2609f070000000000000000000000000000000000000000000000000000013889c4001e0000000000000000000000000000000000000000000000000000000065e16d4f0000000000000000000000000000000000000000000000000000000000000180e02beca013424e119a1cdc284957d7590000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000a5e0829caced8ffdd4de3c43696c57f7d7a678ff00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010438ed17390000000000000000000000000000000000000000000000000000647bc704e45d000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000109e407df650adf84ec0693d3093020ece7003e10000000000000000000000000000000000000000000000000000000065eaa57700000000000000000000000000000000000000000000000000000000000000020000000000000000000000001a3acf6d19267e2d3e7f898f42803e90c92190620000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000000000000000000000109e407df650adf84ec0693d3093020ece7003e1000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024e1829cfe0000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf1270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044631bde8279e9f41144b38705fd4b81e3c5a9700000000000000000000000093f0b214d582f37a82c04839a634f644cfd806fb00000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000003c499c542cef5e3811e1192ce70d8cc03d5c335900000000000000000000000000000000000000000000000000000000000001f4000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
                        '0000000000000000000000000000000000000000000000000000000000000004',
                    ].join("") as `0x${string}`;
                    console.log(toBytes(keccak256(message)));
                    const signature = await signMessageAsync({ message: {raw: keccak256(message) }});
                    console.log(signature);
                    const info = hexToSignature(signature as `0x${string}`);
                    console.log(signature, info);
                }}>
                  测试
                </Button>
            </div>
        </div>
    </>

}

PageGasFarm.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <DefaultLayout>
                {page}
            </DefaultLayout>
        </>
    )
}
export default PageGasFarm;

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



