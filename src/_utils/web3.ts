export const addressSens = (v: string = '', digits: number = 4, dots: string = '...') => {
    if (!v) {
        return ''
    }
    if (v.length < (2 * digits + dots.length)) {
        return v
    }
    return v.substring(0,4) + dots + v.substring(v.length - 4, v.length);

}