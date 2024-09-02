import {useWalletClient} from "wagmi";
import {useCallback} from "react";


export default function useGetPermitNonces({}) {

    const { data: wc } = useWalletClient();

    const getNonces = useCallback(async () => {

    }, [wc]);

    return {
        getNonces
    }
}