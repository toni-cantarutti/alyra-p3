import "@/app/globals.css";
import Provider from "@/components/wallet/Provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"

export const metadata = {
   title: "Alyra Project 3",
   description: "DApp for Voting.sol",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <body className="font-mono antialiased px-96 bg-gray-100">
            <Provider>
               <div className="flex flex-col min-h-screen border-2 border-blue-200 rounded-3xl">
                  <Header />
                  <main className="grow flex-1 p-8">{children}</main>
                  <Footer className="pl-4 pr-4" />
               </div>
            </Provider>
            <Toaster />
         </body >
      </html >
   );
}
