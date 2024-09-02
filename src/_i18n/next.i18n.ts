import {GetStaticPaths, GetStaticProps} from "next";
import {I18nConfig, LangProps} from "@/_i18n/i18n.config";
import queryString from "querystring";
import {createContext, useContext} from "react";
export const SupportedLangs = I18nConfig.SupportedLangs;
export const COMMON_LANGS: string[] = I18nConfig.CommonKeys;
export const TransContext = createContext<{ langs: Record<string, string>, lang: string, json?:  Record<string, string> }>(null!);
export const defaultGetStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            ...SupportedLangs.map(v => ({ params: { lang: v.lang } })),
        ],
        fallback: false, // false or "blocking"
    }
}

export const defaultGetStaticProps: (keys: string[], config?: { node:{ fs: any, path: any }, mds: string[] }) => GetStaticProps<LangProps> = (keys, config) => {
    const langSource = I18nConfig.LangSource;
    const getStaticProps: GetStaticProps<LangProps> = async ({params}) => {
        const data: Record<string, any> = langSource[params?.lang as 'zh-hk' | 'en-us' | 'zh-cn'];
        const newData: Record<string, any> = {};
        [...COMMON_LANGS, ...keys].forEach(v => {
            const key: string = v.substring(2, v.length - 2);
            newData[key] = data[key] || '';
        });
        const mdsView: Record<string, string> = {};
        if (config && config.mds && config.mds.length) {
            const { fs, path } = config.node;
            config.mds.forEach(v => {
                try {
                    const md = fs.readFileSync(path.join(process.cwd(), `src/markdown/${v}-${params?.lang as 'zh-hk' | 'en-us' | 'zh-cn'}.md`)).toString();
                    mdsView[v] = JSON.stringify(md);
                } catch (e) {
                    mdsView[v] = JSON.stringify('# error');
                }
            });
        }
        return {props: {langs: newData, lang: String(params?.lang), json: mdsView }}
    }
    return getStaticProps;
}

export const useTrans = (langs: Record<string, string> = {}) => {

    const baseLangs = useContext(TransContext);
    const t = (key: string) => {
        const reg = new RegExp("{#(.+?)#}");
        if (key && reg.test(key)) {
            const newKey = key && key.substring(2, key.length - 2);
            return (langs || baseLangs)?.[newKey] || newKey;
        }
        return key || '';
    };
    return {t};
}

export const getLangUrl = (url: string, lang: string) => {
    const urlSplit = url.split("?");
    const parsed = queryString.parse(urlSplit[1] || '');
    const newQuery = Object.keys(parsed).length ? { ...parsed, lang } : null;
    const search = newQuery ? `?${ Object.entries(newQuery).map(v => v.join("=")).join('&') }` : '';
    const reg = new RegExp(SupportedLangs.map(v => v.lang).join("|"), "gi");
    if (reg.test(urlSplit[0])) {
        return `${urlSplit[0].replace(reg, lang)}${ search }`;
    }
    if (!urlSplit[0] || urlSplit[0] === "/") {
        return `/${lang}/${ search }`
    }
    return `${urlSplit[0].replace(window.location.host, `${window.location.host}/${lang}`)}${ search }`
}