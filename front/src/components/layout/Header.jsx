import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
   return (
      <header className="flex p-4">
         <p className="text-4xl font-bold pl-4 pt-2 ">Alyra Project 3</p>
         <div className="flex-1"> </div>
         <ConnectButton />
      </header>
   );
};

export default Header;
