import {useBalance, useReadContract} from "wagmi";
import {erc20Abi, getAddress} from "viem";

interface UseSelectTokenBalanceProps {
    tokenAddress?: string,
    userAddress?: string,
    chainId?: number,
    scopeKey?:string,
    enabled?: boolean
}
export default function useSelectTokenBalance({ tokenAddress, userAddress, chainId , enabled = true, scopeKey}: UseSelectTokenBalanceProps) {

    const { data: tokenData } = useReadContract({
        account: userAddress ? getAddress(userAddress as `0x${string}`) : undefined,
        abi: erc20Abi,
        chainId: chainId,
        functionName:'balanceOf',
        args: userAddress ? [ getAddress(userAddress) ]:undefined,
        address: tokenAddress ? getAddress(tokenAddress as `0x${string}`) : undefined,
        query: {
            enabled: tokenAddress !== '0x0000000000000000000000000000000000000000' && enabled
        },
        scopeKey
    });

    const { data: tokenSymbol } = useReadContract({
        account: userAddress ? getAddress(userAddress as `0x${string}`) : undefined,
        abi: erc20Abi,
        chainId: chainId,
        functionName: 'symbol',
        address: tokenAddress ? getAddress(tokenAddress as `0x${string}`) : undefined,
        query: {
            enabled: tokenAddress !== '0x0000000000000000000000000000000000000000' && enabled
        },
        scopeKey
    });

    const { data: tokenDecimals } = useReadContract({
        account: userAddress ? getAddress(userAddress as `0x${string}`) : undefined,
        abi: erc20Abi,
        chainId: chainId,
        functionName: 'decimals',
        address: tokenAddress ? getAddress(tokenAddress as `0x${string}`) : undefined,
        query: {
            enabled: tokenAddress !== '0x0000000000000000000000000000000000000000' && enabled
        },
        scopeKey
    });

    const { data: mainBalance } = useBalance({
        address: userAddress ? getAddress(userAddress as `0x${string}`) : undefined,
        chainId: chainId,
        query: {
            enabled: enabled
        },
        scopeKey
    });

    return {
        value: (tokenAddress === '0x0000000000000000000000000000000000000000' ? mainBalance?.value : tokenData) || BigInt(0),
        symbol: tokenAddress === '0x0000000000000000000000000000000000000000' ? mainBalance?.symbol : tokenSymbol,
        decimals: tokenAddress === '0x0000000000000000000000000000000000000000' ? mainBalance?.decimals: tokenDecimals,
        mainBalance
    } as { value: bigint, symbol: string, decimals: number}
}