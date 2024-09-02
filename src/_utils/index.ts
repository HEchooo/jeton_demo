export const isAndroid = () => {
    const u = window.navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
}

export const isIos = () => {
    const u = window.navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export const isApp = () => {
    const u = window.navigator.userAgent.toLowerCase();
    return u.indexOf('echooo') > -1;
}

export const isPc = () => {
    const ua = window.navigator.userAgent;
    const Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
        if (ua.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

export const isChrome = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('chrome') > -1;
}

export const sleep = (delay?: number) => new Promise(resolve => {
    setTimeout(() => resolve(true), delay || 50);
});

export const getDownloadUrl = () => {
    if(isIos()) {
        return "https://apps.apple.com/us/app/echooo-wallet/id6446883725"
    }
    if (isAndroid()) {
        return "https://play.google.com/store/apps/details?id=com.smartwallet.app"
    }
    return "/";
}

export function parseJwt(token:string){
    const strings = token.split(".");
    const tokenInfo = JSON.parse(decodeURIComponent(escape(globalThis.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
    return tokenInfo;
}

export const vsEnv = process.env.BUILD_ENV;