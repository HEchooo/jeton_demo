declare interface TokenInfo {
    address: string,
    symbol: string,
    decimals: number|string,
    logo?: string,
    chainId: number,
    price?: number|string,
    id: string|number,
    isPermit: boolean,
    isSpam?: boolean,
    sort?: number,
    price24hChangePercent?: number
}