'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useContractWriter } from "@/hooks/useContractWriter";
import { toast } from "sonner"
import { useEffect } from "react";


const ContractActions = ({ address, isOwner, isVoter, currentState }) => {

   const inputRef = useRef();
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
   } = useContractWriter();


   useEffect(() => {
      toast('Hello World', {
         position: 'top-center',
      });
   }, []);

   useEffect(() => {
      if (txIsSuccess) {
         toast({
            title: "Félicitations",
            description: "Votre nombre a été inscrit dans la Blockchain",
            className: "bg-lime-200",
         });
         refetchEverything();
      }
      if (txError) {
         toast({
            title: errorConfirmation.message,
            status: "error",
            duration: 3000,
            isClosable: true,
         });
      }
      if (hash) {
         toast({
            title: "Transaction confirmed",
            status: "error",
            duration: 3000
         });
      }
   }, [txIsSuccess, txError, hash]);

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
                              //inputRef.current.value = ""
                           }}
                        >
                           Add a voter
                        </Button>
                     </div>
                     <div className="flex flex-row gap-2">
                        <Button className="w-[608px]">
                           &gt;&gt; Start Proposals Registration
                        </Button>
                     </div>
                  </div >
               );
            return noRights;
         }
      case 1:
         return <p className="italic">You have no rights to perform any action</p>;
      case 2:
         return <p className="italic">You have no rights to perform any action</p>;
   }
}

export default ContractActions;