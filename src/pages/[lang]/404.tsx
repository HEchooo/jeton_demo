import {ReactElement} from "react";
import DefaultLayout from "@/components/layout/default.layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {defaultGetStaticPaths, defaultGetStaticProps} from "@/_i18n/next.i18n";
import {LangProps} from "@/_i18n/i18n.config";
import fs from "fs";
import path from "path";

const PageError = () => {
    return <div className={`w-screen h-full flex items-center justify-center`}>
        404
    </div>
}
PageError.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
            <DefaultLayout>
                {page}
            </DefaultLayout>
        </>
    )
}
export default PageError;

const PageKeys: string[] = [];
export const getStaticPaths: GetStaticPaths = defaultGetStaticPaths;
export const getStaticProps: GetStaticProps<LangProps> = defaultGetStaticProps(
    PageKeys,
    {
        node:
            {fs, path},
        mds: []
    });
