import {ServiceSwapCrossChainListResponse, serviceSwapSwapVerifyPath} from "@/_yapi";

export default async function isValidPath(srcToken: TokenInfo, destToken: TokenInfo, allPath?: ServiceSwapCrossChainListResponse): Promise<boolean> {
    if (srcToken?.chainId === destToken.chainId) {
        const verifyPath = await serviceSwapSwapVerifyPath({
            from: srcToken.address,
            to: destToken?.address,
            chainId: String(srcToken.chainId),
        }).catch(() => ({
            isValidPath: false
        }));
        return verifyPath.isValidPath
    }
    allPath = allPath ?? [];
    return allPath.some(it =>
        // Number(it.srcChainId) === srcToken.chainId
        Number(it.destChainId) === destToken?.chainId
        // && it.srcTokenAddress.toLowerCase() === srcToken.address.toLowerCase()
        && it.destTokenAddress.toLowerCase() == destToken?.address.toLowerCase()
    );
}