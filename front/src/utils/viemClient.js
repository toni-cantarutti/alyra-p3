import { createPublicClient, http } from "viem";
import { hardhat, holesky } from "viem/chains";

export const publicClient = createPublicClient({
   chain: hardhat,
   transport: http(),
   // chain: holesky,
   // transport: http("https://holesky.infura.io/v3/863133ccd4e84b95bf7a3908c2044ee0"),
});
