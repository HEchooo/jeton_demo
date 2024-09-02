import {ServiceTokenTokenNftResponse} from "@/_yapi";

export interface NftSelectInfo {
    imageUrl: string;
    name: string;
    tokenId: string;
    tokenIcon: string;
    tokenAmount: string;
    tokenAmountCurrency: string;
    decimals: string;
    address: string | `0x${string}`;
    tokenType: string;
    tokenIds?: ServiceTokenTokenNftResponse;
}