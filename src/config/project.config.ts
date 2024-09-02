import {defineChain} from "viem";
import {
    bsc,
    mainnet,
    zkSync,
    scroll,
    polygon,
    arbitrum,
    optimism,
    meter,
    base,
    avalanche,
    defichainEvm,
    goerli
} from "wagmi/chains";

const fork = {
        id: 9527,
        name: 'Fork',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Ethereum.png',
        rpc: 'https://gcp.echooo.link/eth-fork',
        txUrl: 'https://gcp.echooo.link/eth-fork-browser/',
        chain: {
            ...defineChain({
                id: 9527,
                name: "Fork",
                nativeCurrency: {
                    name: "ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: {
                    default: {
                        http: ['https://gcp.echooo.link/eth-fork'],
                        webSocket: undefined
                    }
                },
                blockExplorers: {
                    default: {
                        name: 'Fork Scan',
                        url: 'https://gcp.echooo.link/eth-fork-browser',
                    },
                }
            }),
            icon: {
                iconUrl: 'https://cdn.echooo.xyz/front-end/source/images/chain/Ethereum.png',
                iconBackground: '#f9f7ec'
            }
        },
        sort: 0,
        isValid: true,
    };

const bitlayer = {
  id: 200901,
  name: 'Bitlayer',
  icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/bitlayer.png',
  rpc: 'https://rpc.bitlayer.org',
  txUrl: 'https://www.btrscan.com/',
  chain: {
      ...defineChain({
          id: 200901,
          name: "Bitlayer",
          nativeCurrency: {
              name: "BTC",
              symbol: "BTC",
              decimals: 18
          },
          rpcUrls: {
              default: {
                  http: ['https://rpc.bitlayer.org'],
                  webSocket: undefined
              }
          },
          blockExplorers: {
              default: {
                  name: 'Bitlayer Scan',
                  url: 'https://www.btrscan.com/',
              },
          }
      }),
      icon: {
          iconUrl: 'https://cdn.echooo.xyz/front-end/source/images/chain/bitlayer.png',
          iconBackground: '#f9f7ec'
      }
  },
  sort: 0,
  isValid: true,
};

const Base = {
        id: 8453,
        name: 'BASE',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Base.png',
        rpc: 'https://mainnet.base.org',
        txUrl: 'https://basescan.org/',
        chain: base,
        sort: 0,
        isValid: true,
    };

const Scroll =  {
        id: 534352,
        name: 'Scroll',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Scroll-2.png',
        rpc: 'https://gcp.echooo.link/scroll-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        txUrl: '',
        chain: {
            ...scroll,
            icon: {
                iconUrl: 'https://cdn.echooo.xyz/front-end/source/images/chain/Scroll-2.png',
                iconBackground: '#f9f7ec'
            }
        },
        sort: 0,
        isValid: true,
    };

const Goerli =  {
        id: 5,
        name: 'goerli',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Ethereum.png',
        rpc: 'https://gcp.echooo.link/eth-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        chain: goerli,
        sort: 0,
        isValid: true,
    }

export const SupportedChains = [
    {
        id: 1,
        name: 'Ethereum',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Ethereum.png',
        rpc: 'https://gcp.echooo.link/eth-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        chain: mainnet,
        sort: 0,
        isValid: true,
    },
    {
        id: 56,
        name: 'BSC',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/BNB.png',
        rpc: 'https://gcp.echooo.link/bsc-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        chain: bsc,
        sort: 0,
        isValid: true,
    },
    {
        id: 324,
        name: 'zkSync Era',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/zkSync%20Era.png',
        rpc: 'https://mainnet.era.zksync.io',
        chain: zkSync,
        sort: 0,
        isValid: true,
    },
    {
        id: 137,
        name: 'Polygon',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Polygon.png',
        rpc: 'https://gcp.echooo.link/polygon-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        chain: polygon,
        sort: 0,
        isValid: true,
    },
    {
        id: 42161,
        name: 'Arbitrum',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Arbitrum.png',
        rpc: 'https://gcp.echooo.link/arbitrum-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        chain: arbitrum,
        sort: 0,
        isValid: true,
    },
    {
        id: 10,
        name: 'Optimism',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Optimism.png',
        rpc: 'https://gcp.echooo.link/op-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
        chain: optimism,
        sort: 0,
        isValid: true,
    },
    // {
    //     id: 82,
    //     name: 'Meter',
    //     icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Meter.png',
    //     rpc: 'https://gcp.echooo.link/meter-mainnet/lcrhytcyHsCvkDxPfTugyBcRdTuEt6p5',
    //     chain: {
    //         ...meter,
    //         icon: {
    //             iconUrl: 'https://cdn.echooo.xyz/front-end/source/images/chain/Meter.png',
    //             iconBackground: '#f9f7ec'
    //         }
    //     },
    //     sort: 0,
    //     isValid: true,
    // },
    {
        id: 43114,
        name: 'Avalanche',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/Avalanche.png',
        rpc: 'https://avalanche.drpc.org',
        txUrl: 'https://snowtrace.io/',
        chain: avalanche,
        sort: 0,
        isValid: true,
    },
    Base,
    bitlayer,
    ...(process.env.BUILD_ENV === 'production' ? [] : [Scroll, fork, Goerli])
];

export const SupportedCrossChains = [
    {
        id: 728126428,
        name: 'Tron',
        icon: 'https://cdn.echooo.xyz/front-end/source/images/chain/TRON.png',
        rpc: '',
        txUrl: 'https://tronscan.org/#/',
        chain: {
            ...defineChain({
                id: 728126428,
                name: "Tron",
                nativeCurrency: {
                    name: "TRX",
                    symbol: "TRX",
                    decimals: 6
                },
                rpcUrls: {
                    default: {
                        http: [''],
                        webSocket: undefined
                    }
                },
                blockExplorers: {
                    default: {
                        name: 'Tronscan',
                        url: 'https://tronscan.org/#/',
                    },
                }
            }),
        },
        sort: 0,
        isValid: true,
    }
]

export const SupportedShowChains = [...SupportedChains, ...SupportedCrossChains];

export const defaultSrcToken = {
    id: 100,
    symbol: "ETH",
    chainId: 1,
    address: "0x0000000000000000000000000000000000000000",
    name: "ethereum",
    decimals: 18,
    logo: "https://d3m4ecn7hmfwfc.cloudfront.net/images/token-3x/Ethereum_ETH.png",
    isPermit: false,
    isSpam: false
}

export const defaultDestToken = {
    id: 102,
    symbol: "USDT",
    chainId: 1,
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    name: "Tether",
    decimals: 6,
    logo: "https://d3m4ecn7hmfwfc.cloudfront.net/images/token-3x/Tether_USDT.png",
    isPermit: false,
    isSpam: false
}

export const getChainInfoByChainId = (chainId: number) => {
    return (SupportedShowChains.filter(v => v.id === chainId)?.[0] || {}) as Record<string, any>;
}