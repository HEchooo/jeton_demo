import zh from "@/_i18n/zh-hk.json";
import en from "@/_i18n/en-us.json";
import cn from "@/_i18n/zh-cn.json";
import {ComponentsLayoutDefaultLayoutTsx, ComponentsModalTokenModalTsx} from "@/_i18n/langs";


export const I18nConfig = {
    CommonKeys: [
        ...ComponentsLayoutDefaultLayoutTsx,
        ...ComponentsModalTokenModalTsx,
    ],
    SupportedLangs: [
        { lang: 'zh-cn', name: '简体中文' },
        { lang: 'zh-hk', name: '繁體中文' },
        { lang: 'en-us', name: 'English' }
    ],
    LangSource: {
        'zh-hk': zh,
        'zh-cn': cn,
        'en-us': en,
    }
}

export type LangProps = {
    langs: Record<string, any>,
    lang: string,
    json?: Record<string, string>,
}
