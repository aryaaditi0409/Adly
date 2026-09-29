"use client";
import { useUser,UserButton} from "@clerk/nextjs";

function Navbar() {
  const user = useUser();
  return (
    <header className="bg-gradient-to-r from-gray-900 to-indigo-950 text-white py-2 mb-4 px-6 fixed top-0 w-full z-50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.5)]">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 animate-pulse">
          OnlyAds
        </h1>
        <p>
          {user?.user?.web3Wallets && user.user.web3Wallets.length > 0 ? (
            <p className="flex items-center">Wallet: {user.user.web3Wallets[0].web3Wallet} <UserButton/> </p>
          ) : (
            <p>No wallet connected</p>
          )}
        </p>
      </div>
    </header>
  );
}

export default Navbar;
