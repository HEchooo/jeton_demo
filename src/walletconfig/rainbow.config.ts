import { connectorsForWallets } from "@sofent/rainbowkit";
import { echoooWallet } from "./echooo";
import { ledgerWallet, metaMaskWallet, trustWallet } from "@sofent/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { SupportedChains } from "@/config/project.config";

const connectors = connectorsForWallets([
    {
      groupName: 'Popular',
      wallets: [
        echoooWallet,
        metaMaskWallet,
        ledgerWallet, 
        trustWallet
       ],
     }],
    {
        appName: "Demo Jetonai",
        projectId: "1f71c94854de7d10ff443e3a70583b7c",
    });

const config = createConfig({
        connectors,
        chains: SupportedChains.map( it=> it.chain) as any,
        transports: SupportedChains.reduce((total,cur)=>{
          return {
            ...total,
            [cur.id]:http(cur.rpc)
          }
        },{} as any)
});

export default config;