'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useContractWriter } from "@/hooks/useContractWriter";
import { toast } from "sonner"
import { useEffect } from "react";
import { useContractEventsStore } from "@/hooks/useContractEvents";

const ContractActions = ({ isOwner, isVoter, currentState, refetchAll }) => {

   const inputRef = useRef();
   const { refreshEvents } = useContractEventsStore();
   const {
      // Write state
      hash,
      error,
      // Transaction state
      txIsLoading,
      txIsSuccess,
      txError,
      // Actions
      caller,
      data,
   } = useContractWriter();


   useEffect(() => {
      if (hash)
         toast(`Transaction pending ${hash}`, {
            position: 'top-center',
         });
   }, [hash]);

   useEffect(() => {
      if (txIsLoading)
         toast("Waiting for confirmation...", {
            position: 'top-center',
         });
   }, [txIsLoading]);

   useEffect(() => {
      if (txIsSuccess) {
         toast("Transaction successful.", {
            position: 'top-center',
         });
         refetchAll();
         refreshEvents();
         if (inputRef.current) {
            inputRef.current.value = "";
         }
      }
   }, [txIsSuccess]);

   useEffect(() => {
      if (txError)
         toast(`${txError.shortMessage || txError.message}`, {
            position: 'top-center',
         });
   }, [txError]);

   useEffect(() => {
      if (error)
         toast(`${error.shortMessage || error.message}`, {
            position: 'top-center',
         });
   }, [error]);


   const noRights = <p className="italic">You have no rights to perform any action</p>;
   if (!isOwner && !isVoter) {
      return noRights;
   }

   switch (currentState) {
      case 0:
         {
            if (isOwner)
               return (
                  <div className="flex flex-col gap-2">
                     <div className="flex flex-row gap-2">
                        <Input
                           placeholder="Voter address"
                           className="w-[400px]"
                           ref={inputRef}
                        />
                        <Button
                           className="w-[200px]"
                           onClick={async () => {
                              const address = inputRef.current.value;
                              await caller("addVoter", [address]);
                           }}
                        >
                           Add a voter
                        </Button>
                     </div>
                     <div className="flex flex-row gap-2">
                        <Button
                           onClick={async () => {
                              await caller("startProposalsRegistering");
                           }}
                           className="w-[608px]"
                        >
                           &gt;&gt; Start Proposals Registration
                        </Button>
                     </div>
                  </div >
               );
            return noRights;
         }
      case 1:
         {
            if (!isVoter && !isOwner)
               return noRights;

            const elements = [];

            if (isVoter) {
               elements.push(
                  <div key="proposal" className="flex flex-row gap-2">
                     <Input
                        placeholder="Proposal"
                        className="w-[400px]"
                        ref={inputRef}
                     />
                     <Button
                        className="w-[200px]"
                        onClick={async () => {
                           const proposal = inputRef.current.value;
                           await caller("addProposal", [proposal]);
                        }}
                     >
                        Add a proposal
                     </Button>
                  </div>
               );
            }

            if (isOwner) {
               elements.push(
                  <div key="end-register" className="flex flex-row gap-2">
                     <Button
                        onClick={async () => {
                           await caller("endProposalsRegistering");
                        }}
                        className="w-[608px]"
                     >
                        &gt;&gt; End Proposals Registering
                     </Button>
                  </div>
               );
            }

            return <div className="flex flex-col gap-2">{elements}</div>;
         }
      case 2:
         {
            if (isOwner) {
               return (
                  <div key="end-register" className="flex flex-row gap-2">
                     <Button
                        onClick={async () => {
                           await caller("startVotingSession");
                        }}
                        className="w-[608px]"
                     >
                        &gt;&gt; Start Voting Session
                     </Button>
                  </div>
               );
            }
            else
               return noRights;
         }
      case 3:
         {
            if (!isVoter && !isOwner)
               return noRights;

            const elements = [];

            if (isVoter) {
               elements.push(
                  <div key="proposal" className="flex flex-row gap-2">
                     <Input
                        placeholder="Proposal ID"
                        className="w-[400px]"
                        ref={inputRef}
                     />
                     <Button
                        className="w-[200px]"
                        onClick={async () => {
                           const proposal = inputRef.current.value;
                           await caller("setVote", [proposal]);
                        }}
                     >
                        Vote for proposal
                     </Button>
                  </div>
               );
            }

            if (isOwner) {
               elements.push(
                  <div key="end-register" className="flex flex-row gap-2">
                     <Button
                        onClick={async () => {
                           await caller("endVotingSession");
                        }}
                        className="w-[608px]"
                     >
                        &gt;&gt; End Voting Session
                     </Button>
                  </div>
               );
            }

            return <div className="flex flex-col gap-2">{elements}</div>;
         }
      case 4:
         {
            if (isOwner) {
               return (
                  <div key="end-register" className="flex flex-row gap-2">
                     <Button
                        onClick={async () => {
                           await caller("tallyVotes");
                        }}
                        className="w-[608px]"
                     >
                        &gt;&gt; Tally Votes
                     </Button>
                  </div>
               );
            }
            else
               return noRights;
         }
      case 5:
         {
            return noRights;
         }
   }
}

export default ContractActions;