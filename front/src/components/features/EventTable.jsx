import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

import { useContractEventsStore } from "@/hooks/useContractEvents";
import { useEffect } from "react";

const EventTable = () => {
   const { events, refreshEvents } = useContractEventsStore();

   useEffect(() => {
      // setInterval(() => {
      //    refreshEvents();
      // }, 1000);
      refreshEvents();
   }, []);

   return (
      <>
         <h2 className="pt-4 text-2xl font-bold border-t-2 border-black-200 mt-4" > Contract Events </h2>
         < Table >
            <TableHeader>
               <TableRow>
                  <TableHead className="w-[200px] font-bold" > Datetime </TableHead>
                  < TableHead className="w-[150px] font-bold" > Block number </TableHead>
                  < TableHead className="w-[200px] font-bold" > Type </TableHead>
                  < TableHead className="font-bold" > Description </TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {events.length > 0 ? (
                  events.map((event, index) => (
                     <TableRow key={index} >
                        <TableCell>{event.timestamp.toLocaleString('en-US', { hour12: false })} </TableCell>
                        < TableCell className="text-center" > {event.blockNumber} </TableCell>
                        < TableCell className="font-bold" > {event.name} </TableCell>
                        < TableCell > {event.desc} </TableCell>
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell colSpan={3} className="text-center" >
                        No events found
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </>
   );
};

export default EventTable;
