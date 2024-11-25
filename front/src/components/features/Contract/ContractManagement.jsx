"use client";
import { useAccount } from "wagmi";
import { useContractReader } from "@/hooks/useContractReader";
import ContractActions from "./ContractActions";

function getStateDescription(state) {
   const states = ["RegisteringVoters", "ProposalsRegistrationStarted", "ProposalsRegistrationEnded", "VotingSessionStarted", "VotingSessionEnded", "VotesTallied"];
   return states[state];
}

const ContractManagement = () => {
   // Adresses and rights
   const { address } = useAccount();
   const { data: ownerAddress } = useContractReader("owner");
   const { data: isVoter } = useContractReader("getVoter", [address]);
   const isOwner = address?.toLowerCase() === ownerAddress?.toLowerCase();

   // Contract state
   const { data: state } = useContractReader("workflowStatus");

   return (
      <>
         <p className="pt-4 pb-4 text-2xl font-bold mt-4 border-t-2 border-black-200">
            Contrat State: {getStateDescription(state)}<br />
         </p>
         <p className="pt-4 text-2xl font-bold border-t-2 border-black-200">User Section</p>
         <p className="text-lg">
            User rights: {(isOwner || isVoter) ? (
               <>{isOwner && "[Owner]"}{isVoter && "[Voter]"}</>
            ) : "none"}<br />
            Available actions:<br />
         </p>
         <ContractActions
            address={address}
            isOwner={isOwner}
            isVoter={isVoter}
            currentState={state}
         />

      </>
   );

   // <div className="flex flex-col gap-2">
   //    {hash && (
   //       <Alert className="mb-4 bg-lime-200">
   //          <RocketIcon className="h-4 w-4" />
   //          <AlertTitle>Information</AlertTitle>
   //          <AlertDescription>Last transaction: {hash}</AlertDescription>
   //       </Alert>
   //    )}
   //    {txIsLoading && (
   //       <Alert className="mb-4 bg-amber-200">
   //          <RocketIcon className="h-4 w-4" />
   //          <AlertTitle>Information</AlertTitle>
   //          <AlertDescription>Waiting for confirmation...</AlertDescription>
   //       </Alert>
   //    )}
   //    {txIsSuccess && (
   //       <Alert className="mb-4 bg-lime-200">
   //          <RocketIcon className="h-4 w-4" />
   //          <AlertTitle>Information</AlertTitle>
   //          <AlertDescription>Transaction confirmed.</AlertDescription>
   //       </Alert>
   //    )}
   //    {txError && (
   //       <Alert className="mb-4 bg-red-400">
   //          <RocketIcon className="h-4 w-4" />
   //          <AlertTitle>Error</AlertTitle>
   //          <AlertDescription>{txError.shortMessage || txError.message}</AlertDescription>
   //       </Alert>
   //    )}
   //    {error && (
   //       <Alert className="mb-4 bg-red-400">
   //          <RocketIcon className="h-4 w-4" />
   //          <AlertTitle>Tx Error</AlertTitle>
   //          <AlertDescription>{error.shortMessage || error.message}</AlertDescription>
   //       </Alert>
   //    )}
   //    <h2 className="text-2xl font-bold">Get Number</h2>
   //    <div>
   //       <p>
   //          The number in the Blockchain : <span className="font-bold">{stroredNumber?.toString()}</span>
   //       </p>
   //    </div>
   //    <h2 className="text-2xl font-bold">Set Number</h2>


   //    <div className="flex flex-row gap-2">
   //       <Input placeholder="newValue" className="w-[200px]" onChange={(e) => setNumberToStore(e.target.value)} />
   //       <Button className="w-[100px]" onClick={storeNumber}>
   //          Set
   //       </Button>
   //    </div>

};
export default ContractManagement;
