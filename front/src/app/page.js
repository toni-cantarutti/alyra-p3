"use client";
import { useAccount } from "wagmi";
import EventTable from "@/components/features/EventTable";
import NotConnected from "@/components/features/NotConnected";
import ContractManagement from "@/components/features/Contract/ContractManagement";

export default function Home() {
   const { isConnected } = useAccount();
   return (
      <>
         {isConnected ? <ContractManagement /> : <NotConnected />}
         <EventTable />
      </>
   );
}
