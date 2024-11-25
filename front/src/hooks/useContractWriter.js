import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/utils/contractInfo";

export function useContractWriter() {
   const {
      data: hash,
      error,
      writeContract,
   } = useWriteContract();

   const {
      isLoading: txIsLoading,
      isSuccess: txIsSuccess,
      error: txError,
   } = useWaitForTransactionReceipt({
      hash,
   });

   const caller = async (methodName, args) => {
      writeContract({
         address: CONTRACT_ADDRESS,
         abi: CONTRACT_ABI,
         functionName: methodName,
         args: args,
      });
   };

   return {
      // Write state
      hash,
      error,
      // Transaction state
      txIsLoading,
      txIsSuccess,
      txError,
      // Actions
      caller,
   };
}; 