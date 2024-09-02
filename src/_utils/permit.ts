import { arbitrum, optimism } from "viem/chains"

export function isDai(token?:TokenInfo):boolean{
    return token?.symbol==='DAI';
}

export function isArb(chainId:number){
    return chainId === arbitrum.id;
}

export function isOpt(chainId:number){
    return chainId === optimism.id;
}

export function isDaiPermit(token:TokenInfo){
    return isDai(token) && !isArb(token.chainId) && !isOpt(token.chainId);
}