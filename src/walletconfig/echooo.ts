import {
    RainbowKitWalletConnectParameters,
    Wallet,
    WalletDetailsParams,
    getWalletConnectConnector
} from '@sofent/rainbowkit';
import {createConnector} from 'wagmi'
import {injected} from 'wagmi/connectors';
import {isAndroid, isApp} from "@/_utils";


declare let window: Window & { echoooEth: any }

export interface DefaultWalletOptions {
    projectId: string;
    walletConnectParameters?: RainbowKitWalletConnectParameters;
}

export type EchoooWalletOptions = DefaultWalletOptions;


export type CreateConnector = (walletDetails: WalletDetailsParams) => CreateConnector;

function createInjectedConnector(provider?: any): any {
    return (walletDetails: WalletDetailsParams) => {
        // Create the injected configuration object conditionally based on the provider.
        const injectedConfig = provider
            ? {
                target: () => ({
                    id: walletDetails.rkDetails.id,
                    name: walletDetails.rkDetails.name,
                    provider,
                }),
            }
            : {};

        return createConnector((config) => ({
            // Spread the injectedConfig object, which may be empty or contain the target function
            ...injected(injectedConfig)(config),
            ...walletDetails,
        }));
    };
}

export const echoooWallet = ({
                                 projectId,
                                 walletConnectParameters,
                             }: EchoooWalletOptions): Wallet => {

    const isEchoooInjected = isAndroid() && isApp() ?  !!window.echoooEth || !! window.ethereum  : !!window.echoooEth;
    const shouldUseWalletConnect = !isEchoooInjected;
    
    console.log('isEchoooInjected', isEchoooInjected);

    return {
        id: 'echooo',
        name: 'Echooo Wallet',
        rdns: 'com.echooo.wallet',
        iconUrl: 'https://cdn.echooo.xyz/front-end/source/images/extension/logo-48.png',
        iconAccent: '#000',
        iconBackground: '#000',
        downloadUrls: {
            android: 'https://play.google.com/store/apps/details?id=com.smartwallet.app',
            ios: 'https://itunes.apple.com/app/id6446883725?mt=8',
            mobile: 'https://www.echooo.xyz',
            qrCode: 'https://www.echooo.xyz',
            chrome: 'https://chromewebstore.google.com/detail/echooo-wallet/lcmncloheoekhbmljjlhdlaobkedjbgd',
            browserExtension: 'https://www.echooo.xyz',
        },
        mobile: {
            getUri: shouldUseWalletConnect ? (uri) => {
                return uri;
            } : void 0
        },
        qrCode: shouldUseWalletConnect
            ? {
                getUri: (uri: string) => uri,
                instructions: {
                    learnMoreUrl: 'https://www.echooo.xyz/',
                    steps: [
                        {
                            description: 'echooo.qr_code.step1.description',
                            step: 'install',
                            title: 'echooo.qr_code.step1.title',
                        },
                        {
                            description: 'echooo.qr_code.step2.description',
                            step: 'create',
                            title: 'echooo.qr_code.step2.title',
                        },
                        {
                            description: 'echooo.qr_code.step3.description',
                            step: 'scan',
                            title: 'echooo.qr_code.step3.title',
                        },
                    ],
                },
            }
            : undefined,
        extension: {
            instructions: {
                learnMoreUrl: 'https://www.echooo.xyz/',
                steps: [
                    {
                        description: 'echooo.extension.step1.description',
                        step: 'install',
                        title: 'echooo.extension.step1.title',
                    },
                    {
                        description: 'echooo.extension.step2.description',
                        step: 'create',
                        title: 'echooo.extension.step2.title',
                    },
                    {
                        description: 'echooo.extension.step3.description',
                        step: 'refresh',
                        title: 'echooo.extension.step3.title',
                    },
                ],
            },
        },
        createConnector: shouldUseWalletConnect
            ? (() => {
                const fn = getWalletConnectConnector({
                    projectId,
                    walletConnectParameters: {
                        ...walletConnectParameters,
                        metadata: {
                            name: "Jeton Protocol",
                            description: "Jeton Protocol",
                            url: "https://www.jetonai.xyz/",
                            icons: ["https://cdn.echooo.xyz/front-end/source/images/logo/jeton-logo.png"],
                        },
                    },
                })
                return (param => {
                    console.log("wallet connect", param, walletConnectParameters, projectId)
                    return fn(param)
                })
            })() : createInjectedConnector(() => isAndroid() && isApp() ? window.ethereum || window.echoooEth : window.echoooEth),
    };
};