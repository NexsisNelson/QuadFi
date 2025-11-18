import { useState } from 'react';
import { Droplet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useAddLiquidity, useUserLiquidity, useTokenApproval } from '../hooks/useContracts';
import { CONTRACT_ADDRESSES } from '../config/contracts';
import { formatEther } from 'viem';

export function Liquidity() {
  const [tokenAmount, setTokenAmount] = useState('');
  const [ethAmount, setEthAmount] = useState('');
  const { address } = useAccount();
  const { data: userLiquidity } = useUserLiquidity(address);
  const { addLiquidity, isLoading } = useAddLiquidity();
  const { approve, isLoading: isApproving } = useTokenApproval(
    CONTRACT_ADDRESSES.POOL,
    tokenAmount
  );

  const handleAddLiquidity = async () => {
    if (!tokenAmount || !ethAmount) return;
    await approve();
    addLiquidity(tokenAmount, ethAmount);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <Droplet className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-white">Liquidity Pool</h2>
      </div>

      {userLiquidity && (
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <p className="text-slate-400 text-sm mb-1">Your Liquidity</p>
          <p className="text-white text-2xl font-bold">
            {formatEther(userLiquidity as bigint)}
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-slate-800 rounded-xl p-4">
          <label className="block text-slate-400 text-sm mb-2">DFT Amount</label>
          <input
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-white text-2xl outline-none w-full"
          />
        </div>

        <div className="bg-slate-800 rounded-xl p-4">
          <label className="block text-slate-400 text-sm mb-2">ETH Amount</label>
          <input
            type="number"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-white text-2xl outline-none w-full"
          />
        </div>

        <button
          onClick={handleAddLiquidity}
          disabled={isLoading || isApproving || !tokenAmount || !ethAmount}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white font-semibold py-4 rounded-xl transition-colors"
        >
          {isLoading || isApproving ? 'Processing...' : 'Add Liquidity'}
        </button>
      </div>
    </div>
  );
}
