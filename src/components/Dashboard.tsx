import { useAccount } from 'wagmi';
import { useTokenBalance } from '../hooks/useContracts';
import { formatEther } from 'viem';
import { Coins, Wallet } from 'lucide-react';

export function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: tokenBalance } = useTokenBalance(address);

  if (!isConnected) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 text-center shadow-xl">
        <Wallet className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Connect Your Wallet
        </h3>
        <p className="text-slate-400">
          Connect your wallet to start using the DeFi platform
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-white">Your Portfolio</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">DFT Balance</p>
          <p className="text-white text-2xl font-bold">
            {tokenBalance ? formatEther(tokenBalance as bigint) : '0.0'}
          </p>
          <p className="text-slate-500 text-sm mt-1">DeFi Token</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">Wallet Address</p>
          <p className="text-white text-lg font-mono break-all">
            {address?.slice(0, 10)}...{address?.slice(-8)}
          </p>
        </div>
      </div>
    </div>
  );
}
