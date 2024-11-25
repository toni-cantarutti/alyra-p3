"use client";
import { useAccount } from "wagmi";
import { useContractReader } from "@/hooks/useContractReader";
import ContractActions from "./ContractActions";
import { useState } from "react";
function getStateDescription(state) {
   const states = ["RegisteringVoters", "ProposalsRegistrationStarted", "ProposalsRegistrationEnded", "VotingSessionStarted", "VotingSessionEnded", "VotesTallied"];
   return states[state];
}

const ContractManagement = () => {
   // Adresses and rights
   const { address } = useAccount();
   const { data: ownerAddress, refetch: refetchOwner } = useContractReader("owner");
   const { data: isVoter, refetch: refetchVoter } = useContractReader("getVoter", [address]);
   const { data: winnerId, refetch: refetchWinner } = useContractReader("winningProposalID");
   const { data: winnerProposal, refetch: refetchWinnerProposal } = useContractReader("getOneProposal", [winnerId]);
   const isOwner = address?.toLowerCase() === ownerAddress?.toLowerCase();

   // Contract state
   const { data: state, refetch: refetchState } = useContractReader("workflowStatus");

   const refetchAll = () => {
      refetchOwner();
      refetchVoter();
      refetchState();
      refetchWinner();
      refetchWinnerProposal();
   }

   return (
      <>
         <p className="pt-4 pb-4 text-2xl font-bold mt-4 border-t-2 border-black-200">
            Contract State: {getStateDescription(state)} {(state === 5) && `=> Winner Proposal:[${winnerId}]${winnerProposal?.description ?? "!Only voters can see proposal!"}`}
         </p >
         <p className="pt-4 text-2xl font-bold border-t-2 border-black-200">User Section</p>
         <p className="text-lg">
            User address: {address}
         </p>
         <p className="text-lg pb-4">
            User rights: {(isOwner || isVoter) ? (
               <>{isOwner && "[Owner]"}{isVoter && "[Voter]"}</>
            ) : "none"}<br />
            Available actions:<br />
         </p>
         <ContractActions
            isOwner={isOwner}
            isVoter={isVoter}
            currentState={state}
            refetchAll={refetchAll}
            winnerId={winnerId}
         />

      </>
   );
};
export default ContractManagement;
