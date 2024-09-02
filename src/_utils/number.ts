
interface baseNumberFormatProps {
    digits?: number,
    lang?: 'zh-cn' | 'en-us' | 'zh-hk',
    fill?: boolean,
}
const zero = "000000000000000000000000000000000000000000000";
export const baseNumberFormat: (value: number | string | undefined, opt?: baseNumberFormatProps) => string = (value,opt) => {
    const { lang = 'zh-cn', digits, fill = true } = opt || {};
    const a = String(isNaN(Number(value)) ? 0 : value);
    const arr = a.split('.');
    return arr.length === 1 ?  (fill ? `${a}.${ zero.substring(0, digits) }` : `${ a || 0 }`) :  arr
        .map((val, i) => {
            if (i === 0) {
                return Number(val).toLocaleString(lang, { maximumFractionDigits: 0 });
            }
            if (typeof digits === "number") {
                let n = val.substring(0, digits);
                if (n.length < digits && fill) {
                    n = `${n}${zero.substring(0, digits - n.length)}`;
                }
                return n;
            } else {
                return val.substring(0, val.length);
            }
        }).join(".");
}