import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
   return (
      <header className="flex pt-8 pb-4 pl-8 pr-8">
         <p className="text-4xl font-bold pt-2 ">Alyra Project 3</p>
         <div className="flex-1"> </div>
         <ConnectButton />
      </header>
   );
};

export default Header;
