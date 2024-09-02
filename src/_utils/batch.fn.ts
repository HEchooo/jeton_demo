import {isAddress} from "viem";
import {ServiceTokenTokenNftResponse} from "@/_yapi";


export const csvEditorErrorTips = (csv: string[], select?: { tokenType: string, tokenIds?: ServiceTokenTokenNftResponse }) => {
    if (!select) {
        return [];
    }
    const errors = csv.map((v, i) => {
        if (!v) {
            return {site: i, valid: true, reason: "{#该行空了请删除！#}"}
        }
        const va = v.split("#");
        if (!isAddress(va[0])) {
            return {site: i, valid: false, reason: `{#地址格式错误，請重新輸入#}`};
        }
        if (select?.tokenType === 'ERC20') {
            if (!va[1] || isNaN(Number(va[1])) || Number(va[1]) === 0) {
                return {site: i, valid: false, reason: '{#格式错误，请输入正确的转账数量#}'};
            }
            if (isNaN(Number(va[1])) || va?.length > 2) {
                return {site: i, valid: false, reason: `{#格式错误，請重新輸入#}`};
            }
            if (i > 399) {
                return {site: i, valid: false, reason: '{#单次最多400条#}'};
            }
        } else {
            if (select?.tokenType === 'ERC721' && va?.length > 2) {
                return {site: i, valid: false, reason: `{#格式错误，請重新輸入#}`};
            }
            if (select?.tokenType === 'ERC1155') {
                if (va?.length > 3) {
                    return {site: i, valid: false, reason: `{#格式错误，請重新輸入#}`};
                }
                if (!va[2] || (isNaN(Number(va[2])) || va[2].indexOf(".") > -1 || va[2].indexOf("-") > -1) || Number(va[2]) < 1) {
                    return {
                        site: i,
                        valid: false,
                        reason: va[2] ? '{#格式错误，转账数量请输入≥1的整数#}' : '{#请输入需要发送的NFT数量#}'
                    };
                }
                //@ts-ignore
                const tokenAmount = select.tokenIds?.filter(v => v.tokenId === va[1])[0]?.tokenAmount;
                if (tokenAmount && va[2] && Number(tokenAmount) < Number(va[2])) {
                    return {site: i, valid: false, reason: `{#Token ID 为 %v的NFT数量不足，无法发送#}`, data: va[1] };
                }
            }
            //@ts-ignore
            if (!select?.tokenIds?.map(v => v.tokenId).includes(va[1])) {
                return {site: i, valid: false, reason: `{#Token ID 为 %v的NFT不属于您，无法发送#}`, data: va[1]};
            }
            if (!va[1]) {
                console.log('va[1] =========== ', va[1], v, i);
                return {site: i, valid: false, reason: `{#请输入需要发送的Token ID#}`};
            }
            if (isNaN(Number(va[1])) || va[1].indexOf(".") > -1 || va[1].indexOf("-") > -1) {
                return {site: i, valid: false, reason: `{#格式错误，Token ID 请输入≥0的整数#}`};
            }
            if (select?.tokenType === 'ERC721' && va[1] && csv.map(k => k.split('#')?.[1]).filter(s => s === va[1]).length > 1) {
                return {site: i, valid: false, reason: `{#Token ID 为%v的NFT发送给了多个地址#}`, data: va[1]};
            }
            if (i > 99) {
                return {site: i, valid: false, reason: '{#单次最多400条#}'};
            }
        }
        return {site: i, valid: true, reason: ''};
    }).filter(v => !v.valid);
    return errors;
}