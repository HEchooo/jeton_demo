import {sha256} from "viem";

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const ALPHABET_MAP: Record<string, number> = {};
for (let i = 0; i < ALPHABET.length; i++) ALPHABET_MAP[ALPHABET.charAt(i)] = i;
const BASE = 58;

function byte2hexStr(byte?: number) {
    if (typeof byte !== 'number')
        throw new Error('Input must be a number');

    if (byte < 0 || byte > 255)
        throw new Error('Input must be a byte');

    const hexByteMap = '0123456789ABCDEF';

    let str = '';
    str += hexByteMap.charAt(byte >> 4);
    str += hexByteMap.charAt(byte & 0x0f);

    return str;
}

function byteArray2hexStr(byteArray: number[]) {
    let str = '';
    for (let i = 0; i < (byteArray.length); i++)
        str += byte2hexStr(byteArray[i]);
    return str;
}

export function hexChar2byte(c: string) {
    let d;

    if (c >= 'A' && c <= 'F')
        d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    else if (c >= 'a' && c <= 'f')
        d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
    else if (c >= '0' && c <= '9')
        d = c.charCodeAt(0) - '0'.charCodeAt(0);

    if (typeof d === 'number')
        return d;
    else
        throw new Error('The passed hex char is not a valid hex char');
}

export function isHexChar(c: string) {
    if ((c >= 'A' && c <= 'F') ||
        (c >= 'a' && c <= 'f') ||
        (c >= '0' && c <= '9')) {
        return 1;
    }

    return 0;
}
export function hexStr2byteArray(str?: string, strict = false) {
    if (typeof str !== 'string')
        throw new Error('The passed string is not a string')

    let len = str.length;

    if (strict) {
        if (len % 2) {
            str = `0${str}`;
            len++;
        }
    }
    const byteArray = Array();
    let d = 0;
    let j = 0;
    let k = 0;

    for (let i = 0; i < len; i++) {
        const c = str.charAt(i);

        if (isHexChar(c)) {
            d <<= 4;
            d += hexChar2byte(c);
            j++;

            if (0 === (j % 2)) {
                byteArray[k++] = d;
                d = 0;
            }
        } else
            throw new Error('The passed hex char is not a valid hex string')
    }

    return byteArray;
}
export function SHA256(msgBytes: number[]) {
    const msgHex = byteArray2hexStr(msgBytes);
    const hashHex = sha256('0x' + msgHex as `0x${string}`).replace(/^0x/, '')
    return hexStr2byteArray(hashHex);
}

export function decode58(string: string) {
    if (string.length === 0) return [];
    let i;
    let j;
    const bytes = [0];
    for (i = 0; i < string.length; i++) {
        const c = string[i];
        if (!(c in ALPHABET_MAP)) throw new Error('Non-base58 character');
        for (j = 0; j < bytes.length; j++) bytes[j] *= BASE;
        bytes[0] += ALPHABET_MAP[c];
        let carry = 0;
        for (j = 0; j < bytes.length; ++j) {
            bytes[j] += carry;
            carry = bytes[j] >> 8;
            bytes[j] &= 0xff;
        }
        while (carry) {
            bytes.push(carry & 0xff);
            carry >>= 8;
        }
    }
    for (i = 0; string[i] === '1' && i < string.length - 1; i++) bytes.push(0);
    return bytes.reverse();
}

export function isTrxAddress(base58Str?: string) {
    if (typeof (base58Str) !== 'string')
        return false;

    if (base58Str.length !== 34)
        return false;

    let address = decode58(base58Str);

    if (address.length !== 25)
        return false;

    if (address[0] !== 0x41)
        return false;

    const checkSum = address.slice(21);
    address = address.slice(0, 21);

    const hash0 = SHA256(address);
    const hash1 = SHA256(hash0);
    const checkSum1 = hash1.slice(0, 4);

    if (checkSum[0] == checkSum1[0] && checkSum[1] == checkSum1[1] && checkSum[2] ==
        checkSum1[2] && checkSum[3] == checkSum1[3]
    ) {
        return true
    }

    return false;
}