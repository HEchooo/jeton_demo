import {useEffect, useState} from "react";
import {Config, useConfig, useReadContract, useWalletClient} from "wagmi";
import {zeroAddress, WalletClient} from "viem";
import {
    DOMAINS_WITHOUT_VERSION,
    DOMAIN_TYPEHASH_ABI,
    ERC20PermitABI,
    ERC_20_NONCES_ABI,
    TOKEN_ADDRESSES_WITH_SALT,
    VERSIONS_ABI, DOMAIN_712_ABI
} from "./permitAbi";
import {
    Eip2612Props,
    signPermit,
    signPermitDai,
    SignPermitProps,
} from "./permit";
import {readContract} from "wagmi/actions";

export function usePermit({
                              contractAddress,
                              chainId,
                              walletClient,
                              ownerAddress,
                          }: UsePermitProps) {

    const [signature, setSignature] = useState<Record<string, any>>();
    const [error, setError] = useState<Error>();
    const [ready, setReady] = useState<boolean>(false);
    const {data: defaultWalletClient} = useWalletClient();
    const config = useConfig();
    const walletClientToUse = walletClient ?? defaultWalletClient;

    const { data: name } = useReadContract({
        chainId,
        address: contractAddress,
        abi: ERC20PermitABI,
        functionName: "name",
    });

    useEffect(() => {
        setReady(
            walletClientToUse !== null &&
            walletClientToUse !== undefined &&
            chainId !== undefined &&
            contractAddress !== undefined &&
            name !== undefined && config !== undefined
        );
    }), [walletClientToUse, chainId, contractAddress, name, config];

    return {
        signPermitDai: ready
            ? async (
                props: PartialBy<
                    SignPermitProps,
                    | "chainId"
                    | "ownerAddress"
                    | "contractAddress"
                    | "nonce"
                    | "erc20Name"
                    | "permitVersion"
                > & {
                    walletClient?: WalletClient;
                },
                noncePlus: boolean = false
            ) => {
                try {
                    const { name: domainName, version: domainVersion, verifyingContract } = await getDomainInfo(config, contractAddress!, chainId!);
                    const nonce = await getNonce(config, verifyingContract!, walletClientToUse!.account!.address, chainId!);
                    const version = await getVersion(config, verifyingContract!, chainId!);
                    const isWithoutVersion = await isDomainWithoutVersion(config, verifyingContract!);
                    const isSalt = isSaltInsteadOfChainId(verifyingContract!, chainId!);
                    const signature = await signPermitDai(
                        //@ts-ignore
                        props.walletClient ?? walletClientToUse, {
                            chainId,
                            ownerAddress:
                                ownerAddress ??
                                props.walletClient?.account?.address ??
                                walletClientToUse?.account?.address ?? zeroAddress,
                            contractAddress: verifyingContract,
                            erc20Name: typeof domainName === "string" ? domainName : name,
                            nonce: noncePlus ? nonce + BigInt(1) : nonce,
                            permitVersion: typeof domainVersion === 'string' ? domainVersion : version,
                            isWithoutVersion,
                            isSaltInsteadOfChainId: isSalt,
                            ...props,
                        });
                    setSignature(signature);
                    return signature;
                } catch (e) {
                    setError(error as Error);
                    throw error;
                }
            } : undefined,
        signPermit: ready ? async (
                props: PartialBy<
                    Eip2612Props,
                    | "chainId"
                    | "ownerAddress"
                    | "contractAddress"
                    | "nonce"
                    | "erc20Name"
                    | "permitVersion"
                > & {
                    walletClient?: WalletClient;
                },
                noncePlus: boolean = false
            ) => {
                try {
                    const { name: domainName, version: domainVersion, verifyingContract } = await getDomainInfo(config, contractAddress!, chainId!);
                    const nonce = await getNonce(config, verifyingContract!, walletClientToUse!.account!.address, chainId!);
                    const version = await getVersion(config, verifyingContract!, chainId!);
                    const isWithoutVersion = await isDomainWithoutVersion(config, verifyingContract!);
                    const isSalt = isSaltInsteadOfChainId(verifyingContract!, chainId!);
                    const signature = await signPermit(
                        //@ts-ignore
                        props.walletClient ?? walletClientToUse,
                        {
                            chainId,
                            ownerAddress:
                                ownerAddress ??
                                props.walletClient?.account?.address ??
                                walletClientToUse?.account?.address ?? zeroAddress,
                            contractAddress: verifyingContract,
                            erc20Name: typeof domainName === "string" ? domainName : name,
                            nonce: noncePlus ? nonce + BigInt(1) : nonce,
                            permitVersion: typeof domainVersion === 'string' ? domainVersion : version,
                            isWithoutVersion,
                            isSaltInsteadOfChainId: isSalt,
                            ...props,
                        },
                    );
                    setSignature(signature);
                    return signature;
                } catch (error) {
                    setError(error as Error);
                    throw error;
                }
            }
            : undefined,
        signature,
        error,
    };
}

const getNonce = async (config: Config, tokenAddress: string, walletAddress: string, chainId: number) => {
    for (const nonceAbi of ERC_20_NONCES_ABI) {
        try {
            const nonce = await readContract(config, {
                chainId,
                address: tokenAddress as any,
                abi: [nonceAbi],
                functionName: nonceAbi.name,
                args: [walletAddress as any]
            })
            return nonce
        } catch (error) {
            continue
        }
    }
    return BigInt(0)
}

const getVersion = async (config: Config, tokenAddress: string, chainId: number) => {
    for (const versionAbi of VERSIONS_ABI) {
        if (!versionAbi.name) {
            return "1"
        }
        try {
            const res = await readContract(config, {
                chainId,
                address: tokenAddress as any,
                abi: [versionAbi],
                functionName: versionAbi.name,
                args: []
            })
            if (res === '0x' || Number.isNaN(Number(res))) return '1';
            const version = Number(res.slice(0, 65));
            if (version < 1) return '1';
            return version.toString();
        } catch (error) {
            continue
        }
    }
    return "1"
}
const domainTypeHashStorage: Map<string, string> = new Map();

const isDomainWithoutVersion = async (config: Config, tokenAddress: string) => {
    const domainTypeHash = await getDomainHash(config, tokenAddress);
    return !!domainTypeHash && DOMAINS_WITHOUT_VERSION.includes(domainTypeHash.toLowerCase());
}

const isSaltInsteadOfChainId = (tokenAddress: string, chainId: number): boolean => {
    const identifier = `${tokenAddress}:${chainId}`;
    return TOKEN_ADDRESSES_WITH_SALT.includes(identifier);
}

const getDomainInfo = async (config: Config, tokenAddress: string, chain: number) => {
    try {
        const domainHash = await readContract(config, {
            chainId: chain,
            abi: DOMAIN_712_ABI,
            address: tokenAddress as any,
            functionName: DOMAIN_712_ABI[0].name
        });
        const [fields, name, version, chainId, verifyingContract, salt, extensions] = domainHash
        return { fields, name, version, chainId, verifyingContract, salt, extensions };
    } catch (error) {
        return { verifyingContract: tokenAddress };
    }
}
const getDomainHash = async (config: Config, tokenAddress: string) => {
    if (domainTypeHashStorage.has(tokenAddress)) {
        return domainTypeHashStorage.get(tokenAddress);
    }
    try {
        const domainHash = await readContract(config, {
            abi: DOMAIN_TYPEHASH_ABI,
            address: tokenAddress as any,
            functionName: DOMAIN_TYPEHASH_ABI[0].name
        });
        domainTypeHashStorage.set(tokenAddress, domainHash);
        return domainHash;
    } catch (error) {
        return null;
    }


}

export type UsePermitProps = Partial<SignPermitProps> & {
    walletClient?: WalletClient | null;
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;