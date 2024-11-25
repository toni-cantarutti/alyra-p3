import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const NotConnected = () => {
   return (
      <Alert>
         <Terminal className="h-4 w-4" />
         <AlertTitle>Not connected</AlertTitle>
         <AlertDescription>You need to connect your wallet to use this app.</AlertDescription>
      </Alert>
   );
};
export default NotConnected;