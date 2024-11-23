"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { hardhat, holesky } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { http } from "wagmi";

const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "f24813dc629f68bba51e2a88e56cfabe",
    chains: [hardhat, holesky],
    ssr: true, // If your dApp uses server side rendering (SSR)
    transports: {
        [hardhat.id]: http(),
        [holesky.id]: http(),
    },
});

const queryClient = new QueryClient();

const Provider = ({ children }) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default Provider;
