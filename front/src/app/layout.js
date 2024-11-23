import "@/app/globals.css";
import Provider from "@/components/wallet/Provider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Alyra Project 3",
  description: "DApp for Voting.sol",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-mono antialiased">
        <Provider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow flex-1 p-4">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body >
    </html >
  );
}
