import { create } from 'zustand';
import { publicClient } from "@/utils/viemClient";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/utils/contractInfo";

// Create Zustand store
export const useContractEventsStore = create((set) => ({
   events: [],
   refreshEvents: async () => {
      const eventNames = ["VoterRegistered", "WorkflowStatusChange", "ProposalRegistered", "Voted"];
      let logs = [];
      for (const eventName of eventNames) {
         const eventLogs = await publicClient.getLogs({
            address: CONTRACT_ADDRESS,
            event: CONTRACT_ABI.find(item => item.name === eventName),
            fromBlock: 0n,
         });
         logs.push(...eventLogs);
      }
      console.log("refreshEvents");

      // Get timestamps for each block
      const eventsWithTimestamp = await Promise.all(
         logs.map(async (log) => {
            const block = await publicClient.getBlock({ blockNumber: log.blockNumber });

            // Create a description string from all arguments
            const argsDescription = Object.entries(log.args || {})
               .filter(([key]) => typeof key === 'string') // Filter out numeric keys
               .map(([key, value]) => `${key}: ${value.toString()}`)
               .join(', ');

            return {
               name: log.eventName,
               blockNumber: log.blockNumber,
               timestamp: new Date(Number(block.timestamp) * 1000),
               desc: argsDescription
            };
         })
      );

      // Sort by blockNumber before reversing
      set({ events: eventsWithTimestamp.sort((a, b) => Number(a.blockNumber) - Number(b.blockNumber)).reverse() });
   },
}));