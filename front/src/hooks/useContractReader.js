import { useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/utils/contractInfo";
import { useAccount } from "wagmi";

export const useContractReader = (functionName, args) => {
   const { address: add } = useAccount();
   return useReadContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: functionName,
      account: add,
      args: args,
   });
}; 