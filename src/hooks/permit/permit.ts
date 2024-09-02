import type { WalletClient } from "viem";
import { Hex, hexToNumber, pad, slice, toHex, domainSeparator, TypedDataDomain, TypedDataParameter } from "viem";
import {TypedDataEncoder} from "ethers";

export function getTypesForEIP712Domain({
											domain,
										}: { domain?: TypedDataDomain }): TypedDataParameter[] {
	return [
		typeof domain?.name === 'string' && { name: 'name', type: 'string' },
		typeof domain?.version === 'string' && { name: 'version', type: 'string' },
		typeof domain?.chainId === 'number' && {
			name: 'chainId',
			type: 'uint256',
		},
		domain?.verifyingContract && {
			name: 'verifyingContract',
			type: 'address',
		},
		domain?.salt && { name: 'salt', type: 'bytes32' },
	].filter(Boolean) as TypedDataParameter[]
}

export type PermitSignature = {
	r: Hex;
	s: Hex;
	v: number;
	nonce: bigint;
};

export type SignPermitProps = {
	/** Address of the token to approve */
	contractAddress: Hex;
	/** Name of the token to approve.
	 * Corresponds to the `name` method on the ERC-20 contract. Please note this must match exactly byte-for-byte */
	erc20Name: string;
	/** Owner of the tokens. Usually the currently connected address. */
	ownerAddress: Hex;
	/** Address to grant allowance to */
	spenderAddress: Hex;
	/** Expiration of this approval, in SECONDS */
	deadline: bigint;
	/** Numerical chainId of the token contract */
	chainId: number;
	/** Defaults to 1. Some tokens need a different version, check the [PERMIT INFORMATION](https://github.com/vacekj/wagmi-permit/blob/main/PERMIT.md) for more information */
	permitVersion?: string;
	/** Permit nonce for the specific address and token contract. You can get the nonce from the `nonces` method on the token contract. */
	nonce: bigint;
};

export type Eip2612Props = SignPermitProps & {
	/** Amount to approve */
	value: bigint;
};

/**
 * Signs a permit for a given ERC-2612 ERC20 token using the specified parameters.
 *
 * @param {WalletClient} walletClient - Wallet client to invoke for signing the permit message
 * @param {SignPermitProps} props - The properties required to sign the permit.
 * @param {string} props.contractAddress - The address of the ERC20 token contract.
 * @param {string} props.erc20Name - The name of the ERC20 token.
 * @param {number} props.value - The amount of the ERC20 to approve.
 * @param {string} props.ownerAddress - The address of the token holder.
 * @param {string} props.spenderAddress - The address of the token spender.
 * @param {number} props.deadline - The permit expiration timestamp in seconds.
 * @param {number} props.nonce - The nonce of the address on the specified ERC20.
 * @param {number} props.chainId - The chain ID for which the permit will be valid.
 * @param {number} props.permitVersion - The version of the permit (optional, defaults to "1").
 */
export const signPermit = async (
	walletClient: WalletClient,
	{
		contractAddress,
		erc20Name,
		ownerAddress,
		spenderAddress,
		value,
		deadline,
		nonce,
		chainId,
		permitVersion,
		isWithoutVersion,
		isSaltInsteadOfChainId,
	}: Eip2612Props&{isWithoutVersion:boolean,isSaltInsteadOfChainId:boolean},
): Promise<PermitSignature> => {

	const domainData = {
		name: erc20Name,
		/** We assume 1 if permit version is not specified */
		version: !isWithoutVersion? (permitVersion ?? "1") : undefined,
		chainId: isSaltInsteadOfChainId ? undefined: (chainId === 9527 ? 1 : chainId),
		verifyingContract: contractAddress,
		salt: isSaltInsteadOfChainId? pad(toHex(chainId), { size: 32 }):undefined,
	};

	console.log('domainData', domainData);
	console.log('domainData', domainSeparator({ domain: domainData}))
	console.log('domain', TypedDataEncoder.hashDomain(domainData));

	const message = {
		owner: ownerAddress,
		spender: spenderAddress,
		value,
		nonce,
		deadline,
	};

	const types = {
		"Permit": [
			{ name: "owner", type: "address" },
			{ name: "spender", type: "address" },
			{ name: "value", type: "uint256" },
			{ name: "nonce", type: "uint256" },
			{ name: "deadline", type: "uint256" },
		],
	};

	console.log(types);

	console.log('signMessage', message);
	console.log('message', TypedDataEncoder.from(types).hash(message));

	const signature = await walletClient.signTypedData({
		account: ownerAddress,
		message,
		//@ts-ignore
		domain: domainData,
		primaryType: "Permit",
		types,
	});
	const [r, s, v] = [
		slice(signature, 0, 32),
		slice(signature, 32, 64),
		slice(signature, 64, 65),
	];
	return { r, s, v: hexToNumber(v), nonce};
};

export const signPermitDai =
	/**
	 * Signs a permit for a given ERC20 token using the specified parameters.
	 *
	 * @param {WalletClient} walletClient - 	Wallet client to invoke for signing the permit message
	 * @param {SignPermitProps} props - The properties required to sign the permit.
	 * @param {string} props.contractAddress - The address of the ERC20 token contract.
	 * @param {string} props.erc20Name - The name of the ERC20 token.
	 * @param {string} props.ownerAddress - The address of the token holder.
	 * @param {string} props.spenderAddress - The address of the token spender.
	 * @param {number} props.deadline - The permit expiration timestamp in seconds.
	 * @param {number} props.nonce - The nonce of the address on the specified ERC20.
	 * @param {number} props.chainId - The chain ID for which the permit will be valid.
	 * @param {number} props.permitVersion - The version of the permit (optional, defaults to "1").
	 */
	async (
		walletClient: WalletClient,
		{
			contractAddress,
			erc20Name,
			ownerAddress,
			spenderAddress,
			deadline,
			nonce,
			chainId,
			permitVersion,
			isWithoutVersion,
			isSaltInsteadOfChainId,
		}: SignPermitProps&{isWithoutVersion:boolean,isSaltInsteadOfChainId:boolean},
	): Promise<PermitSignature> => {

		const domainData = {
			name: erc20Name,
			/** We assume 1 if permit version is not specified */
			version: !isWithoutVersion?(permitVersion ?? "1"):undefined,
			chainId: isSaltInsteadOfChainId?undefined:(chainId === 9527 ? 1 : chainId),
			verifyingContract: contractAddress,
			salt: isSaltInsteadOfChainId ? pad(toHex(chainId), { size: 32 }):undefined,
		};

		console.log('domainData', domainData);
		console.log('domain', TypedDataEncoder.hashDomain(domainData));

		const types = {
			"Permit": [
				{ name: "holder", type: "address" },
				{ name: "spender", type: "address" },
				{ name: "nonce", type: "uint256" },
				{ name: "expiry", type: "uint256" },
				{ name: "allowed", type: "bool" },
			],
		};
		
		const message = {
			holder: ownerAddress,
			spender: spenderAddress,
			nonce,
			expiry: deadline,
			/** true == infinite allowance, false == 0 allowance*/
			allowed: true,
		};

		console.log('message', message);
		console.log('message', TypedDataEncoder.from(types).hash(message));

		const signature = await walletClient.signTypedData({
			account: ownerAddress,
			//@ts-ignore
			domain: domainData,
			primaryType: "Permit",
			types,
			message,
		});
		const [r, s, v] = [
			slice(signature, 0, 32),
			slice(signature, 32, 64),
			slice(signature, 64, 65),
		];
		return { r, s, v: hexToNumber(v) ,nonce};
	};
